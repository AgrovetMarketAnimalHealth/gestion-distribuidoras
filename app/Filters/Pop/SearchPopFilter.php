<?php

namespace App\Filters\Pop;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class SearchPopFilter
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