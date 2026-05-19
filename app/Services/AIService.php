<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    private const PARSED_SCHEMA = [
        'name' => '',
        'email' => '',
        'phone' => '',
        'skills' => [],
        'education' => [],
        'experience' => [],
        'projects' => [],
        'languages' => [],
        'certifications' => [],
        'github' => '',
        'github_repositories' => [],
        'portfolio_links' => [],
    ];

    public function parseCvText(string $cvText): array
    {
        if (!config('resume.ollama.enabled')) {
            return $this->fallbackParse($cvText);
        }

        try {
            $prompt = $this->buildParsePrompt($cvText);
            $response = $this->chat($prompt, true);

            return $this->normalizeParsedData($this->decodeJson($response));
        } catch (\Throwable $exception) {
            Log::warning('Ollama CV parse failed, using fallback parser', [
                'message' => $exception->getMessage(),
            ]);

            return $this->fallbackParse($cvText);
        }
    }

    public function requestJson(string $prompt): array
    {
        return $this->decodeJson($this->chat($prompt, true));
    }

    public function chat(string $prompt, bool $json = false): string
    {
        $baseUrl = rtrim((string) config('resume.ollama.base_url'), '/');
        $model = (string) config('resume.ollama.model', 'llama3');
        $timeout = (int) config('resume.ollama.timeout', 120);

        $payload = [
            'model' => $model,
            'prompt' => $prompt,
            'stream' => false,
            'options' => [
                'temperature' => 0,
                'top_p' => 0.1,
                'num_ctx' => (int) config('resume.ollama.num_ctx', 8192),
            ],
        ];

        if ($json) {
            $payload['format'] = 'json';
        }

        $response = Http::timeout($timeout)
            ->post("{$baseUrl}/api/generate", $payload)
            ->throw()
            ->json();

        return trim((string) ($response['response'] ?? ''));
    }

    public function embed(string $text): ?array
    {
        if (!config('resume.ollama.enabled')) {
            return null;
        }

        try {
            $baseUrl = rtrim((string) config('resume.ollama.base_url'), '/');
            $model = (string) config('resume.ollama.embedding_model', 'nomic-embed-text');

            $response = Http::timeout((int) config('resume.ollama.timeout', 120))
                ->post("{$baseUrl}/api/embeddings", [
                    'model' => $model,
                    'prompt' => $text,
                ])
                ->throw()
                ->json();

            $embedding = $response['embedding'] ?? null;

            return is_array($embedding) ? $embedding : null;
        } catch (\Throwable $exception) {
            Log::debug('Ollama embedding failed', ['message' => $exception->getMessage()]);

            return null;
        }
    }

    private function buildParsePrompt(string $cvText): string
    {
        $schema = json_encode(self::PARSED_SCHEMA, JSON_PRETTY_PRINT);
        $cvText = $this->prepareCvTextForPrompt($cvText);

        return <<<PROMPT
You are a strict CV parsing engine. Extract facts only from the CV text.
Return one valid JSON object only. Do not use markdown. Do not explain.
The JSON object must have exactly these top-level keys:
{$schema}

Field rules:
- Use empty strings or empty arrays for missing data.
- Keep every work experience, education item, project, language, and certification you can find.
- Do not invent data.
- Preserve original dates when present.
- skills must contain individual technical skills, soft skills, tools, technologies, and competencies as strings, not sentences.
- education items must use institution, degree, field_of_study, start_date, end_date.
- experience items must use company, role, start_date, end_date, description.
- projects items must use name, description, technologies.
- projects may also include url when available.
- technologies must be an array of strings.
- languages items must use language, level.
- certifications items must use name, issuer, year.
- github must be the GitHub profile URL when present.
- github_repositories and portfolio_links must be arrays of URLs or repository names found in the CV.

CV TEXT:
{$cvText}
PROMPT;
    }

    private function prepareCvTextForPrompt(string $cvText): string
    {
        $cvText = trim($cvText);
        $maxChars = (int) config('resume.ollama.max_prompt_chars', 24000);

        if (mb_strlen($cvText) <= $maxChars) {
            return $cvText;
        }

        return mb_substr($cvText, 0, $maxChars);
    }

    private function decodeJson(string $raw): array
    {
        $raw = trim($raw);

        if (str_starts_with($raw, '```')) {
            $raw = preg_replace('/^```(?:json)?\s*/i', '', $raw) ?? $raw;
            $raw = preg_replace('/\s*```$/', '', $raw) ?? $raw;
        }

        if (!str_starts_with($raw, '{')) {
            $start = mb_strpos($raw, '{');
            $end = mb_strrpos($raw, '}');

            if ($start !== false && $end !== false && $end > $start) {
                $raw = mb_substr($raw, $start, $end - $start + 1);
            }
        }

        $decoded = json_decode($raw, true);

        if (!is_array($decoded)) {
            throw new \RuntimeException('AI response was not valid JSON.');
        }

        return $decoded;
    }

    private function normalizeParsedData(array $data): array
    {
        $normalized = self::PARSED_SCHEMA;

        foreach ($normalized as $key => $default) {
            if (!array_key_exists($key, $data)) {
                continue;
            }

            $value = $data[$key];

            if (is_array($default)) {
                $normalized[$key] = $this->normalizeArrayField($key, $value);
                continue;
            }

            $normalized[$key] = is_string($value) ? trim($value) : (string) $value;
        }

        return $normalized;
    }

    private function normalizeArrayField(string $key, mixed $value): array
    {
        if (!is_array($value)) {
            return [];
        }

        return match ($key) {
            'skills' => $this->normalizeStringList($value),
            'education' => $this->normalizeObjectList($value, ['institution', 'degree', 'field_of_study', 'start_date', 'end_date']),
            'experience' => $this->normalizeObjectList($value, ['company', 'role', 'start_date', 'end_date', 'description']),
            'projects' => $this->normalizeObjectList($value, ['name', 'description', 'technologies', 'url']),
            'github_repositories', 'portfolio_links' => $this->normalizeStringList($value),
            'languages' => $this->normalizeObjectList($value, ['language', 'level']),
            'certifications' => $this->normalizeObjectList($value, ['name', 'issuer', 'year']),
            default => array_values($value),
        };
    }

    private function normalizeStringList(array $items): array
    {
        $values = [];

        foreach ($items as $item) {
            if (is_string($item)) {
                $values[] = $item;
                continue;
            }

            if (is_array($item)) {
                $values[] = $item['name'] ?? $item['skill'] ?? $item['title'] ?? '';
            }
        }

        $values = array_map(fn ($value) => trim((string) $value), $values);
        $values = array_filter($values, fn ($value) => $value !== '');

        return array_values(array_unique($values));
    }

    private function normalizeObjectList(array $items, array $keys): array
    {
        $normalized = [];

        foreach ($items as $item) {
            $row = array_fill_keys($keys, '');

            if (in_array('technologies', $keys, true)) {
                $row['technologies'] = [];
            }

            if (is_string($item)) {
                $targetKey = in_array('description', $keys, true) ? 'description' : $keys[0];
                $row[$targetKey] = trim($item);
            } elseif (is_array($item)) {
                foreach ($keys as $key) {
                    $value = $item[$key] ?? $this->alternateValueForKey($item, $key);
                    $row[$key] = is_array($value)
                        ? $this->normalizeStringList($value)
                        : trim((string) ($value ?? ''));
                }
            }

            if ($this->rowHasValue($row)) {
                $normalized[] = $row;
            }
        }

        return $normalized;
    }

    private function alternateValueForKey(array $item, string $key): mixed
    {
        return match ($key) {
            'institution' => $item['school'] ?? $item['university'] ?? null,
            'field_of_study' => $item['field'] ?? $item['fieldOfStudy'] ?? $item['major'] ?? null,
            'role' => $item['title'] ?? $item['position'] ?? null,
            'company' => $item['employer'] ?? $item['organization'] ?? null,
            'start_date' => $item['startDate'] ?? $item['from'] ?? null,
            'end_date' => $item['endDate'] ?? $item['to'] ?? null,
            'technologies' => $item['tech'] ?? $item['skills'] ?? [],
            'url' => $item['link'] ?? $item['website'] ?? null,
            'language' => $item['name'] ?? null,
            default => null,
        };
    }

    private function rowHasValue(array $row): bool
    {
        foreach ($row as $value) {
            if (is_array($value) && $value !== []) {
                return true;
            }

            if (is_string($value) && trim($value) !== '') {
                return true;
            }
        }

        return false;
    }

    private function fallbackParse(string $cvText): array
    {
        $parsed = self::PARSED_SCHEMA;

        if (preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $cvText, $email)) {
            $parsed['email'] = $email[0];
        }

        if (preg_match('/(\+?\d[\d\s().-]{7,}\d)/', $cvText, $phone)) {
            $parsed['phone'] = trim($phone[1]);
        }

        $lines = array_values(array_filter(array_map('trim', explode("\n", $cvText))));
        $parsed['name'] = $lines[0] ?? '';

        $knownSkills = [
            'React', 'JavaScript', 'TypeScript', 'Node.js', 'Laravel', 'PHP', 'Python',
            'Docker', 'AWS', 'PostgreSQL', 'MySQL', 'Vue.js', 'Figma', 'Git', 'Kubernetes',
            'Tailwind', 'GraphQL', 'Redis', 'Java', 'C#', 'SQL', 'CI/CD', 'TensorFlow',
            'Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Agile', 'Scrum',
            'Jira', 'Excel', 'Power BI', 'REST API', 'Next.js', 'Express', 'MongoDB',
        ];

        $lower = mb_strtolower($cvText);
        foreach ($knownSkills as $skill) {
            if (str_contains($lower, mb_strtolower($skill))) {
                $parsed['skills'][] = $skill;
            }
        }

        $parsed['skills'] = array_values(array_unique($parsed['skills']));
        $parsed['education'] = $this->parseSectionRows($cvText, ['education'], ['institution', 'degree', 'field_of_study', 'start_date', 'end_date']);
        $parsed['experience'] = $this->parseSectionRows($cvText, ['experience', 'work experience', 'employment'], ['company', 'role', 'start_date', 'end_date', 'description']);
        $parsed['projects'] = $this->parseSectionRows($cvText, ['projects'], ['name', 'description', 'technologies']);
        $parsed['languages'] = $this->parseLanguageSection($cvText);
        $parsed['certifications'] = $this->parseSectionRows($cvText, ['certifications', 'certificates'], ['name', 'issuer', 'year']);
        $this->parseLinks($cvText, $parsed);

        return $parsed;
    }

    private function parseLinks(string $text, array &$parsed): void
    {
        preg_match_all('/https?:\/\/[^\s,)>\]]+|(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s,)>\]]*)?/i', $text, $matches);
        $links = array_values(array_unique(array_map(
            fn ($link) => str_starts_with($link, 'http') ? $link : "https://{$link}",
            $matches[0] ?? []
        )));

        foreach ($links as $link) {
            if (preg_match('/github\.com\/[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)?/i', $link)) {
                if ($parsed['github'] === '' && preg_match('/github\.com\/[A-Za-z0-9_.-]+\/?$/i', $link)) {
                    $parsed['github'] = rtrim($link, '/');
                } else {
                    $parsed['github_repositories'][] = rtrim($link, '/');
                }
                continue;
            }

            if (preg_match('/portfolio|behance|dribbble|vercel|netlify|gitlab|bitbucket/i', $link)) {
                $parsed['portfolio_links'][] = rtrim($link, '/');
            }
        }

        $parsed['github_repositories'] = array_values(array_unique($parsed['github_repositories']));
        $parsed['portfolio_links'] = array_values(array_unique($parsed['portfolio_links']));
    }

    private function parseSectionRows(string $text, array $headings, array $keys): array
    {
        $section = $this->extractSection($text, $headings);

        if ($section === '') {
            return [];
        }

        $lines = array_values(array_filter(array_map('trim', preg_split('/\n+/', $section) ?: [])));
        $rows = [];

        foreach ($lines as $line) {
            $line = preg_replace('/^[\-•*]\s*/', '', $line) ?? $line;

            if ($line === '') {
                continue;
            }

            $row = array_fill_keys($keys, '');
            $parts = array_values(array_filter(array_map('trim', preg_split('/\s+[|–—-]\s+/', $line) ?: [])));

            foreach ($keys as $index => $key) {
                if (!isset($parts[$index])) {
                    continue;
                }

                $row[$key] = $key === 'technologies' ? [$parts[$index]] : $parts[$index];
            }

            if ($this->rowHasValue($row)) {
                $rows[] = $row;
            }
        }

        return $rows;
    }

    private function parseLanguageSection(string $text): array
    {
        $section = $this->extractSection($text, ['languages']);

        if ($section === '') {
            return [];
        }

        $lines = array_values(array_filter(array_map('trim', preg_split('/[\n,]+/', $section) ?: [])));
        $languages = [];

        foreach ($lines as $line) {
            $line = preg_replace('/^[\-•*]\s*/', '', $line) ?? $line;
            $parts = array_values(array_filter(array_map('trim', preg_split('/\s+[|–—-]\s+|:\s*/', $line) ?: [])));

            if (!$parts) {
                continue;
            }

            $languages[] = [
                'language' => $parts[0],
                'level' => $parts[1] ?? '',
            ];
        }

        return $languages;
    }

    private function extractSection(string $text, array $headings): string
    {
        $allHeadings = 'education|experience|work experience|employment|projects|skills|technical skills|technologies|tools|languages|certifications|certificates|summary|profile|github|portfolio';

        foreach ($headings as $heading) {
            $pattern = '/(?:^|\n)\s*'.preg_quote($heading, '/').'\s*:?\s*\n(?P<body>.*?)(?=\n\s*(?:'.$allHeadings.')\s*:?\s*\n|\z)/is';

            if (preg_match($pattern, $text, $match)) {
                return trim($match['body']);
            }
        }

        return '';
    }
}
