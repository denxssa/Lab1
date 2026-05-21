<?php

namespace App\Services;

use App\Models\CvCertification;
use App\Models\CvEducation;
use App\Models\CvExperience;
use App\Models\CvLanguage;
use App\Models\CvProfile;
use App\Models\CvProject;
use App\Models\CvSkill;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CvProfileService
{
    public function getOrCreateForUser(User $user): CvProfile
    {
        return CvProfile::query()->firstOrCreate(
            ['user_id' => $user->id],
            [
                'full_name' => $user->name,
                'email' => $user->email,
            ]
        );
    }

    public function loadForUser(User $user): ?CvProfile
    {
        return CvProfile::query()
            ->where('user_id', $user->id)
            ->with(['skills', 'experiences', 'education', 'languages', 'projects', 'certifications'])
            ->first();
    }

    /**
     * Sync normalized tables from AI/OCR parsed JSON (AIService schema).
     */
    public function syncFromParsedData(User $user, array $parsed): CvProfile
    {
        return DB::transaction(function () use ($user, $parsed) {
            $profile = $this->getOrCreateForUser($user);

            $profile->update([
                'full_name' => $parsed['name'] ?? $profile->full_name ?? $user->name,
                'email' => $parsed['email'] ?? $profile->email ?? $user->email,
                'phone' => $parsed['phone'] ?? $profile->phone,
                'headline' => $parsed['headline'] ?? $profile->headline,
                'summary' => $parsed['summary'] ?? $parsed['bio'] ?? $profile->summary,
                'github' => $parsed['github'] ?? $profile->github,
                'github_repositories' => $parsed['github_repositories'] ?? $profile->github_repositories ?? [],
                'portfolio_links' => $parsed['portfolio_links'] ?? $profile->portfolio_links ?? [],
            ]);

            $this->replaceChildren($profile, $this->mapParsedToPayload($parsed));

            return $profile->fresh([
                'skills', 'experiences', 'education', 'languages', 'projects', 'certifications',
            ]);
        });
    }

    /**
     * Persist dashboard form payload to normalized tables.
     */
    public function updateFromPayload(User $user, array $payload): CvProfile
    {
        return DB::transaction(function () use ($user, $payload) {
            $profile = $this->getOrCreateForUser($user);
            $personal = $payload['personal'] ?? [];

            $profile->update([
                'full_name' => $personal['full_name'] ?? $personal['name'] ?? $profile->full_name ?? $user->name,
                'email' => $personal['email'] ?? $profile->email ?? $user->email,
                'phone' => $personal['phone'] ?? $profile->phone,
                'headline' => $personal['headline'] ?? $profile->headline,
                'summary' => $personal['summary'] ?? $profile->summary,
                'location' => $personal['location'] ?? $profile->location,
                'website' => $personal['website'] ?? $profile->website,
                'linkedin' => $personal['linkedin'] ?? $profile->linkedin,
                'github' => $personal['github'] ?? $profile->github,
                'github_repositories' => $personal['github_repositories'] ?? $profile->github_repositories ?? [],
                'portfolio_links' => $personal['portfolio_links'] ?? $profile->portfolio_links ?? [],
            ]);

            $this->replaceChildren($profile, $payload);

            return $profile->fresh([
                'skills', 'experiences', 'education', 'languages', 'projects', 'certifications',
            ]);
        });
    }

    /**
     * Standard structure for Blade templates and PDF export.
     */
    public function toTemplateData(CvProfile $profile): array
    {
        $profile->loadMissing([
            'skills', 'experiences', 'education', 'languages', 'projects', 'certifications',
        ]);

        return [
            'personal' => [
                'name' => $profile->full_name ?? '',
                'email' => $profile->email ?? '',
                'phone' => $profile->phone ?? '',
                'headline' => $profile->headline ?? '',
                'summary' => $profile->summary ?? '',
                'location' => $profile->location ?? '',
                'website' => $profile->website ?? '',
                'linkedin' => $profile->linkedin ?? '',
                'github' => $profile->github ?? '',
                'github_repositories' => $profile->github_repositories ?? [],
                'portfolio_links' => $profile->portfolio_links ?? [],
            ],
            'skills' => $profile->skills->pluck('name')->all(),
            'experience' => $profile->experiences->map(fn (CvExperience $e) => [
                'company' => $e->company,
                'role' => $e->role,
                'start_date' => $e->start_date,
                'end_date' => $e->is_current ? 'Present' : $e->end_date,
                'description' => $e->description,
                'bullets' => $this->descriptionToBullets($e->description),
            ])->all(),
            'education' => $profile->education->map(fn (CvEducation $e) => [
                'institution' => $e->institution,
                'degree' => $e->degree,
                'field' => $e->field_of_study,
                'start_date' => $e->start_date,
                'end_date' => $e->is_current ? 'Present' : $e->end_date,
            ])->all(),
            'languages' => $profile->languages->map(fn (CvLanguage $l) => [
                'language' => $l->language,
                'level' => $l->level,
            ])->all(),
            'projects' => $profile->projects->map(fn (CvProject $p) => [
                'name' => $p->name,
                'description' => $p->description,
                'technologies' => $p->technologies ?? [],
                'url' => $p->url,
                'start_date' => $p->start_date,
                'end_date' => $p->end_date,
            ])->all(),
            'certifications' => $profile->certifications->map(fn (CvCertification $c) => [
                'name' => $c->name,
                'issuer' => $c->issuer,
                'year' => $c->year,
            ])->all(),
        ];
    }

    public function toApiPayload(CvProfile $profile): array
    {
        $profile->loadMissing([
            'skills', 'experiences', 'education', 'languages', 'projects', 'certifications',
        ]);

        return [
            'personal' => [
                'full_name' => $profile->full_name,
                'email' => $profile->email,
                'phone' => $profile->phone,
                'headline' => $profile->headline,
                'summary' => $profile->summary,
                'location' => $profile->location,
                'website' => $profile->website,
                'linkedin' => $profile->linkedin,
                'github' => $profile->github,
                'github_repositories' => $profile->github_repositories ?? [],
                'portfolio_links' => $profile->portfolio_links ?? [],
            ],
            'skills' => $profile->skills->pluck('name')->all(),
            'experiences' => $profile->experiences->map(fn (CvExperience $e) => [
                'id' => $e->id,
                'company' => $e->company,
                'role' => $e->role,
                'startDate' => $e->start_date,
                'endDate' => $e->end_date,
                'current' => $e->is_current,
                'description' => $e->description,
            ])->all(),
            'education' => $profile->education->map(fn (CvEducation $e) => [
                'id' => $e->id,
                'school' => $e->institution,
                'degree' => $e->degree,
                'fieldOfStudy' => $e->field_of_study,
                'startDate' => $e->start_date,
                'endDate' => $e->end_date,
                'current' => $e->is_current,
            ])->all(),
            'languages' => $profile->languages->map(fn (CvLanguage $l) => [
                'id' => $l->id,
                'language' => $l->language,
                'level' => $l->level,
            ])->all(),
            'projects' => $profile->projects->map(fn (CvProject $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'description' => $p->description,
                'technologies' => $p->technologies ?? [],
                'url' => $p->url,
                'startDate' => $p->start_date,
                'endDate' => $p->end_date,
            ])->all(),
            'certifications' => $profile->certifications->map(fn (CvCertification $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'issuer' => $c->issuer,
                'year' => $c->year,
            ])->all(),
        ];
    }

    private function mapParsedToPayload(array $parsed): array
    {
        return [
            'skills' => $parsed['skills'] ?? [],
            'experiences' => collect($parsed['experience'] ?? [])->map(fn ($item) => [
                'company' => $item['company'] ?? '',
                'role' => $item['role'] ?? $item['title'] ?? '',
                'startDate' => $item['start_date'] ?? $item['startDate'] ?? '',
                'endDate' => $item['end_date'] ?? $item['endDate'] ?? '',
                'current' => empty($item['end_date']) && empty($item['endDate']),
                'description' => $item['description'] ?? '',
            ])->all(),
            'education' => collect($parsed['education'] ?? [])->map(fn ($item) => [
                'school' => $item['institution'] ?? $item['school'] ?? '',
                'degree' => $item['degree'] ?? '',
                'fieldOfStudy' => $item['field_of_study'] ?? $item['fieldOfStudy'] ?? $item['field'] ?? '',
                'startDate' => $item['start_date'] ?? $item['startDate'] ?? '',
                'endDate' => $item['end_date'] ?? $item['endDate'] ?? '',
                'current' => false,
            ])->all(),
            'languages' => collect($parsed['languages'] ?? [])->map(fn ($item) => [
                'language' => $item['language'] ?? $item['name'] ?? '',
                'level' => $item['level'] ?? 'Fluent',
            ])->all(),
            'projects' => collect($parsed['projects'] ?? [])->map(fn ($item) => [
                'name' => $item['name'] ?? '',
                'description' => $item['description'] ?? '',
                'technologies' => $item['technologies'] ?? [],
                'url' => $item['url'] ?? $item['link'] ?? null,
                'startDate' => $item['start_date'] ?? null,
                'endDate' => $item['end_date'] ?? null,
            ])->all(),
            'certifications' => collect($parsed['certifications'] ?? [])->map(fn ($item) => [
                'name' => $item['name'] ?? '',
                'issuer' => $item['issuer'] ?? null,
                'year' => isset($item['year']) ? (string) $item['year'] : null,
            ])->all(),
        ];
    }

    private function replaceChildren(CvProfile $profile, array $payload): void
    {
        $profile->skills()->delete();
        $profile->experiences()->delete();
        $profile->education()->delete();
        $profile->languages()->delete();
        $profile->projects()->delete();
        $profile->certifications()->delete();

        foreach ($payload['skills'] ?? [] as $i => $skill) {
            $name = is_string($skill) ? trim($skill) : '';
            if ($name === '') {
                continue;
            }
            CvSkill::query()->create([
                'cv_profile_id' => $profile->id,
                'name' => $name,
                'sort_order' => $i,
            ]);
        }

        foreach ($payload['experiences'] ?? [] as $i => $exp) {
            if (empty($exp['company']) && empty($exp['role'])) {
                continue;
            }
            CvExperience::query()->create([
                'cv_profile_id' => $profile->id,
                'company' => $exp['company'] ?? '',
                'role' => $exp['role'] ?? '',
                'start_date' => $exp['startDate'] ?? $exp['start_date'] ?? null,
                'end_date' => !empty($exp['current']) ? null : ($exp['endDate'] ?? $exp['end_date'] ?? null),
                'is_current' => !empty($exp['current']),
                'description' => $exp['description'] ?? null,
                'sort_order' => $i,
            ]);
        }

        foreach ($payload['education'] ?? [] as $i => $edu) {
            if (empty($edu['school']) && empty($edu['institution']) && empty($edu['degree'])) {
                continue;
            }
            CvEducation::query()->create([
                'cv_profile_id' => $profile->id,
                'institution' => $edu['school'] ?? $edu['institution'] ?? '',
                'degree' => $edu['degree'] ?? null,
                'field_of_study' => $edu['fieldOfStudy'] ?? $edu['field_of_study'] ?? $edu['field'] ?? null,
                'start_date' => $edu['startDate'] ?? $edu['start_date'] ?? null,
                'end_date' => !empty($edu['current']) ? null : ($edu['endDate'] ?? $edu['end_date'] ?? null),
                'is_current' => !empty($edu['current']),
                'sort_order' => $i,
            ]);
        }

        foreach ($payload['languages'] ?? [] as $i => $lang) {
            if (empty($lang['language'])) {
                continue;
            }
            CvLanguage::query()->create([
                'cv_profile_id' => $profile->id,
                'language' => $lang['language'],
                'level' => $lang['level'] ?? 'Fluent',
                'sort_order' => $i,
            ]);
        }

        foreach ($payload['projects'] ?? [] as $i => $project) {
            if (empty($project['name'])) {
                continue;
            }
            CvProject::query()->create([
                'cv_profile_id' => $profile->id,
                'name' => $project['name'],
                'description' => $project['description'] ?? null,
                'technologies' => $project['technologies'] ?? [],
                'url' => $project['url'] ?? null,
                'start_date' => $project['startDate'] ?? $project['start_date'] ?? null,
                'end_date' => $project['endDate'] ?? $project['end_date'] ?? null,
                'sort_order' => $i,
            ]);
        }

        foreach ($payload['certifications'] ?? [] as $i => $cert) {
            if (empty($cert['name'])) {
                continue;
            }
            CvCertification::query()->create([
                'cv_profile_id' => $profile->id,
                'name' => $cert['name'],
                'issuer' => $cert['issuer'] ?? null,
                'year' => isset($cert['year']) ? (string) $cert['year'] : null,
                'sort_order' => $i,
            ]);
        }
    }

    private function descriptionToBullets(?string $description): array
    {
        if (!$description) {
            return [];
        }

        $lines = preg_split('/\r\n|\r|\n/', $description) ?: [];

        return array_values(array_filter(array_map('trim', $lines)));
    }
}
