<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'delivery_fee',
        'total',
        'status',
        'payment_id',
        'address_id'
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
