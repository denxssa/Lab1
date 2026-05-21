<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email'     => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
            'role'      => ['nullable', 'string', 'in:candidate,hr'],
        ]);

        $role = in_array($validated['role'] ?? '', [User::ROLE_CANDIDATE, User::ROLE_HR])
            ? $validated['role']
            : User::ROLE_CANDIDATE;

        $user = User::query()->create([
            'name'     => $validated['full_name'],
            'email'    => $validated['email'],
            'password' => $validated['password'],
            'role'     => $role,
        ]);

        $token = Auth::guard('api')->login($user);

        return response()->json([
            'message' => 'Account created successfully.',
            'token'   => $token,
            'user'    => $user,
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        return response()->json([
            'message' => 'Logged in successfully.',
            'token'   => $token,
            'user'    => Auth::guard('api')->user(),
        ]);
    }

    public function logout(): JsonResponse
    {
        Auth::guard('api')->logout();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    public function user(): JsonResponse
    {
        return response()->json([
            'user' => Auth::guard('api')->user(),
        ]);
    }

    public function refresh(): JsonResponse
    {
        $token = Auth::guard('api')->refresh();

        return response()->json([
            'token' => $token,
            'user'  => Auth::guard('api')->user(),
        ]);
    }
}
