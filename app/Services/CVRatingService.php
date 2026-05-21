<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class CVRatingService
{
    public function __construct(private readonly AIService $aiService)
    {
    }

    public function rate(array $parsedData, string $extractedText = ''): array
    {
        if (config('resume.ollama.enabled')) {
            try {
                return $this->normalizeRating(
                    $this->aiService->requestJson($this->buildPrompt($parsedData, $extractedText))
                );
            } catch (\Throwable $exception) {
                Log::debug('AI ATS rating failed, using heuristic rating', [
                    'message' => $exception->getMessage(),
                ]);
            }
        }

        return $this->heuristicRate($parsedData, $extractedText);
    }

    private function buildPrompt(array $parsedData, string $extractedText): string
    {
        $json = json_encode($parsedData, JSON_PRETTY_PRINT);

        return <<<PROMPT
You are an ATS resume reviewer. Analyze the CV and return JSON only:
{
  "score": 0,
  "missing": [],
  "strengths": [],
  "suggestions": []
}

Evaluate:
- Missing sections
- Missing skills
- Weak descriptions
- Keyword relevance
- Overall completeness

Score must be an integer from 0 to 100.

PARSED CV JSON:
{$json}

RAW CV TEXT:
{$extractedText}
PROMPT;
    }

    private function heuristicRate(array $parsedData, string $extractedText): array
    {
        $missing = [];
        $strengths = [];
        $suggestions = [];
        $score = 40;

        $sections = [
            'skills' => 'Skills section',
            'experience' => 'Work experience section',
            'education' => 'Education section',
            'projects' => 'Projects section',
            'languages' => 'Languages section',
            'certifications' => 'Certifications section',
        ];

        foreach ($sections as $key => $label) {
            if (empty($parsedData[$key])) {
                $missing[] = $label;
            } else {
                $score += 8;
            }
        }

        if (!empty($parsedData['email'])) {
            $score += 5;
        } else {
            $missing[] = 'Contact email';
        }

        if (!empty($parsedData['phone'])) {
            $score += 5;
        }

        if (count($parsedData['skills'] ?? []) >= 5) {
            $strengths[] = 'Strong skills coverage';
            $score += 10;
        } else {
            $suggestions[] = 'Add more technical keywords and skills';
        }

        if (!empty($parsedData['experience'])) {
            $strengths[] = 'Professional experience listed';
        } else {
            $suggestions[] = 'Add measurable achievements in work experience';
        }

        if (str_contains(mb_strtolower($extractedText), 'github')) {
            $strengths[] = 'GitHub profile referenced';
        } else {
            $missing[] = 'GitHub profile';
        }

        if (preg_match('/\d+%|\$\d+|\d+\s*(users|customers|projects)/i', $extractedText)) {
            $strengths[] = 'Includes measurable results';
        } else {
            $suggestions[] = 'Add measurable achievements with numbers';
        }

        $score = max(0, min(100, $score));

        return [
            'score' => $score,
            'missing' => array_values(array_unique($missing)),
            'strengths' => array_values(array_unique($strengths)),
            'suggestions' => array_values(array_unique($suggestions)),
        ];
    }

    private function normalizeRating(array $data): array
    {
        return [
            'score' => max(0, min(100, (int) ($data['score'] ?? 0))),
            'missing' => array_values(array_filter($data['missing'] ?? [], 'is_string')),
            'strengths' => array_values(array_filter($data['strengths'] ?? [], 'is_string')),
            'suggestions' => array_values(array_filter($data['suggestions'] ?? [], 'is_string')),
        ];
    }
}
