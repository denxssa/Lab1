<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HrTeamMember extends Model
{
    protected $fillable = ['name', 'title', 'photo_path'];
}
