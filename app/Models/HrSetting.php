<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HrSetting extends Model
{
    protected $fillable = [
        'company_name',
        'industry',
        'size',
        'location',
        'website',
        'description',
        'notifications',
    ];

    protected $casts = [
        'notifications' => 'array',
    ];
}
