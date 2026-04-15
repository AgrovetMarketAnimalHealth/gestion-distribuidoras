<?php

namespace App\Http\Controllers\Panel;

use App\Filters\Area\SearchAreaFilter;
use App\Filters\Area\UserIdAreaFilter;
use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Services\AreaService;
use App\Http\Requests\Area\StoreAreaRequest;
use App\Http\Requests\Area\UpdateAreaRequest;
use App\Http\Resources\Area\AreaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Pipeline;

class AreaController extends Controller{
    public function __construct(
        private readonly AreaService $areaService
    ) {}
    public function index(Request $request){
        Gate::authorize('ver areas');
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search');
        $userId = $request->input('user_id');

        $query = Pipeline::send(Area::query())
            ->through([
                new SearchAreaFilter($search),
                new UserIdAreaFilter($userId),
            ])
            ->thenReturn()
            ->with('user')
            ->latest('created_at');
        return AreaResource::collection($query->paginate($perPage));
    }
    public function store(StoreAreaRequest $request){
        Gate::authorize('crear areas');
        $area = $this->areaService->crear($request->validated());
        return new AreaResource($area->load('user'));
    }
    public function show(Area $area){
        Gate::authorize('ver areas');
        return new AreaResource($area->load('user'));
    }
    public function update(UpdateAreaRequest $request, Area $area){
        Gate::authorize('editar areas');
        $area = $this->areaService->actualizar($area, $request->validated());
        return new AreaResource($area->load('user'));
    }
    public function destroy(Area $area){
        Gate::authorize('eliminar areas');
        $this->areaService->eliminar($area);
        return response()->json(['message' => 'Área eliminada exitosamente']);
    }
    public function restore($id){
        Gate::authorize('eliminar areas');
        $area = $this->areaService->restaurar($id);
        return new AreaResource($area->load('user'));
    }
}
