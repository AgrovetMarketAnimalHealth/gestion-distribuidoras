<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categorias', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nombre')->unique();
            $table->boolean('estado');
            
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->uuid('deleted_by')->nullable();
            
            $table->softDeletes();
            $table->timestamps();
            
            // Llaves foráneas
            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
                
            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
                
            $table->foreign('deleted_by')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
};