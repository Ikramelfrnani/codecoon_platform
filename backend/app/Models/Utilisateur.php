<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;
    protected $table = 'apprenants';
    protected $fillable = [
        'objectif',
        'niveau',
        'objectif_quotidien',
        'date_derniere_connexion',
        'points_energie',
        'statut',
        'langue_choisi',
        'langage_id_actuel',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'utilisateur_id');
    }

    public function quiz()
    {
        return $this->belongsToMany(Quiz::class, 'resultats', 'utilisateur_id', 'quiz_id')->withPivot('score');
    }
    public function langageActuel()
    {
        return $this->belongsTo(Langage::class, 'langage_id_actuel');
    }
    public function langueChoisi()
    {
        return $this->belongsTo(Langage::class, 'langue_choisi');
    }
    public function progressions()
    {
        return $this->hasMany(Progression::class, 'user_id');
    }
    public function utilisateurReponses()
    {
        return $this->hasMany(UtilisateurReponse::class, 'utilisateur_id');
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, 'apprenant_badge')
            ->withPivot('id') // 👈 required for $badge->pivot->id
            ->withTimestamps(); // 👈 gives access to created_at
    }



}
