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
    Schema::create('chapitres', function (Blueprint $table) {
        $table->id();
        $table->string('titre_chapitre');
        $table->text('description_chapitre');
        $table->foreignId('langage_id')->constrained('langages')->onDelete('cascade');
        $table->foreignId('parent_id')->nullable()->constrained('chapitres')->onDelete('cascade'); // Relation réflexive
        $table->timestamps();

        $table->index('parent_id');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapitres');
    }
};
