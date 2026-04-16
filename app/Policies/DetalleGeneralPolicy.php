<?php

namespace App\Policies;

use App\Models\DetalleGeneral;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DetalleGeneralPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('ver detalles generales');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, DetalleGeneral $detalleGeneral): bool
    {
        return $user->can('ver detalles generales');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('crear detalles generales');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, DetalleGeneral $detalleGeneral): bool
    {
        return $user->can('editar detalles generales');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, DetalleGeneral $detalleGeneral): bool
    {
        return $user->can('eliminar detalles generales');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, DetalleGeneral $detalleGeneral): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, DetalleGeneral $detalleGeneral): bool
    {
        return false;
    }
}
