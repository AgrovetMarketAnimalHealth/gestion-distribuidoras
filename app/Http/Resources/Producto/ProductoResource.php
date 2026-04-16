<?php

namespace App\Http\Resources\Producto;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'estado' => $this->estado,
            'fecha_creacion' => Carbon::parse($this->created_at)->format('d-m-Y h:i:s A'),
            'fecha_actualizacion' => Carbon::parse($this->updated_at)->format('d-m-Y h:i:s A'),
        ];
    }
}