<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('resultats', function (Blueprint $table) {
        $table->id();
        $table->foreignId('utilisateur_id')->constrained('utilisateurs')->onDelete('cascade');
        $table->foreignId('quiz_id')->constrained('quiz')->onDelete('cascade');
        $table->integer('score');
        $table->timestamps();
        $table->unique(['utilisateur_id', 'quiz_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resultats');
    }
};
