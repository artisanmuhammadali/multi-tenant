<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    protected $fillable =[
        'transaction_id',
        'tenant_id',
        'plan_id',
        'amount',
        'status',
    ];
}
