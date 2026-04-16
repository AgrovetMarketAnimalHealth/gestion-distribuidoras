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
        Schema::create('detalle_general_productos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('detalle_general_id');
            $table->uuid('producto_id');
            $table->uuid('pop_id')->nullable();
            $table->unsignedInteger('cantidad');
            $table->decimal('monto', 10, 2);
            $table->timestamps();

            $table->foreign('detalle_general_id')->references('id')->on('detalle_generals')->cascadeOnDelete();
            $table->foreign('producto_id')->references('id')->on('productos')->restrictOnDelete();
            $table->foreign('pop_id')->references('id')->on('pops')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_general_productos');
    }
};
