<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

#[Fillable(['nombre', 'departamento', 'provincia', 'distrito', 'caserio', 'direccion', 'estado', 'user_id'])]
class Veterinaria extends Model implements AuditableContract
{
    use Auditable, HasUuids, SoftDeletes;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function detalles()
    {
        return $this->hasMany(DetalleGeneral::class);
    }
}
