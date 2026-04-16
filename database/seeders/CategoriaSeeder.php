<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $userId = '019d9803-5a36-70e2-a638-d4a6faa57789';

        $data = [];

        for ($i = 1; $i <= 8000; $i++) {
            $data[] = [
                'id' => (string) Str::uuid(),
                'nombre' => 'Categoria ' . $i,
                'estado' => rand(0, 1), // o true/false si usas boolean
                'created_by' => $userId,
                'updated_by' => $userId,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Insertar en chunks para no reventar memoria
            if (count($data) === 1000) {
                Categoria::insert($data);
                $data = [];
            }
        }

        // Insertar lo que quede
        if (!empty($data)) {
            Categoria::insert($data);
        }
    }
}