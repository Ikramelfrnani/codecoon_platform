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
    Schema::create('utilisateurs', function (Blueprint $table) {
        $table->id();
        $table->string('objectif');
        $table->string('statut');
        $table->string('niveau');
        $table->string('langue_choisi')->nullable();
        $table->string('objectif_quotidien');
        $table->date('date_derniere_connexion')->nullable();
        $table->integer('points_energie');
        $table->unsignedBigInteger('langage_id_actuel')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
