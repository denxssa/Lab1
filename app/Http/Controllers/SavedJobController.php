<?php

namespace App\Http\Controllers;

use App\Models\SavedJob;
use App\Models\JobListing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SavedJobController extends Controller
{
    /** List all saved job IDs for the current user */
    public function index(Request $request): JsonResponse
    {
        $ids = SavedJob::where('user_id', $request->user()->id)
            ->pluck('job_listing_id');

        return response()->json(['saved_job_ids' => $ids]);
    }

    /** Save a job */
    public function store(Request $request): JsonResponse
    {
        $request->validate(['job_listing_id' => 'required|integer|exists:job_listings,id']);

        SavedJob::firstOrCreate([
            'user_id'        => $request->user()->id,
            'job_listing_id' => $request->job_listing_id,
        ]);

        return response()->json(['saved' => true]);
    }

    /** Unsave a job */
    public function destroy(Request $request, $jobListingId): JsonResponse
    {
        SavedJob::where('user_id', $request->user()->id)
            ->where('job_listing_id', $jobListingId)
            ->delete();

        return response()->json(['saved' => false]);
    }
}
