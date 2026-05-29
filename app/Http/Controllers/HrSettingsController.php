<?php

namespace App\Http\Controllers;

use App\Models\HrSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class HrSettingsController extends Controller
{
    public function show(): JsonResponse
    {
        $settings = HrSetting::first();
        return response()->json($settings ?? new HrSetting());
    }

    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'company_name' => 'required|string|max:150',
            'industry'     => 'nullable|string|max:100',
            'size'         => 'nullable|string|max:50',
            'location'     => 'nullable|string|max:150',
            'website'      => 'nullable|string|max:255',
            'description'  => 'nullable|string|max:1000',
        ]);

        $settings = HrSetting::firstOrNew([]);
        $settings->fill($request->only(['company_name', 'industry', 'size', 'location', 'website', 'description']));
        $settings->save();

        return response()->json($settings);
    }

    public function updateNotifications(Request $request): JsonResponse
    {
        $request->validate(['notifications' => 'required|array']);

        $settings = HrSetting::firstOrNew([]);
        $settings->notifications = $request->notifications;
        $settings->save();

        return response()->json(['notifications' => $settings->notifications]);
    }

    public function updateAccount(Request $request): JsonResponse
    {
        $user = $request->user();

        $request->validate([
            'email'        => 'nullable|email|unique:users,email,' . $user->id,
            'new_password' => 'nullable|string|min:6',
        ]);

        if ($request->filled('email')) {
            $user->email = $request->email;
        }

        if ($request->filled('new_password')) {
            $user->password = Hash::make($request->new_password);
        }

        $user->save();

        return response()->json(['message' => 'Account updated.']);
    }
}
