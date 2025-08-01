<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'vat',
        'company_number',
        'phone_number',
        'is_active',
        'user_id',
    ];
}
