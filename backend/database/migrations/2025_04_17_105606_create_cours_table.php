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
    Schema::create('cours', function (Blueprint $table) {
        $table->id();
        $table->string('type_contenu');
        $table->integer('ordre_contenu');
        $table->text('texte');
        $table->string('chemin');
        $table->foreignId('chapitre_id')->constrained('chapitres')->onDelete('cascade');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
