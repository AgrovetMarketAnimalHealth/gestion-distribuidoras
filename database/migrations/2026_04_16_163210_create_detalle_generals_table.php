<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detalle_generals', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('zona_id');
            $table->uuid('veterinaria_id');
            $table->uuid('ejecutivo_id');
            $table->uuid('distribuidora_id');
            $table->string('representante_venta');
            $table->date('fecha');
            $table->boolean('realizo_pedido')->default(false);
            $table->text('observacion')->nullable();
            $table->string('foto_exito')->nullable();
            $table->string('foto_marca')->nullable();
            $table->uuid('user_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('zona_id')->references('id')->on('zonas')->restrictOnDelete();
            $table->foreign('veterinaria_id')->references('id')->on('veterinarias')->restrictOnDelete();
            $table->foreign('ejecutivo_id')->references('id')->on('users')->restrictOnDelete();
            $table->foreign('distribuidora_id')->references('id')->on('distribuidoras')->restrictOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_generals');
    }
};
