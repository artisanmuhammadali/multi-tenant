<?php

use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\User\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function (Request $request) {
        return response()->json(['user'=>$request->user()]);
    });
    Route::get('/dashboard-stats', [DashboardController::class, 'index'])->name('dashboard.stats');

    Route::group(['prefix' => 'tenant' , 'as' => 'tenant.'], function () {
        Route::get('/', [TenantController::class, 'index'])->name('index');
        Route::post('/store', [TenantController::class, 'store'])->name('store');
        Route::get('/detail/{id}', [TenantController::class, 'detail'])->name('detail');
        Route::put('/edit/{id}', [TenantController::class, 'edit'])->name('edit');
        Route::delete('/delete/{id}', [TenantController::class, 'delete'])->name('delete');
    });
    Route::group(['prefix' => 'plan' , 'as' => 'plan.'], function () {
        Route::get('/', [PlanController::class, 'index'])->name('index');
        Route::post('/store', [PlanController::class, 'store'])->name('store');
        Route::get('/detail/{id}', [PlanController::class, 'detail'])->name('detail');
        Route::put('/edit/{id}', [PlanController::class, 'edit'])->name('edit');
        Route::delete('/delete/{id}', [PlanController::class, 'delete'])->name('delete');
    });
    Route::group(['prefix' => 'setting' , 'as' => 'setting.'], function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');
        Route::post('/store', [SettingController::class, 'store'])->name('store');
    });
    Route::group(['prefix' => 'subscription' , 'as' => 'subscription.'], function () {
        Route::get('/', [SubscriptionController::class, 'index'])->name('index');
        Route::post('/update', [SubscriptionController::class, 'update'])->name('update');
    });
    Route::group(['prefix' => 'payment' , 'as' => 'payment.'], function () {
        Route::get('/plans-purchase/{id?}', [SubscriptionController::class , 'planBuy'])->name('plan.buy');
        Route::post('/plans/intent',[SubscriptionController::class , 'intent'])->name('plan.intent');
        Route::post('/plans-save', [SubscriptionController::class , 'planSave'])->name('plan.save');
        Route::get('/upgrade-plans', [SubscriptionController::class , 'planUpgrade'])->name('plan.upgrade');
        Route::get('/plans-free-save/{id?}', [SubscriptionController::class , 'planFreeSave'])->name('plan.free.save');
    });
});

require('auth.php');
