<?php

use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\Tenant\SubscriptionController as TenantSubscriptionController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Tenant\CustomerController;
use App\Http\Controllers\User\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){

    // Routes for all authenticated users
    Route::get('/user', function (Request $request) {
        return response()->json(['user'=>$request->user()]);
    });
    Route::get('/dashboard-stats', [DashboardController::class, 'index'])->name('dashboard.stats');
    Route::get('plan/', [PlanController::class, 'index'])->name('index');
    Route::group(['prefix' => 'subscription' , 'as' => 'subscription.'], function () {
        Route::get('/', [SubscriptionController::class, 'index'])->name('index');
        Route::post('/update', [SubscriptionController::class, 'update'])->name('update');
    });
    Route::group(['prefix' => 'payment' , 'as' => 'payment.'], function () {
        Route::post('/plans/intent',[SubscriptionController::class , 'intent'])->name('plan.intent');
        Route::post('/plans-save', [SubscriptionController::class , 'planSave'])->name('plan.save');
    });

    require('admin.php');
    require('tenant.php');
    
});

require('auth.php');
