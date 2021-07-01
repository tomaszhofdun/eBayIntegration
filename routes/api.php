<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\EbayImportItemsController;
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
    // Users
    Route::post('/logout',[ AuthController::class, 'logout'] );
    //Inventory
    Route::resource('items', 'ItemController');
    Route::get('/items/s/{name}',[ ItemController::class, 'search']);
    ///Ebay api routes
    Route::get('ebay/import-items', [ EbayImportItemsController::class, 'import']);
    Route::post('ebay/import-items', [ EbayImportItemsController::class, 'save']);
    //Settings
    Route::resource('settings/ebay-token', 'EbayTokenController');
    Route::resource('settings/ebay-sessionId', 'EbaySessionIdController');
    //Profile
    // Route::get('profile', )

});

// Unprotected Routes

// Users
Route::post('/register',[ AuthController::class, 'register'] );
Route::post('/login',[ AuthController::class, 'login'] );

