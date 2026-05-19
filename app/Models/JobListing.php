<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'company',
        'location',
        'salary',
        'type',
        'tags',
        'description',
        'embedding',
        'is_active',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'embedding' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function toMatchText(): string
    {
        $tags = implode(', ', $this->tags ?? []);

        return trim("{$this->title} at {$this->company}. {$this->description}. Skills: {$tags}");
    }
}
