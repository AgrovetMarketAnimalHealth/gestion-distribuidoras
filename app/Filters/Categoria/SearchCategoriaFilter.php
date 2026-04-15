<?php

namespace App\Filters\Categoria;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class SearchCategoriaFilter
{
    public function __construct(private readonly ?string $search) {}

    public function handle(Builder $query, Closure $next)
    {
        if ($this->search) {
            $query->where(function($q) {
                $q->where('id', 'LIKE', "%{$this->search}%")
                  ->orWhere('nombre', 'LIKE', "%{$this->search}%");
            });
        }

        return $next($query);
    }
}