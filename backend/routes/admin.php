<?php

use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\Tenant\SubscriptionController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| SUPER ADMIN Routes
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'admin' , 'middleware' => Admin::class], function () {
    Route::group(['prefix' => 'tenant' , 'as' => 'tenant.'], function () {
        Route::get('/', [TenantController::class, 'index'])->name('index');
        Route::post('/store', [TenantController::class, 'store'])->name('store');
        Route::get('/detail/{id}', [TenantController::class, 'detail'])->name('detail');
        Route::put('/edit/{id}', [TenantController::class, 'edit'])->name('edit');
        Route::delete('/delete/{id}', [TenantController::class, 'delete'])->name('delete');
        Route::group(['prefix' => 'subscription' , 'as' => 'subscription.'], function () {
            Route::get('/{id}', [SubscriptionController::class, 'index'])->name('index');
            Route::post('/update/{id}', [SubscriptionController::class, 'update'])->name('update');
        });
    });
    Route::group(['prefix' => 'plan' , 'as' => 'plan.'], function () {
        Route::post('/store', [PlanController::class, 'store'])->name('store');
        Route::get('/detail/{id}', [PlanController::class, 'detail'])->name('detail');
        Route::put('/edit/{id}', [PlanController::class, 'edit'])->name('edit');
        Route::delete('/delete/{id}', [PlanController::class, 'delete'])->name('delete');
    });
    Route::group(['prefix' => 'setting' , 'as' => 'setting.'], function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');
        Route::get('/get/{key}', [SettingController::class, 'key'])->name('key');
        Route::post('/store', [SettingController::class, 'store'])->name('store');
    });
});