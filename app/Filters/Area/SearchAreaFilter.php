<?php

namespace App\Filters\Area;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class SearchAreaFilter
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