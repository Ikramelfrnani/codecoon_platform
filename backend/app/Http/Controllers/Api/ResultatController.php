<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resultat;

class ResultatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Resultat::with('quiz')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:apprenants,id',
            'quiz_id' => 'required|exists:quiz,id',
            'score' => 'required|integer|min:0|max:100',
        ]);

        $existing = Resultat::where('utilisateur_id', $validated['utilisateur_id'])
                            ->where('quiz_id', $validated['quiz_id'])
                            ->first();

        if ($existing) {
            return response()->json(['message' => 'Result already exists'], 409);
        }

        $resultat = Resultat::create($validated);
        return response()->json($resultat, 201);
    }


    public function getScore($utilisateur_id, $quiz_id)
    {
        $resultat = Resultat::where('utilisateur_id', $utilisateur_id)
                            ->where('quiz_id', $quiz_id)
                            ->first();

        if (!$resultat) {
            return response()->json([
                'message' => 'Result not found for this user and quiz.',
                'score' => null,
            ], 404);
        }

        return response()->json([
            'message' => 'Score retrieved successfully.',
            'score' => $resultat->score,
        ]);
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
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'score' => 'required|integer|min:0|max:100',
        ]);

        $resultat = Resultat::find($id);

        if (!$resultat) {
            return response()->json(['message' => 'Result not found'], 404);
        }

        $resultat->update(['score' => $validated['score']]);

        return response()->json([
            'message' => 'Score updated successfully!',
            'data' => $resultat,
        ]);
    }


    public function updateByUserAndQuiz(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:apprenants,id',
            'quiz_id' => 'required|exists:quiz,id',
            'score' => 'required|integer|min:0|max:100',
        ]);

        $resultat = Resultat::where('utilisateur_id', $validated['utilisateur_id'])
                            ->where('quiz_id', $validated['quiz_id'])
                            ->first();

        if (!$resultat) {
            return response()->json([
                'message' => 'Result not found for this user and quiz.',
            ], 404);
        }

        $resultat->update(['score' => $validated['score']]);

        return response()->json([
            'message' => 'Score updated successfully!',
            'data' => $resultat,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getByUtilisateurIdWithQuiz(Request $request)
    {
        $query = Resultat::query();

        if ($request->has('utilisateur_id')) {
            $query->where('utilisateur_id', $request->utilisateur_id);
        }

        return $query->with('quiz')->get(); // Includes quiz with chapitre_id
    }

}
