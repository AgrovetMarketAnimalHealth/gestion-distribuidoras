<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Zona;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ZonaWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Zona::class);
        return Inertia::render('panel/Zona/indexZona');
    }
}