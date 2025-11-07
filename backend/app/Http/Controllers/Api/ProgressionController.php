<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Progression;
use App\Models\Langage;
use Illuminate\Http\Request;

class ProgressionController extends Controller
{
    // Récupérer toutes les progressions d'un utilisateur
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        if (!$userId) {
            return response()->json(['error' => 'user_id requis'], 400);
        }
        $progressions = Progression::where('user_id', $userId)->get();
        return response()->json($progressions);
    }

    // Créer ou mettre à jour une progression
    public function updateOrCreate(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'chapitre_id' => 'required|exists:chapitres,id',
        'valeur' => 'required|integer|min:0',
    ]);

    $progression = Progression::updateOrCreate(
        [
            'user_id' => $request->user_id,
            'chapitre_id' => $request->chapitre_id,
        ],
        ['valeur' => $request->valeur]
    );

    return response()->json($progression);
}


    // Récupérer progression par langage pour un utilisateur
    public function progressionParLangage($userId)
{
    $langages = \App\Models\Langage::with('chapitres')->get();
    $progressions = [];

    foreach ($langages as $langage) {
        $parents = $langage->chapitres->where('parent_id', null);
        $subChaptersByParent = $langage->chapitres->where('parent_id', '!=', null)->groupBy('parent_id');

        $total = 0;
        $completed = 0;

        foreach ($parents as $parent) {
            $subChaps = $subChaptersByParent[$parent->id] ?? collect();
            $total += $subChaps->count();

            $progress = Progression::where('user_id', $userId)
                ->where('chapitre_id', $parent->id)
                ->value('valeur');

            $completed += $progress ?? 0;
        }

        $percentage = $total > 0 ? round(($completed / $total) * 100, 2) : 0;
        $progressions[$langage->id] = $percentage;
    }

    return response()->json($progressions);
}

}
