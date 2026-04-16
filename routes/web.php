<?php

use App\Http\Controllers\Panel\AreaController;
use App\Http\Controllers\Panel\CategoriaController;
use App\Http\Controllers\Web\AreaWebController;
use App\Http\Controllers\Web\CategoriaWebController;
use App\Http\Controllers\Web\DistribuidoraWebController;
use App\Http\Controllers\Web\PopWebController;
use App\Http\Controllers\Web\ProductoWebController;
use App\Http\Controllers\Web\VeterinariaWebController;
use App\Http\Controllers\Web\ZonaWebController;
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
        Route::get('/pops', [PopWebController::class,'index'])->name('pops.index');
        Route::get('/zona', [ZonaWebController::class,'index'])->name('zona.index');
        Route::get('/distribuidora', [DistribuidoraWebController::class,'index'])->name('distribuidora.index');
        Route::get('/productos', [ProductoWebController::class,'index'])->name('productos.index');
        Route::get('/veterinaria', [VeterinariaWebController::class,'index'])->name('veterinaria.index');
    });
 
    #BACKEND => CATEGORIAS
    Route::apiResource('categorias', CategoriaController::class);
    Route::post('categorias/{id}/restore', [CategoriaController::class, 'restore']);
});

require __DIR__.'/settings.php';
