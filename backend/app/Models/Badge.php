<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'image',
        'gif',
        'langage_id',
    ];

    /**
     * Get the langage that this badge belongs to.
     */
    public function langage()
    {
        return $this->belongsTo(Langage::class);
    }

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'apprenant_badge')
                    ->withPivot('id')
                    ->withTimestamps();
    }

}
