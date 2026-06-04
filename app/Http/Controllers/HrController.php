<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HrController extends Controller
{
    // ── Applications (HR view) ────────────────────────────────────────────

    public function applications(): JsonResponse
    {
        $apps = JobApplication::with([
                'candidate.cvProfile.skills',
                'candidate.cvProfile.experiences',
                'candidate.latestResume',
                'jobListing',
            ])
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($a) => $this->mapApplication($a));

        return response()->json(['applications' => $apps]);
    }

    public function updateApplication(Request $request, $id): JsonResponse
    {
        $app = JobApplication::findOrFail($id);
        $request->validate(['status' => 'required|in:reviewing,shortlisted,hired,rejected']);
        $app->status = $request->status;
        $app->save();

        return response()->json([
            'application' => $this->mapApplication(
                $app->fresh(['candidate.cvProfile.skills', 'candidate.cvProfile.experiences', 'candidate.latestResume', 'jobListing'])
            ),
        ]);
    }

    // ── Applicants for a specific job listing (HR view) ───────────────────

    public function jobApplicants($jobListingId): JsonResponse
    {
        $listing = JobListing::findOrFail($jobListingId);

        $apps = JobApplication::with([
                'candidate.cvProfile.skills',
                'candidate.latestResume',
                'jobListing',
            ])
            ->where('job_listing_id', $jobListingId)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($a) => $this->mapApplication($a));

        return response()->json([
            'job'          => ['id' => $listing->id, 'title' => $listing->title],
            'applications' => $apps,
        ]);
    }

    // ── Candidate full profile (HR view) ─────────────────────────────────

    public function candidateProfile($userId): JsonResponse
    {
        $user = User::with([
            'cvProfile.skills',
            'cvProfile.experiences',
            'cvProfile.education',
            'cvProfile.languages',
            'cvProfile.projects',
            'cvProfile.certifications',
            'latestResume',
        ])->findOrFail($userId);

        $cv = $user->cvProfile;

        $experiences = collect($cv?->experiences ?? [])->map(fn($e) => [
            'role'        => $e->role,
            'company'     => $e->company,
            'start_date'  => $e->start_date ?? '',
            'end_date'    => $e->end_date ?? '',
            'is_current'  => (bool) $e->is_current,
            'description' => $e->description ?? '',
        ])->values();

        $education = collect($cv?->education ?? [])->map(fn($e) => [
            'degree'         => $e->degree ?? '',
            'institution'    => $e->institution ?? '',
            'field_of_study' => $e->field_of_study ?? '',
            'start_date'     => $e->start_date ?? '',
            'end_date'       => $e->end_date ?? '',
            'is_current'     => (bool) ($e->is_current ?? false),
        ])->values();

        $resume = $user->latestResume ? [
            'filename'    => $user->latestResume->original_filename,
            'ats_rating'  => $user->latestResume->ats_rating,
            'analyzed_at' => $user->latestResume->analyzed_at?->format('M d, Y'),
            'status'      => $user->latestResume->status,
        ] : null;

        return response()->json([
            'id'              => $user->id,
            'name'            => $user->name,
            'email'           => $user->email,
            'initials'        => $this->initials($user->name),
            'headline'        => $cv?->headline ?? '',
            'summary'         => $cv?->summary ?? '',
            'phone'           => $cv?->phone ?? '',
            'location'        => $cv?->location ?? '',
            'linkedin'        => $cv?->linkedin ?? '',
            'github'          => $cv?->github ?? '',
            'website'         => $cv?->website ?? '',
            'desired_role'    => $cv?->desired_role ?? '',
            'expected_salary' => $cv?->expected_salary,
            'availability'    => $cv?->availability ?? '',
            'skills'          => $cv?->skills?->pluck('name') ?? [],
            'experiences'     => $experiences,
            'education'       => $education,
            'languages'       => $cv?->languages?->pluck('language') ?? [],
            'resume'          => $resume,
        ]);
    }

    // ── My applications (candidate view) ─────────────────────────────────

    public function myApplications(Request $request): JsonResponse
    {
        $apps = JobApplication::with(['jobListing'])
            ->where('candidate_user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($a) => [
                'id'     => $a->id,
                'status' => ucfirst($a->status),
                'date'   => $a->created_at?->format('M d, Y') ?? '—',
                'job'    => [
                    'id'       => $a->jobListing?->id,
                    'title'    => $a->jobListing?->title    ?? '—',
                    'company'  => $a->jobListing?->company  ?? '—',
                    'location' => $a->jobListing?->location ?? '—',
                    'salary'   => $a->jobListing?->salary   ?? '—',
                    'type'     => $a->jobListing?->type     ?? '—',
                ],
            ]);

        return response()->json(['applications' => $apps]);
    }

    // ── Analytics ────────────────────────────────────────────────────────

    public function analytics(): JsonResponse
    {
        $totalApps   = JobApplication::count();
        $activeJobs  = JobListing::where('status', 'active')->count();
        $hired       = JobApplication::where('status', 'hired')->count();
        $shortlisted = JobApplication::where('status', 'shortlisted')->count();
        $interviewed = Interview::count();
        $conversionRate = $totalApps > 0 ? round(($hired / $totalApps) * 100, 1) : 0;

        $stats = [
            ['label' => 'Total Applications', 'value' => (string) $totalApps,  'icon' => 'FaUsers'],
            ['label' => 'Conversion Rate',    'value' => $conversionRate . '%', 'icon' => 'FaPercent'],
            ['label' => 'Avg. Time to Hire',  'value' => '—',                   'icon' => 'FaClock'],
            ['label' => 'Active Jobs',        'value' => (string) $activeJobs,  'icon' => 'FaBriefcase'],
        ];

        $funnel = [
            ['label' => 'Applied',     'value' => $totalApps],
            ['label' => 'Shortlisted', 'value' => $shortlisted],
            ['label' => 'Interviewed', 'value' => $interviewed],
            ['label' => 'Hired',       'value' => $hired],
        ];

        $byJob = JobApplication::query()
            ->join('job_listings', 'job_applications.job_listing_id', '=', 'job_listings.id')
            ->select('job_listings.title', DB::raw('count(*) as apps'))
            ->groupBy('job_listings.id', 'job_listings.title')
            ->orderByDesc('apps')
            ->limit(7)
            ->get()
            ->map(fn($r) => ['title' => $r->title, 'apps' => (int) $r->apps])
            ->values()
            ->toArray();

        $monthly = [];
        for ($i = 5; $i >= 0; $i--) {
            $date  = now()->subMonths($i);
            $count = JobApplication::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
            $monthly[] = ['month' => $date->format('M'), 'apps' => $count];
        }

        return response()->json(compact('stats', 'funnel', 'byJob', 'monthly'));
    }

    // ── Hires ─────────────────────────────────────────────────────────────

    public function hires(): JsonResponse
    {
        $hires = JobApplication::with(['candidate', 'jobListing'])
            ->where('status', 'hired')
            ->orderByDesc('updated_at')
            ->get()
            ->map(function ($app) {
                $hiredAt = $app->hired_at ?? $app->updated_at;
                $daysAgo = $hiredAt ? now()->diffInDays($hiredAt) : 999;
                $status  = $daysAgo <= 30 ? 'Starting Soon' : 'Active';

                return [
                    'id'                => $app->id,
                    'candidate_user_id' => $app->candidate_user_id,
                    'name'              => $app->candidate?->name ?? 'Unknown',
                    'initials'          => $this->initials($app->candidate?->name),
                    'role'              => $app->jobListing?->title    ?? '—',
                    'dept'              => $app->jobListing?->company  ?? '—',
                    'location'          => $app->jobListing?->location ?? '—',
                    'salary'            => $app->jobListing?->salary   ?? '—',
                    'email'             => $app->candidate?->email     ?? '',
                    'hiredDate'         => $hiredAt?->format('M d, Y') ?? '—',
                    'status'            => $status,
                ];
            });

        return response()->json(['hires' => $hires]);
    }

    // ── Apply (candidate) ────────────────────────────────────────────────

    public function apply(Request $request, $jobListingId): JsonResponse
    {
        $listing = JobListing::where('status', 'active')->findOrFail($jobListingId);

        $existing = JobApplication::where('candidate_user_id', $request->user()->id)
            ->where('job_listing_id', $jobListingId)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'You have already applied for this job.'], 422);
        }

        $application = JobApplication::create([
            'candidate_user_id' => $request->user()->id,
            'job_listing_id'    => $listing->id,
            'status'            => JobApplication::STATUS_REVIEWING,
        ]);

        return response()->json(['application' => $application], 201);
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private function mapApplication(JobApplication $app): array
    {
        $name = $app->candidate?->name ?? 'Unknown';
        $cv   = $app->candidate?->cvProfile;

        $skills = $cv?->skills?->pluck('name')->toArray() ?? [];

        $latestExp = $cv?->experiences?->first();
        $experience = $latestExp
            ? trim(($latestExp->role ?? '') . ($latestExp->company ? ' at ' . $latestExp->company : ''))
            : '—';

        return [
            'id'               => $app->id,
            'candidate_user_id'=> $app->candidate_user_id,
            'name'             => $name,
            'initials'         => $this->initials($name),
            'role'             => $app->jobListing?->title    ?? '—',
            'company'          => $app->jobListing?->company  ?? '—',
            'status'           => ucfirst($app->status),
            'date'             => $app->created_at?->diffForHumans() ?? '—',
            'email'            => $app->candidate?->email ?? '—',
            'phone'            => $cv?->phone    ?? '',
            'linkedin'         => $cv?->linkedin ?? '',
            'location'         => $cv?->location ?? $app->jobListing?->location ?? '—',
            'summary'          => $cv?->summary  ?? '',
            'headline'         => $cv?->headline ?? '',
            'skills'           => $skills,
            'experience'       => $experience,
            'job_listing_id'   => $app->job_listing_id,
            'history'          => [
                ['stage' => 'Applied', 'date' => $app->created_at?->format('M d, Y') ?? '—'],
            ],
        ];
    }

    private function initials(?string $name): string
    {
        if (!$name) {
            return '?';
        }

        return collect(explode(' ', trim($name)))
            ->filter()
            ->map(fn($w) => strtoupper($w[0]))
            ->take(2)
            ->implode('');
    }
}
