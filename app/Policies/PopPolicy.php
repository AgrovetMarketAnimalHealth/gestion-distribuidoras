<?php

namespace App\Policies;

use App\Models\Pop;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PopPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('ver pops');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Pop $pop): bool
    {
        return $user->can('ver pops');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('crear pops');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Pop $pop): bool
    {
        return $user->can('editar pops');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Pop $pop): bool
    {
        return $user->can('eliminar pops');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pop $pop): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pop $pop): bool
    {
        return false;
    }
}
