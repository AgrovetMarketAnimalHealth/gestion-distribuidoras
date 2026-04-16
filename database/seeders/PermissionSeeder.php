<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        #Pops
        Permission::create(['name' => 'ver pops']);
        Permission::create(['name' => 'crear pops']);
        Permission::create(['name' => 'editar pops']);
        Permission::create(['name' => 'eliminar pops']);
        
        #zonas
        Permission::create(['name' => 'ver zonas']);
        Permission::create(['name' => 'crear zonas']);
        Permission::create(['name' => 'editar zonas']);
        Permission::create(['name' => 'eliminar zonas']);

        #distribuidoras
        Permission::create(['name' => 'ver distribuidoras']);
        Permission::create(['name' => 'crear distribuidoras']);
        Permission::create(['name' => 'editar distribuidoras']);
        Permission::create(['name' => 'eliminar distribuidoras']);

        #Productos
        Permission::create(['name' => 'ver productos']);
        Permission::create(['name' => 'crear productos']);
        Permission::create(['name' => 'editar productos']);
        Permission::create(['name' => 'eliminar productos']);

        #veterinarias
        Permission::create(['name' => 'ver veterinarias']);
        Permission::create(['name' => 'crear veterinarias']);
        Permission::create(['name' => 'editar veterinarias']);
        Permission::create(['name' => 'eliminar veterinarias']);

        #Detalles generales
        Permission::create(['name' => 'ver detalles generales']);
        Permission::create(['name' => 'crear detalles generales']);
        Permission::create(['name' => 'editar detalles generales']);
        Permission::create(['name' => 'eliminar detalles generales']);

        #Detalles generales productos
        Permission::create(['name' => 'ver detalles generales de productos']);
        Permission::create(['name' => 'crear detalles generales de productos']);
        Permission::create(['name' => 'editar detalles generales de productos']);
        Permission::create(['name' => 'eliminar detalles generales de productos']);

        #Categoria
        Permission::create(['name' => 'ver categorias']);
        Permission::create(['name' => 'crear categorias']);
        Permission::create(['name' => 'editar categorias']);
        Permission::create(['name' => 'eliminar categorias']);

        #Usuarios
        Permission::create(['name' => 'ver usuarios']);
        Permission::create(['name' => 'crear usuarios']);
        Permission::create(['name' => 'editar usuarios']);
        Permission::create(['name' => 'eliminar usuarios']);

        #Roles
        Permission::create(['name' => 'ver roles']);
        Permission::create(['name' => 'crear roles']);
        Permission::create(['name' => 'editar roles']);
        Permission::create(['name' => 'eliminar roles']);

        #Permisos
        Permission::create(['name' => 'ver permisos']);
        Permission::create(['name' => 'crear permisos']);
        Permission::create(['name' => 'editar permisos']);
        Permission::create(['name' => 'eliminar permisos']);
    }
}