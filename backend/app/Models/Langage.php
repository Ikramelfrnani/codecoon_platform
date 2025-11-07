<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Langage extends Model
{
    protected $fillable = [
        'nom_langage',
        'description_langage',
        'nombre_utilisateurs_termines',
        'nombre_utilisateurs_commences',
        'lien_editeur',
        'niveau',
        'image_badge',
    ];
    public function chapitres()
    {
        return $this->hasMany(Chapitre::class,'langage_id');
    }
    public function quiz()
    {
        return $this->hasOne(Quiz::class, 'langage_id');
    }

    public function badge()
    {
        return $this->hasOne(Badge::class);
    }

}
