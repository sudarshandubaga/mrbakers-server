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
        'disclaimer',
        'order_from_time',
        'order_to_time',
        'order_disabled_message'
    ];
}
