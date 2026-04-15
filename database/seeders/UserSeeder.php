<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'administrador')->first();
        $personalRole = Role::where('name', 'personal')->first();
        $permissions = Permission::all();

        if ($adminRole) {
            $adminRole->syncPermissions($permissions);
        }

        $admin_1 = User::create([
            'name'             => 'Jefferson',
            'email'            => 'jeferson.covenas@agrovetmarket.com',
            'password'         => Hash::make('12345678'),
        ]);

        $admin_1->assignRole($adminRole);

        // ✅ CORREGIDO: Eliminado el 'id' de la inserción
        $users = [$admin_1];

        foreach ($users as $user) {
            $plainToken = \Illuminate\Support\Str::random(64);

            DB::table('password_reset_tokens')->insert([
                'email'      => $user->email,      // Solo email, token y created_at
                'token'      => Hash::make($plainToken),
                'created_at' => now(),
            ]);

            $this->command->info("Token para {$user->email}: {$plainToken}");
        }
    }
}