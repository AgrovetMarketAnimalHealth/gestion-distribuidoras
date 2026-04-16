<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

#[Fillable(['nombre', 'estado','created_by','updated_by','deleted_by'])]
class Categoria extends Model implements AuditableContract{
    use Auditable, HasUuids, SoftDeletes;
    public function creador(){
        return $this->belongsTo(User::class, 'created_by');
    }
    public function actualizador(){
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function eliminador(){
        return $this->belongsTo(User::class, 'deleted_by');
    }
    public function user(){
        return $this->belongsTo(User::class, 'created_by');
    }
    protected static function booted(){
        static::creating(function ($categoria) {
            if (auth()->check()) {
                $categoria->created_by = auth()->id();
                $categoria->updated_by = auth()->id();
            }
        });

        static::updating(function ($categoria) {
            if (auth()->check()) {
                $categoria->updated_by = auth()->id();
            }
        });
    }
}