<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'discount',
        'expire_after'
    ];

    protected $appends = ['price_after_discount'];

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
}
