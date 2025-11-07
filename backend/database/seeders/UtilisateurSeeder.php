<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Utilisateur;

class UtilisateurSeeder extends Seeder
{
    public function run()
    {
        Utilisateur::create([
            'objectif' => 'Apprendre Laravel',
            'niveau' => 'Débutant',
            'objectif_quotidien' => '30 min',
            'date_derniere_connexion' => now(),
            'points_energie' => 100,
            'statut' => 'actif',
            'langue_choisi' => 'sql',
            'langage_id_actuel' => 1, 
        ]);
    }
}
