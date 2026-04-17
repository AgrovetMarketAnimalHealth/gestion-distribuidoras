<?php

namespace App\Filters\Pop;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class UserIdPopFilter
{
    public function __construct(private readonly ?string $userId) {}

    public function handle(Builder $query, Closure $next)
    {
        if ($this->userId) {
            $query->where('user_id', $this->userId);
        }

        return $next($query);
    }
}