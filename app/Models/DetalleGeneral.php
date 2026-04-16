<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

#[Fillable([
    'zona_id', 'veterinaria_id', 'ejecutivo_id', 'distribuidora_id',
    'representante_venta', 'fecha', 'realizo_pedido',
    'observacion', 'foto_exito', 'foto_marca', 'user_id',
])]
class DetalleGeneral extends Model implements AuditableContract
{
    use Auditable, HasUuids, SoftDeletes;

    protected $casts = [
        'fecha'          => 'date',
        'realizo_pedido' => 'boolean',
    ];

    public function zona()        { return $this->belongsTo(Zona::class); }
    public function veterinaria() { return $this->belongsTo(Veterinaria::class); }
    public function distribuidora() { return $this->belongsTo(Distribuidora::class); }
    public function ejecutivo()   { return $this->belongsTo(User::class, 'ejecutivo_id'); }
    public function user()        { return $this->belongsTo(User::class); }
    public function productos()   { return $this->hasMany(DetalleGeneralProducto::class); }
}
