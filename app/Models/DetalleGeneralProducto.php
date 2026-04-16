<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

#[Fillable(['detalle_general_id', 'producto_id', 'pop_id', 'cantidad', 'monto'])]
class DetalleGeneralProducto extends Model implements AuditableContract
{
    use Auditable, HasUuids;

    protected $casts = [
        'monto'    => 'decimal:2',
        'cantidad' => 'integer',
    ];

    public function detalleGeneral() { return $this->belongsTo(DetalleGeneral::class); }
    public function producto()       { return $this->belongsTo(Producto::class); }
    public function pop()            { return $this->belongsTo(Pop::class); }
}