<?php

namespace App\Http\Requests\Distribuidora;

use Illuminate\Foundation\Http\FormRequest;

class StoreDistribuidoraRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255|unique:distribuidoras,nombre',
            'estado' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
        ];
    }
}