<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtilisateurReponse extends Model
{
    use HasFactory;

    protected $table = 'utilisateur_reponses';

    protected $fillable = [
        'utilisateur_id',
        'question_id',
        'reponse',
        'estcorrect',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
