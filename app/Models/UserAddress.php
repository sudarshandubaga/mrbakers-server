<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $fillable = [
        'label',
        'address_line1',
        'address_line2',
        'landmark',
        'city',
        'state_id',
        'pincode',
        'latitude',
        'longitude',
        'is_primary',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
