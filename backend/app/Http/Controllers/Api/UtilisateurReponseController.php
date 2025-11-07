<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UtilisateurReponse;

class UtilisateurReponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UtilisateurReponse::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function storeOrUpdate(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:apprenants,id',
            'question_id' => 'required|exists:questions,id',
            'reponse' => 'required|string',
            'estcorrect' => 'required|boolean',
        ]);

        // Update if exists or create new
        $utilisateurReponse = UtilisateurReponse::updateOrCreate(
            [
                'utilisateur_id' => $request->utilisateur_id,
                'question_id' => $request->question_id,
            ],
            [
                'reponse' => $request->reponse,
                'estcorrect' => $request->estcorrect,
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $utilisateurReponse,
            'message' => 'User response saved successfully.'
        ]);
    }


    public function getResponsesByQuiz($quizId, $utilisateurId)
    {
        $responses = UtilisateurReponse::with(['question'])
            ->whereHas('question', function ($query) use ($quizId) {
                $query->where('quiz_id', $quizId);
            })
            ->where('utilisateur_id', $utilisateurId)
            ->get();

        return response()->json($responses);
    }


}

