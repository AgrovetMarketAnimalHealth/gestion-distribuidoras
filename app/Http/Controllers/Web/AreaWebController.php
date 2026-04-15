<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Area;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AreaWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Area::class);
        return Inertia::render('panel/Area/indexArea');
    }
}