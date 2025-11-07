<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $table = 'quiz';

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    // public function chapitres()
    // {
    //     return $this->hasMany(Chapitre::class);
    // }

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'resultats', 'quiz_id', 'utilisateur_id')->withPivot('score');
    }
    public function langage()
    {
        return $this->belongsTo(Langage::class);
    }
    public function chapitre()
    {
        return $this->belongsTo(Chapitre::class);
    }
}
