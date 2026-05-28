<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    public const STATUS_REVIEWING = 'reviewing';

    public const STATUS_SHORTLISTED = 'shortlisted';

    public const STATUS_HIRED = 'hired';

    public const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'candidate_user_id',
        'job_listing_id',
        'status',
    ];

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'candidate_user_id');
    }

    public function jobListing(): BelongsTo
    {
        return $this->belongsTo(JobListing::class);
    }
}
