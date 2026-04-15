<?php

namespace App\Services;

use App\Models\Area;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AreaService
{
    public function crear(array $data): Area
    {
        return DB::transaction(function () use ($data) {
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
            
            return Area::create($data);
        });
    }

    public function actualizar(Area $area, array $data): Area
    {
        return DB::transaction(function () use ($area, $data) {
            $data['updated_by'] = Auth::id();
            $area->update($data);
            
            return $area->fresh();
        });
    }

    public function eliminar(Area $area): void
    {
        DB::transaction(function () use ($area) {
            $area->deleted_by = Auth::id();
            $area->save();
            $area->delete();
        });
    }

    public function restaurar(string $id): Area
    {
        return DB::transaction(function () use ($id) {
            $area = Area::withTrashed()->findOrFail($id);
            $area->deleted_by = null;
            $area->restore();
            
            return $area;
        });
    }
}