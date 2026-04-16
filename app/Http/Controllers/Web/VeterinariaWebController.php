<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Veterinaria;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class VeterinariaWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Veterinaria::class);
        return Inertia::render('panel/Veterinaria/indexVeterinaria');
    }
}