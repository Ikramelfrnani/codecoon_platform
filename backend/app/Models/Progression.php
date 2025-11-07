<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Progression extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'chapitre_id', 'valeur'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function chapitre() {
        return $this->belongsTo(Chapitre::class);
    }
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id');
    }
}
