<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApprenantBadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $utilisateurs = \App\Models\Utilisateur::with('badges')->get();

        $result = [];

        foreach ($utilisateurs as $utilisateur) {
            foreach ($utilisateur->badges as $badge) {
                $result[] = [
                    'id' => $badge->pivot->id,
                    'utilisateur_id' => $utilisateur->id,
                    'badge_id' => $badge->id,
                    'badge_nom' => $badge->nom,
                    'created_at' => $badge->pivot->created_at,
                ];
            }
        }

        return response()->json($result);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:apprenants,id',
            'badge_id' => 'required|exists:badges,id',
        ]);

        $utilisateur = \App\Models\Utilisateur::findOrFail($request->utilisateur_id);

        // Prevent duplicate entry
        if ($utilisateur->badges()->where('badge_id', $request->badge_id)->exists()) {
            return response()->json([
                'message' => 'Badge already assigned to this utilisateur.',
            ], 409); // 409 Conflict
        }

        // Attach badge with timestamps
        $utilisateur->badges()->attach($request->badge_id);

        // Get the newly created pivot record
        $pivot = $utilisateur->badges()->where('badge_id', $request->badge_id)->first()->pivot;

        return response()->json([
            'id' => $pivot->id,
            'utilisateur_id' => $utilisateur->id,
            'badge_id' => $request->badge_id,
            'created_at' => $pivot->created_at,
        ], 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

   public function badgesByUtilisateur($utilisateurId)
    {
        $utilisateur = \App\Models\Utilisateur::with('badges')->findOrFail($utilisateurId);

        $result = [];

        foreach ($utilisateur->badges as $badge) {
            $result[] = [
                'pivot_id' => $badge->pivot->id,
                'utilisateur_id' => $utilisateur->id,
                'badge_id' => $badge->id,
                'badge_nom' => $badge->nom,
                'badge_description' => $badge->description,
                'badge_image' => $badge->image ? url("/api/badge/image/{$badge->image}") : null,
                'badge_gif' => $badge->gif ? url("/api/badge/image/{$badge->gif}") : null,
                'langage_id' => $badge->langage_id,
                'created_at' => $badge->pivot->created_at,
            ];
        }

        return response()->json($result);
    }
    
    public function countBadgesByUtilisateur($utilisateurId)
    {
        $utilisateur = \App\Models\Utilisateur::withCount('badges')->findOrFail($utilisateurId);

        return response()->json([
            'utilisateur_id' => $utilisateur->id,
            'badges_count' => $utilisateur->badges_count,
        ]);
    }


}
