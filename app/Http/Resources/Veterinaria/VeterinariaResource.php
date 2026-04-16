<?php

namespace App\Http\Resources\Veterinaria;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class VeterinariaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'departamento' => $this->departamento,
            'provincia' => $this->provincia,
            'distrito' => $this->distrito,
            'caserio' => $this->caserio,
            'direccion' => $this->direccion,
            'estado' => $this->estado,
            'fecha_creacion' => Carbon::parse($this->created_at)->format('d-m-Y h:i:s A'),
            'fecha_actualizacion' => Carbon::parse($this->updated_at)->format('d-m-Y h:i:s A'),
        ];
    }
}