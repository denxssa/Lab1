<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JobListingController extends Controller
{
    public function index(): JsonResponse
    {
        $jobs = JobListing::query()
            ->where('status', 'active')
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['jobs' => $jobs]);
    }

    public function manage(Request $request): JsonResponse
    {
        if (!$this->canManageJobs($request->user())) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $jobs = JobListing::query()
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['jobs' => $jobs]);
    }

    public function show(JobListing $jobListing): JsonResponse
    {
        if ($jobListing->status !== 'active' || !$jobListing->is_active) {
            return response()->json(['message' => 'Job not found.'], 404);
        }

        return response()->json(['job' => $jobListing]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$this->canManageJobs($user)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'salary' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:100'],
            'description' => ['nullable', 'string'],
        ]);

        $description = $validated['description'] ?? trim(
            "We're looking for a talented {$validated['title']} to join {$validated['company']}. " .
            "This is a {$validated['type']} position based in {$validated['location']}."
        );

        $job = JobListing::query()->create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'company' => $validated['company'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'type' => $validated['type'],
            'tags' => $validated['tags'] ?? [],
            'description' => $description,
            'status' => 'active',
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Job posted successfully.',
            'job' => $job,
        ], 201);
    }

    public function update(Request $request, JobListing $jobListing): JsonResponse
    {
        if (!$this->canManageJobs($request->user())) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'status' => ['required', Rule::in(['active', 'paused', 'closed'])],
        ]);

        $jobListing->status = $validated['status'];
        $jobListing->is_active = $validated['status'] === 'active';
        $jobListing->save();

        return response()->json([
            'message' => 'Job updated successfully.',
            'job' => $jobListing,
        ]);
    }

    private function canManageJobs(?User $user): bool
    {
        return $user && in_array($user->role, [User::ROLE_HR, User::ROLE_ADMIN], true);
    }
}
