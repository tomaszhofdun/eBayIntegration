<?php

use App\Http\Controllers\AppSettingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ebayController;
use App\Http\Controllers\EbayTokenController;
use App\Http\Controllers\EbayImportItemsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// Protected Routes
Route::group(['middleware' => 'auth:sanctum'], function() {
    //Inventory
    Route::resource('items', 'ItemController');
    Route::get('/items/s/{name}',[ ItemController::class, 'search']);
    Route::post('/logout',[ AuthController::class, 'logout'] );
    ///ebay
    Route::get('ebay/import-items', [ EbayImportItemsController::class, 'import']);
    //Settings
    Route::resource('settings/ebay-token', 'EbayTokenController');
    Route::resource('settings/ebay-sessionId', 'EbaySessionIdController');
    //Profile
    // Route::get('profile', )

});

// Unprotected Routes

Route::post('/register',[ AuthController::class, 'register'] );
Route::post('/login',[ AuthController::class, 'login'] );

