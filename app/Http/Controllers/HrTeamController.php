<?php

namespace App\Http\Controllers;

use App\Models\HrTeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HrTeamController extends Controller
{
    public function index(): JsonResponse
    {
        $members = HrTeamMember::orderBy('created_at')->get()->map(fn($m) => [
            'id'    => $m->id,
            'name'  => $m->name,
            'title' => $m->title,
            'photo' => $m->photo_path ? asset('storage/' . $m->photo_path) : null,
        ]);

        return response()->json($members);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name'  => 'required|string|max:100',
            'title' => 'nullable|string|max:100',
            'photo' => 'nullable|image|max:2048',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('hr-team', 'public');
        }

        $member = HrTeamMember::create([
            'name'       => $request->name,
            'title'      => $request->title ?? 'Team Member',
            'photo_path' => $photoPath,
        ]);

        return response()->json([
            'id'    => $member->id,
            'name'  => $member->name,
            'title' => $member->title,
            'photo' => $member->photo_path ? asset('storage/' . $member->photo_path) : null,
        ], 201);
    }

    public function destroy($id): JsonResponse
    {
        $member = HrTeamMember::findOrFail($id);

        if ($member->photo_path) {
            Storage::disk('public')->delete($member->photo_path);
        }

        $member->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
