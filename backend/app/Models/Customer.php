<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'note',
        'user_id',
        'tenant_id',
    ];
}
