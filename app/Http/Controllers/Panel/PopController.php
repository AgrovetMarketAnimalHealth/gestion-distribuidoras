<?php

namespace App\Http\Controllers\Panel;

use App\Filters\Pop\SearchPopFilter;
use App\Filters\Pop\UserIdPopFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Pop\StorePopRequest;
use App\Http\Requests\Pop\UpdatePopRequest;
use App\Http\Resources\Pop\PopResource;
use App\Models\Pop;
use App\Services\PopService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Pipeline;

class PopController extends Controller{
    public function __construct(
        private readonly PopService $popaService
    ) {}
    public function index(Request $request){
        Gate::authorize('ver pops');
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $userId = $request->input('user_id');
        $query = Pipeline::send(Pop::query())
            ->through([
                new SearchPopFilter($search),
                new UserIdPopFilter($userId),
            ])
            ->thenReturn()
            ->with('user')
            ->latest('created_at');
        return PopResource::collection($query->paginate($perPage));
    }
    public function store(StorePopRequest $request){
        Gate::authorize('crear pops');
        $pop = $this->popaService->crear($request->validated());
        return new PopResource($pop->load('user'));
    }
    public function show(Pop $pop){
        Gate::authorize('ver pops');
        return new PopResource($pop->load('user'));
    }
    public function update(UpdatePopRequest $request, Pop $pop){
        Gate::authorize('editar pops');
        $pop = $this->popaService->actualizar($pop, $request->validated());
        return new PopResource($pop->load('user'));
    }
    public function destroy(Pop $pop){
        Gate::authorize('eliminar pops');
        $this->popaService->eliminar($pop);
        return response()->json(['message' => 'Pop eliminado exitosamente']);
    }
    public function restore($id){
        Gate::authorize('restaurar pops');
        $pop = $this->popaService->restaurar($id);
        return new PopResource($pop->load('user'));
    }
}