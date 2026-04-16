<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Pop;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PopWebController extends Controller{
    public function index(): Response{
        Gate::authorize('viewAny', Pop::class);
        return Inertia::render('panel/Pops/indexPop');
    }
}