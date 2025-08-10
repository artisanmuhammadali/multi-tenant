<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use HasFactory ,SoftDeletes;

    protected $fillable = [
        'name',
        'price',
        'description',
        'discount',
        'expire_after',
        'user_limit',
        'device_limit',
        'offline_sync',
        'api_limit',
        'advance_report'
    ];

    protected $appends = ['price_after_discount' , 'active'];

    protected function discount(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value=null) =>   $value == null ? 0 : $value,
        );
    }
    protected function priceAfterDiscount(): Attribute
    {
        return Attribute::make(
            get: fn () => round($this->price - ($this->price * ($this->discount ?? 0) / 100), 2),
        );
    }
    protected function active(): Attribute
    {
        $plan_id = auth()->user()->subscription ? auth()->user()->subscription->plan_id : 0;
        return Attribute::make(
            get: fn () => $this->id == $plan_id,
        );
    }
    protected function description(): Attribute
{
    return Attribute::make(
        get: fn (?string $value = null) => sprintf(
            '<ul>
                <li>%d Technician Accounts</li>
                <li>%d Device connection</li>
                <li>Offline Sync %s</li>
                <li>API Rate Limit %d</li>
            </ul>',
            $this->user_limit,
            $this->device_limit,
            $this->offline_sync ? 'Available' : 'Not Available',
            $this->api_limit
        )
    );
}
}
