<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if(!User::where('email','admin@gmail.com')->exists())
        {
            User::factory()->create([
                'name' => 'Super Admin',
                'email' => 'admin@gmail.com',
                'password'=>Hash::make(12345678),
                'role'=>'super-admin'
            ]);
        }
        if(!Plan::where('price',0)->exists())
        {
            Plan::create([
                'name' => 'Free Trial',
                'price' => 0,
                'description'=>'<ul><li>Access to Multi Tenant for 30 Days</li></ul>',
                'expire_after'=>30
            ]);
        }
    }
}
