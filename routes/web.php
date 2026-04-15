<?php

use App\Http\Controllers\Panel\AreaController;
use App\Http\Controllers\Panel\CategoriaController;
use App\Http\Controllers\Web\AreaWebController;
use App\Http\Controllers\Web\CategoriaWebController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    #BACKEND => FRONTEND
    Route::prefix('panel')->group(function () {
        Route::get('/categoria', [CategoriaWebController::class,'index'])->name('categoria.index');
        Route::get('/areas', [AreaWebController::class,'index'])->name('areas.index');
    });

    #BACKEND => AREAS
    Route::apiResource('area', AreaController::class);
    Route::post('area/{id}/restore', [AreaController::class, 'restore']);
    
    #BACKEND => CATEGORIAS
    Route::apiResource('categorias', CategoriaController::class);
    Route::post('categorias/{id}/restore', [CategoriaController::class, 'restore']);
});

require __DIR__.'/settings.php';
