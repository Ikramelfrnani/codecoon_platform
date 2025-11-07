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
    Schema::create('langages', function (Blueprint $table) {
        $table->id();
        $table->string('nom_langage')->unique();
        $table->text('description_langage');
        $table->integer('nombre_utilisateurs_termines')->default(0);
        $table->integer('nombre_utilisateurs_commences')->default(0);
        $table->string('lien_editeur');
        $table->string('niveau')->nullable();
        $table->string('image_badge')->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('langages');
    }
};
