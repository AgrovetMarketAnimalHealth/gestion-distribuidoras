<?php

namespace App\Http\Controllers\Panel;

use App\Filters\Categoria\SearchCategoriaFilter;
use App\Filters\Categoria\UserIdCategoriaFilter;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Services\CategoriaService;
use App\Http\Requests\Categoria\StoreCategoriaRequest;
use App\Http\Requests\Categoria\UpdateCategoriaRequest;
use App\Http\Resources\Categoria\CategoriaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Pipeline;

class CategoriaController extends Controller{
    public function __construct(
        private readonly CategoriaService $categoriaService
    ) {}
    public function index(Request $request){
        Gate::authorize('ver categorias');
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $userId = $request->input('user_id');
        $query = Pipeline::send(Categoria::query())
            ->through([
                new SearchCategoriaFilter($search),
                new UserIdCategoriaFilter($userId),
            ])
            ->thenReturn()
            ->with('user')
            ->latest('created_at');
        return CategoriaResource::collection($query->paginate($perPage));
    }
    public function store(StoreCategoriaRequest $request){
        Gate::authorize('crear categorias');
        $categoria = $this->categoriaService->crear($request->validated());
        return new CategoriaResource($categoria->load('user'));
    }
    public function show(Categoria $categoria){
        Gate::authorize('ver categorias');
        return new CategoriaResource($categoria->load('user'));
    }
    public function update(UpdateCategoriaRequest $request, Categoria $categoria){
        Gate::authorize('editar categorias');
        $categoria = $this->categoriaService->actualizar($categoria, $request->validated());
        return new CategoriaResource($categoria->load('user'));
    }
    public function destroy(Categoria $categoria){
        Gate::authorize('eliminar categorias');
        $this->categoriaService->eliminar($categoria);
        return response()->json(['message' => 'Categoría eliminada exitosamente']);
    }
    public function restore($id){
        Gate::authorize('eliminar categorias');
        $categoria = $this->categoriaService->restaurar($id);
        return new CategoriaResource($categoria->load('user'));
    }
}