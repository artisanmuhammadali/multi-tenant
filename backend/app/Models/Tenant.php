<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'vat',
        'phone_number',
        'is_active',
        'user_id',
    ];

    public function user()
    {
        return $this->morphOne(User::class, 'detail', 'role', 'user_id');
    }
}
