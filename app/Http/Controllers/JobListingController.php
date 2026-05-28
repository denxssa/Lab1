<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobListingRequest;
use App\Http\Requests\UpdateJobListingRequest;
use App\Models\JobListing;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class JobListingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = JobListing::query()
            ->where('status', 'active')
            ->where('is_active', true);

        $type = trim((string) $request->query('type', ''));
        if ($type !== '' && strcasecmp($type, 'all') !== 0) {
            if (strcasecmp($type, 'remote') === 0) {
                $query->where(function ($builder) {
                    $builder->whereJsonContains('types', 'Remote')
                        ->orWhere('type', 'Remote')
                        ->orWhere('location', 'like', '%remote%');
                });
            } else {
                $query->where(function ($builder) use ($type) {
                    $builder->whereJsonContains('types', $type)
                        ->orWhere('type', $type);
                });
            }
        }

        $search = trim((string) $request->query('q', ''));
        if ($search !== '') {
            $like = '%'.$search.'%';
            $query->where(function ($builder) use ($like) {
                $builder->where('title', 'like', $like)
                    ->orWhere('company', 'like', $like)
                    ->orWhere('location', 'like', $like)
                    ->orWhere('salary', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhere('tags', 'like', $like);
            });
        }

        $jobs = $query->orderByDesc('created_at')->get();

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

    public function store(StoreJobListingRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $types = $validated['types'];
        $typesLabel = JobListing::typesLabel($types);

        $description = $validated['description'] ?? trim(
            "We're looking for a talented {$validated['title']} to join {$validated['company']}. " .
            "This is a {$typesLabel} position based in {$validated['location']}."
        );

        $job = JobListing::query()->create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'company' => $validated['company'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'types' => $types,
            'type' => $types[0] ?? null,
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

        if ($request->has('title')) {
            $formRequest = app(UpdateJobListingRequest::class);
            $validated = validator(
                JobListing::mergeNormalizedInput($request->all()),
                $formRequest->rules(),
                $formRequest->messages()
            )->validate();

            return $this->updateJobFields($validated, $jobListing);
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

    public function destroy(Request $request, JobListing $jobListing): JsonResponse
    {
        if (!$this->canManageJobs($request->user())) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $jobListing->delete();

        return response()->json([
            'message' => 'Job deleted successfully.',
        ]);
    }

    private function updateJobFields(array $validated, JobListing $jobListing): JsonResponse
    {
        $types = $validated['types'];
        $typesLabel = JobListing::typesLabel($types);

        $description = $validated['description'] ?? $jobListing->description ?? trim(
            "We're looking for a talented {$validated['title']} to join {$validated['company']}. " .
            "This is a {$typesLabel} position based in {$validated['location']}."
        );

        $jobListing->fill([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'types' => $types,
            'type' => $types[0] ?? null,
            'tags' => $validated['tags'] ?? [],
            'description' => $description,
        ]);

        if (isset($validated['status'])) {
            $jobListing->status = $validated['status'];
            $jobListing->is_active = $validated['status'] === 'active';
        }

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
