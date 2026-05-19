<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\InterviewSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'role' => User::ROLE_CANDIDATE,
                'password' => Hash::make(InterviewSeeder::DEMO_PASSWORD),
            ]
        );

        $this->call(InterviewSeeder::class);
        $this->call(JobListingSeeder::class);
        $this->call(CvTemplateSeeder::class);
    }
}
