<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    public function chapitre()
    {
        return $this->belongsTo(Chapitre::class , 'chapitre_id');
    }
}
