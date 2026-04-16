<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProductoWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Producto::class);
        return Inertia::render('panel/Producto/indexProducto');
    }
}