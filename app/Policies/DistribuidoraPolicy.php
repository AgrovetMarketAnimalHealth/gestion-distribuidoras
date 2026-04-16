<?php

namespace App\Policies;

use App\Models\Distribuidora;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DistribuidoraPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('ver distribuidoras');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Distribuidora $distribuidora): bool
    {
        return $user->can('ver distribuidoras');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('crear distribuidoras');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Distribuidora $distribuidora): bool
    {
        return $user->can('editar distribuidoras');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Distribuidora $distribuidora): bool
    {
        return $user->can('eliminar distribuidoras');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Distribuidora $distribuidora): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Distribuidora $distribuidora): bool
    {
        return false;
    }
}
