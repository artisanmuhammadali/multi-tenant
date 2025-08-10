<?php

use App\Http\Controllers\Tenant\CustomerController;
use App\Http\Middleware\Tenant;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| TENANT ADMIN Routes
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'tenant' , 'middleware' => Tenant::class], function () {
    Route::group(['prefix' => 'customer' , 'as' => 'customer.'], function () {
        Route::get('/', [CustomerController::class, 'index'])->name('index');
        Route::post('/store', [CustomerController::class, 'store'])->name('store');
        Route::get('/detail/{id}', [CustomerController::class, 'detail'])->name('detail');
        Route::put('/edit/{id}', [CustomerController::class, 'edit'])->name('edit');
        Route::delete('/delete/{id}', [CustomerController::class, 'delete'])->name('delete');
    });
});