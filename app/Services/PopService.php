<?php

namespace App\Services;

use App\Models\Pop;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PopService
{
    public function crear(array $data): Pop
    {
        return DB::transaction(function () use ($data) {
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
            
            return Pop::create($data);
        });
    }

    public function actualizar(Pop $pop, array $data): Pop
    {
        return DB::transaction(function () use ($pop, $data) {
            $data['updated_by'] = Auth::id();
            $pop->update($data);
            
            return $pop->fresh();
        });
    }

    public function eliminar(Pop $pop): void
    {
        DB::transaction(function () use ($pop) {
            $pop->deleted_by = Auth::id();
            $pop->save();
            $pop->delete();
        });
    }

    public function restaurar(string $id): Pop
    {
        return DB::transaction(function () use ($id) {
            $pop = Pop::withTrashed()->findOrFail($id);
            $pop->deleted_by = null;
            $pop->updated_by = Auth::id();
            $pop->save();
            $pop->restore();
            
            return $pop;
        });
    }
}