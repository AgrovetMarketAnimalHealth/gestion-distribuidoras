<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Distribuidora;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DistribuidoraWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Distribuidora::class);
        return Inertia::render('panel/Distribuidora/indexDistribuidora');
    }
}