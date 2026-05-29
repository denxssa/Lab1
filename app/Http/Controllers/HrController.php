<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\JobApplication;
use App\Models\JobListing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HrController extends Controller
{
    // ── Applications ─────────────────────────────────────────────────────

    public function applications(): JsonResponse
    {
        $apps = JobApplication::with(['candidate', 'jobListing'])
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
            'application' => $this->mapApplication($app->fresh(['candidate', 'jobListing'])),
        ]);
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
            ['label' => 'Total Applications', 'value' => (string) $totalApps,          'icon' => 'FaUsers'],
            ['label' => 'Conversion Rate',    'value' => $conversionRate . '%',         'icon' => 'FaPercent'],
            ['label' => 'Avg. Time to Hire',  'value' => '—',                           'icon' => 'FaClock'],
            ['label' => 'Active Jobs',        'value' => (string) $activeJobs,          'icon' => 'FaBriefcase'],
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
            ->map(fn($app) => [
                'id'        => $app->id,
                'name'      => $app->candidate?->name ?? 'Unknown',
                'initials'  => $this->initials($app->candidate?->name),
                'role'      => $app->jobListing?->title    ?? '—',
                'dept'      => $app->jobListing?->company  ?? '—',
                'location'  => $app->jobListing?->location ?? '—',
                'salary'    => $app->jobListing?->salary   ?? '—',
                'hiredDate' => $app->updated_at?->format('M d, Y'),
                'status'    => 'Active',
            ]);

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

        return [
            'id'             => $app->id,
            'name'           => $name,
            'initials'       => $this->initials($name),
            'role'           => $app->jobListing?->title   ?? '—',
            'company'        => $app->jobListing?->company ?? '—',
            'status'         => ucfirst($app->status),
            'date'           => $app->created_at?->diffForHumans() ?? '—',
            'email'          => $app->candidate?->email    ?? '—',
            'location'       => $app->jobListing?->location ?? '—',
            'job_listing_id' => $app->job_listing_id,
            'skills'         => [],
            'summary'        => '',
            'experience'     => '—',
            'history'        => [
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
