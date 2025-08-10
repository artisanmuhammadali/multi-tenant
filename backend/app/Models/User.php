<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable , HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'detail_type',
        'detail_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    protected static function booted()
    {
        static::creating(function ($user) {
            $map = [
                'tenant' => \App\Models\Tenant::class,
                'customer' => \App\Models\Customer::class,
                'super-admin' => \App\Models\User::class,
                'technician' => \App\Models\Tenant::class,
            ];

            if (isset($map[$user->role])) {
                $user->detail_type = $map[$user->role];
            }
        });
    }

    public function detail()
    {
        return $this->morphTo();
    }
    public function address()
    {
        return $this->hasMany(UserAddress::class);
    }
    public function subscription()
    {
        return $this->hasOne(Subscription::class , 'tenant_id')->where('active' , true);
    }
}
