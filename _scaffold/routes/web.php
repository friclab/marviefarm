<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PieceController;
use App\Http\Controllers\SeasonController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('seasons.index'));

// Seasons + procurement sheet
Route::resource('seasons', SeasonController::class);
Route::get('seasons/{season}/procurement', [SeasonController::class, 'procurement'])
    ->name('seasons.procurement');

// Pieces are nested under seasons
Route::resource('seasons.pieces', PieceController::class);

// Materials catalogue
Route::resource('materials', MaterialController::class);

// Customers
Route::resource('customers', CustomerController::class);

// Orders
Route::resource('orders', OrderController::class);
Route::get('api/seasons/{season}/pieces', [OrderController::class, 'piecesBySeason'])
    ->name('api.seasons.pieces');
