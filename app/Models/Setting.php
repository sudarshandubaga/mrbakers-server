<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'store_name',
        'app_version',
        'email',
        'phone',
        'help_support',
        'privacy_policy',
        'terms_conditions',
        'disclaimer'
    ];
}
