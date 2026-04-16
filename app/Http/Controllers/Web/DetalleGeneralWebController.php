<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\DetalleGeneral;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DetalleGeneralWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny',  DetalleGeneral::class);
        return Inertia::render('panel/DetalleGeneral/indexDetalleGeneral');
    }
}