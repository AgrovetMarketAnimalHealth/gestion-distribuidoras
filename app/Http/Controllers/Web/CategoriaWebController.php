<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CategoriaWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Categoria::class);
        return Inertia::render('panel/Categoria/indexCategoria');
    }
}