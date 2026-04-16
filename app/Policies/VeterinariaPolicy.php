<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Veterinaria;
use Illuminate\Auth\Access\Response;

class VeterinariaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('ver veterinarias');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Veterinaria $veterinaria): bool
    {
        return $user->can('ver veterinarias');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('crear veterinarias');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Veterinaria $veterinaria): bool
    {
        return $user->can('editar veterinarias');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Veterinaria $veterinaria): bool
    {
        return $user->can('eliminar veterinarias');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Veterinaria $veterinaria): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Veterinaria $veterinaria): bool
    {
        return false;
    }
}
