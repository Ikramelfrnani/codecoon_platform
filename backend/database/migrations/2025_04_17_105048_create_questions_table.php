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
        Schema::create('questions', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('quiz_id');
        $table->integer('ordre');
        $table->text('texte');
        $table->enum('question_type', ['practice', 'select_choice']);
        
        $table->text('initial_code')->nullable();
        $table->text('expected_output')->nullable();
        $table->string('code_language')->nullable();

        $table->timestamps();

        $table->foreign('quiz_id')->references('id')->on('quiz')->onDelete('cascade');
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
