<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Services\AIService;
use App\Services\CVRatingService;
use App\Services\JobMatchingService;
use App\Services\CvProfileService;
use App\Services\OCRService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
{
    public function __construct(
        private readonly OCRService $ocrService,
        private readonly AIService $aiService,
        private readonly CVRatingService $cvRatingService,
        private readonly JobMatchingService $jobMatchingService,
        private readonly CvProfileService $cvProfileService,
    ) {
    }

    public function show(Request $request): JsonResponse
    {
        $resume = $this->latestResumeForUser($request);

        if (!$resume) {
            return response()->json(['resume' => null]);
        }

        return response()->json(['resume' => $resume->toApiArray()]);
    }

    public function upload(Request $request): JsonResponse
    {
        $maxKb = (int) config('resume.max_upload_kb', 5120);

        $validated = $request->validate([
            'resume' => ['required', 'file', 'mimes:pdf', 'max:'.$maxKb],
        ]);

        $file = $validated['resume'];
        $user = $request->user();
        $path = $file->store("resumes/{$user->id}", 'local');

        $resume = Resume::query()->create([
            'user_id' => $user->id,
            'original_filename' => $file->getClientOriginalName(),
            'path' => $path,
            'file_size' => $file->getSize(),
            'status' => Resume::STATUS_UPLOADED,
        ]);

        try {
            $result = $this->processResume($resume);

            return response()->json([
                'message' => 'Resume uploaded and analyzed successfully.',
                'resume' => $result->toApiArray(),
                'parsed' => $result->parsed_data,
                'ats' => $result->ats_rating,
                'job_match' => $result->job_match,
                'profile' => $this->cvProfileService->toApiPayload($result->cvProfile),
            ], 201);
        } catch (\Throwable $exception) {
            $resume->update([
                'status' => Resume::STATUS_FAILED,
                'error_message' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Resume uploaded, but analysis failed.',
                'error' => $exception->getMessage(),
                'resume' => $resume->fresh()->toApiArray(),
            ], 422);
        }
    }

    public function analyze(Request $request, Resume $resume): JsonResponse
    {
        $this->authorizeResume($request, $resume);

        if ($resume->status === Resume::STATUS_PROCESSING) {
            return response()->json([
                'message' => 'Analysis already in progress.',
                'resume' => $resume->toApiArray(),
            ], 409);
        }

        $resume->update([
            'status' => Resume::STATUS_PROCESSING,
            'error_message' => null,
        ]);

        try {
            $result = $this->processResume($resume);

            return response()->json([
                'message' => 'Resume analyzed successfully.',
                'resume' => $result->toApiArray(),
                'parsed' => $result->parsed_data,
                'ats' => $result->ats_rating,
                'job_match' => $result->job_match,
                'profile' => $this->cvProfileService->toApiPayload($result->cvProfile),
            ]);
        } catch (\Throwable $exception) {
            $resume->update([
                'status' => Resume::STATUS_FAILED,
                'error_message' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Resume analysis failed.',
                'error' => $exception->getMessage(),
                'resume' => $resume->fresh()->toApiArray(),
            ], 422);
        }
    }

    public function atsScore(Request $request, Resume $resume): JsonResponse
    {
        $this->authorizeResume($request, $resume);

        if (!$resume->parsed_data) {
            return response()->json([
                'message' => 'Resume must be analyzed before ATS scoring.',
            ], 422);
        }

        $atsRating = $this->cvRatingService->rate(
            $resume->parsed_data,
            $resume->extracted_text ?? ''
        );

        $resume->update(['ats_rating' => $atsRating]);

        return response()->json(['ats' => $atsRating]);
    }

    public function jobMatch(Request $request, Resume $resume): JsonResponse
    {
        $this->authorizeResume($request, $resume);

        if (!$resume->parsed_data) {
            return response()->json([
                'message' => 'Resume must be analyzed before job matching.',
            ], 422);
        }

        $validated = $request->validate([
            'job_listing_id' => ['nullable', 'integer', 'exists:job_listings,id'],
        ]);

        $jobs = \App\Models\JobListing::query()->where('is_active', true)->get();
        $this->jobMatchingService->ensureJobEmbeddings($jobs);

        $jobMatch = $this->jobMatchingService->match(
            $resume->parsed_data,
            $validated['job_listing_id'] ?? null
        );

        $resume->update(['job_match' => $jobMatch]);

        return response()->json(['job_match' => $jobMatch]);
    }

    private function latestResumeForUser(Request $request): ?Resume
    {
        return Resume::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->first();
    }

    private function processResume(Resume $resume): Resume
    {
        $resume->update([
            'status' => Resume::STATUS_PROCESSING,
            'error_message' => null,
        ]);

        return DB::transaction(function () use ($resume) {
            $extractedText = $this->ocrService->extractFromPdf($resume->path, 'local');
            $parsedData = $this->aiService->parseCvText($extractedText);
            $atsRating = $this->cvRatingService->rate($parsedData, $extractedText);

            $jobs = \App\Models\JobListing::query()->where('is_active', true)->get();
            $this->jobMatchingService->ensureJobEmbeddings($jobs);
            $jobMatch = $this->jobMatchingService->match($parsedData);

            $profile = $this->cvProfileService->syncFromParsedData($resume->user, $parsedData);

            $resume->update([
                'cv_profile_id' => $profile->id,
                'extracted_text' => $extractedText,
                'parsed_data' => $parsedData,
                'ats_rating' => $atsRating,
                'job_match' => $jobMatch,
                'status' => Resume::STATUS_COMPLETED,
                'analyzed_at' => now(),
            ]);

            return $resume->fresh(['cvProfile']);
        });
    }

    private function authorizeResume(Request $request, Resume $resume): void
    {
        if ($resume->user_id !== $request->user()->id) {
            abort(403, 'You are not allowed to access this resume.');
        }
    }
}
