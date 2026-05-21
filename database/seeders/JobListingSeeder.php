<?php

namespace Database\Seeders;

use App\Models\JobListing;
use Illuminate\Database\Seeder;

class JobListingSeeder extends Seeder
{
    public function run(): void
    {
        $listings = [
            ['title' => 'Senior Frontend Developer', 'company' => 'TechHive', 'location' => 'San Francisco, CA', 'salary' => '$120k - $160k', 'type' => 'Full-time', 'tags' => ['React', 'TypeScript', 'Tailwind'], 'description' => 'Build modern React applications for enterprise clients.'],
            ['title' => 'UX/UI Designer', 'company' => 'DesignBuzz', 'location' => 'Remote', 'salary' => '$90k - $120k', 'type' => 'Full-time', 'tags' => ['Figma', 'User Research', 'Prototyping'], 'description' => 'Design user-centered product experiences.'],
            ['title' => 'Backend Engineer', 'company' => 'CloudForge', 'location' => 'Austin, TX', 'salary' => '$130k - $170k', 'type' => 'Remote', 'tags' => ['Node.js', 'AWS', 'PostgreSQL'], 'description' => 'Design scalable APIs and cloud infrastructure.'],
            ['title' => 'DevOps Engineer', 'company' => 'InfraCore', 'location' => 'Seattle, WA', 'salary' => '$140k - $180k', 'type' => 'Contract', 'tags' => ['Docker', 'Kubernetes', 'CI/CD'], 'description' => 'Own deployment pipelines and cloud reliability.'],
            ['title' => 'Data Scientist', 'company' => 'DataMinds', 'location' => 'Seattle, WA', 'salary' => '$130k - $165k', 'type' => 'Full-time', 'tags' => ['Python', 'Machine Learning', 'TensorFlow'], 'description' => 'Build predictive models and analytics products.'],
            ['title' => 'Mobile App Developer', 'company' => 'AppAxis', 'location' => 'Miami, FL', 'salary' => '$100k - $130k', 'type' => 'Full-time', 'tags' => ['React Native', 'iOS', 'Android'], 'description' => 'Ship cross-platform mobile applications.'],
        ];

        foreach ($listings as $listing) {
            JobListing::query()->updateOrCreate(
                ['title' => $listing['title'], 'company' => $listing['company']],
                array_merge($listing, ['is_active' => true])
            );
        }
    }
}
