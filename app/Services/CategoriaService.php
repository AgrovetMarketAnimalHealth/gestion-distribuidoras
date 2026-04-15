<?php

namespace App\Services;

use App\Models\Categoria;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoriaService
{
    public function crear(array $data): Categoria
    {
        return DB::transaction(function () use ($data) {
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
            
            return Categoria::create($data);
        });
    }

    public function actualizar(Categoria $categoria, array $data): Categoria
    {
        return DB::transaction(function () use ($categoria, $data) {
            $data['updated_by'] = Auth::id();
            $categoria->update($data);
            
            return $categoria->fresh();
        });
    }

    public function eliminar(Categoria $categoria): void
    {
        DB::transaction(function () use ($categoria) {
            $categoria->deleted_by = Auth::id();
            $categoria->save();
            $categoria->delete();
        });
    }

    public function restaurar(string $id): Categoria
    {
        return DB::transaction(function () use ($id) {
            $categoria = Categoria::withTrashed()->findOrFail($id);
            $categoria->deleted_by = null;
            $categoria->restore();
            
            return $categoria;
        });
    }
}