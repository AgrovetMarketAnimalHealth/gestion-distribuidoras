<?php

namespace App\Http\Requests\Distribuidora;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDistribuidoraRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('distribuidoras')->ignore($this->route('distribuidora'))
            ],
            'estado' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
        ];
    }
}