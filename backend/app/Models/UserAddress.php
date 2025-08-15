<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $fillable =[
        'street_no',
        'house_no',
        'bus_number',
        'postal_code',
        'city',
        'country',
        'type',
        'note',
        'user_id',
    ];
}
