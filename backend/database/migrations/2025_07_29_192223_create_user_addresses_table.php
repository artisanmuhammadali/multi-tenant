<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('street_no');
            $table->string('house_no')->nullable();
            $table->string('bus_number')->nullable();
            $table->string('postal_code');
            $table->string('city');
            $table->string('country')->nullable();
            $table->enum('type',['home' ,'work','other'])->default('home');
            $table->string('note')->nullable();
            $table->bigInteger('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
