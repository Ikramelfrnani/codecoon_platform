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
        Schema::create('utilisateur_reponses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('utilisateur_id')->constrained('apprenants')->onDelete('cascade');
            $table->unsignedBigInteger('question_id');
            $table->text('reponse');
            $table->boolean('estcorrect');
            $table->timestamps();
            
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            $table->unique(['utilisateur_id', 'question_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateur_reponses');
    }
};
