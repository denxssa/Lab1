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
                'name'                  => 'Test User',
                'role'                  => User::ROLE_CANDIDATE,
                'password'              => Hash::make(InterviewSeeder::DEMO_PASSWORD),
                'account_status'        => User::STATUS_ACTIVE,
                'first_login_completed' => true,
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'admin1@gmail.com'],
            [
                'name'                  => 'Admin',
                'role'                  => User::ROLE_ADMIN,
                'password'              => Hash::make('admin123'),
                'account_status'        => User::STATUS_ACTIVE,
                'first_login_completed' => true,
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'hr@beehired.com'],
            [
                'name'                  => 'HR Manager',
                'role'                  => User::ROLE_HR,
                'password'              => Hash::make('hr123456'),
                'account_status'        => User::STATUS_ACTIVE,
                'first_login_completed' => true,
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'user@beehired.com'],
            [
                'name'                  => 'Demo User',
                'role'                  => User::ROLE_CANDIDATE,
                'password'              => Hash::make('user123456'),
                'account_status'        => User::STATUS_ACTIVE,
                'first_login_completed' => true,
            ]
        );

        $this->call(InterviewSeeder::class);
        $this->call(JobListingSeeder::class);
        $this->call(JobApplicationSeeder::class);
        $this->call(CvTemplateSeeder::class);
    }
}
