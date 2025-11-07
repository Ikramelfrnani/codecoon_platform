<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapitre extends Model
{   
    protected $fillable = [
        'titre_chapitre',
        'description_chapitre',
        'langage_id',
        'parent_id',
    ];
    public function cours()
    {
        return $this->hasMany(Cours::class);
    }

    public function sousChapitres()
    {
        return $this->hasMany(Chapitre::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Chapitre::class, 'parent_id');
    }
    public function langage()
    {
        return $this->belongsTo(Langage::class);
    }
    public function quiz()
    {
        return $this->hasOne(Quiz::class, 'chapitre_id');
    }

    public function progressions()
    {
        return $this->hasMany(Progression::class);
    }
}
