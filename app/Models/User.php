<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

#[Fillable(['name', 'email', 'password', 'role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public const ROLE_CANDIDATE = 'candidate';

    public const ROLE_HR = 'hr';

    public const ROLE_ADMIN = 'admin';

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function hrInterviews(): HasMany
    {
        return $this->hasMany(Interview::class, 'hr_user_id');
    }

    public function candidateInterviews(): HasMany
    {
        return $this->hasMany(Interview::class, 'candidate_user_id');
    }

    public function latestResume(): HasOne
    {
        return $this->hasOne(Resume::class)->latestOfMany();
    }

    public function resumes(): HasMany
    {
        return $this->hasMany(Resume::class);
    }

    public function cvProfile(): HasOne
    {
        return $this->hasOne(CvProfile::class);
    }

    public function candidateConversations(): HasMany
    {
        return $this->hasMany(Conversation::class, 'candidate_user_id');
    }

    public function hrConversations(): HasMany
    {
        return $this->hasMany(Conversation::class, 'hr_user_id');
    }

    public function candidateApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'candidate_user_id');
    }

    public function isHr(): bool
    {
        return $this->role === self::ROLE_HR || $this->role === self::ROLE_ADMIN;
    }

    public function isCandidate(): bool
    {
        return $this->role === self::ROLE_CANDIDATE;
    }
}
