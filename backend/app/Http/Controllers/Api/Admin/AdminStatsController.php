<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Langage;
use App\Models\Progression;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminStatsController extends Controller
{
    // Stats générales (GET /api/admin/stats)
    public function stats(Request $request)
    {
        $totalApprenants = DB::table('apprenants')
            ->join('users', 'apprenants.id', '=', 'users.utilisateur_id')
            ->where('users.role', '<>', 'admin')  // exclure les admins
            ->count();

        // Apprenants actifs par mois
        $apprenantsActifsParMois = DB::table('apprenants')
            ->join('users', 'apprenants.id', '=', 'users.utilisateur_id')
            ->selectRaw('DATE_FORMAT(apprenants.created_at, "%Y-%m") as mois, COUNT(*) as count')
            ->where('users.role', '<>', 'admin')
            ->groupBy('mois')
            ->orderBy('mois')
            ->get();

        // Répartition langages choisis
        $repartitionLangages = DB::table('apprenants')
            ->join('users', 'apprenants.id', '=', 'users.utilisateur_id')
            ->select('apprenants.langue_choisi as lang', DB::raw('COUNT(*) as count'))
            ->whereNotNull('apprenants.langue_choisi')
            ->where('apprenants.langue_choisi', '<>', '')
            ->where('users.role', '<>', 'admin')
            ->groupBy('apprenants.langue_choisi')
            ->orderByDesc('count')
            ->get();

        // Progression moyenne par langage
        $progressionMoyenneLangages = DB::table('progressions')
            ->join('chapitres', 'progressions.chapitre_id', '=', 'chapitres.id')
            ->join('langages', 'chapitres.langage_id', '=', 'langages.id')
            ->select('langages.nom_langage as lang', DB::raw('AVG(progressions.valeur) as progression_moyenne'))
            ->groupBy('langages.nom_langage')
            ->orderByDesc('progression_moyenne')
            ->get();

        return response()->json([
            'totalApprenants' => $totalApprenants,
            'apprenantsActifsParMois' => $apprenantsActifsParMois,
            'repartitionLangages' => $repartitionLangages,
            'progressionMoyenneLangages' => $progressionMoyenneLangages,
        ]);
    }

    // Met à jour et retourne le nombre d'utilisateurs ayant terminé chaque langage (POST /api/admin/update-nombre-utilisateurs-termines)
    public function updateNombreUtilisateursTermines(Request $request)
    {
        $langages = Langage::with('chapitres')->get();

        $terminesCount = [];

        foreach ($langages as $langage) {
            $terminesCount[$langage->id] = 0;
        }

        // Récupérer tous les utilisateurs normaux (non-admin)
        $users = User::where('role', '<>', 'admin')->get();

        foreach ($users as $user) {
            foreach ($langages as $langage) {
                // Chapitres parents (top niveau) du langage
                $parents = $langage->chapitres->where('parent_id', null);

                // Sous-chapitres groupés par parent_id
                $subChaptersByParent = $langage->chapitres->where('parent_id', '!=', null)->groupBy('parent_id');

                $total = 0;
                $completed = 0;

                foreach ($parents as $parent) {
                    $subChaps = $subChaptersByParent[$parent->id] ?? collect();
                    $total += $subChaps->count();

                    // Récupérer la progression de l'utilisateur sur ce chapitre parent
                    $progress = Progression::where('user_id', $user->id)
                        ->where('chapitre_id', $parent->id)
                        ->value('valeur');

                    $completed += $progress ?? 0;
                }

                $percentage = $total > 0 ? round(($completed / $total) * 100, 2) : 0;

                if ($percentage == 100) {
                    $terminesCount[$langage->id]++;
                }
            }
        }

        // Mise à jour dans la table langages
        foreach ($terminesCount as $langageId => $count) {
            Langage::where('id', $langageId)->update(['nombre_utilisateurs_termines' => $count]);
        }

        // Préparer les données pour la réponse front (avec nom du langage)
        $data = [];
        foreach ($langages as $langage) {
            $data[] = [
                'lang' => $langage->nom_langage,
                'count' => $terminesCount[$langage->id] ?? 0,
            ];
        }

        return response()->json([
            'message' => 'Nombre utilisateurs terminés mis à jour avec succès.',
            'data' => $data,
        ]);
    }
    public function getNombreUtilisateursTermines()
{
    $data = Langage::select('nom_langage as lang', 'nombre_utilisateurs_termines as count')->get();

    return response()->json([
        'data' => $data
    ]);
}

}
