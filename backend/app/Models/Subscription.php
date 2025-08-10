<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'tenant_id',
        'plan_id',
        'subscription_ends',
        'active',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class)->withTrashed();
    }

}
