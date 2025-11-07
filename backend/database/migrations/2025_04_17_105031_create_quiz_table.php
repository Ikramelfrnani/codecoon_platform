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
        Schema::create('quiz', function (Blueprint $table) {
            $table->id();

            // Foreign key to langages table
            $table->unsignedBigInteger('langage_id');
            $table->foreign('langage_id')->references('id')->on('langages')->onDelete('cascade');

            // Nullable foreign key to chapitres table
            $table->unsignedBigInteger('chapitre_id')->nullable();
            $table->foreign('chapitre_id')->references('id')->on('chapitres')->onDelete('set null');

            // Enum for type
            $table->enum('type', ['mini', 'global']);

            $table->text('titre');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quiz');
    }
};
