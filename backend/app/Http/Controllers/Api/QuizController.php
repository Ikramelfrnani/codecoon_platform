<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Quiz::all();
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
    public function show($id)
    {
        $quiz = Quiz::find($id);

        if (!$quiz) {
            return response()->json(['message' => 'quiz not found'], 404);
        }

        return response()->json($quiz);
    }
    public function getMiniQuizByChapitreId($chapitreId)
    {
        $quiz = Quiz::where('chapitre_id', $chapitreId)->first();

        if (!$quiz) {
            return response()->json(['message' => 'Mini quiz not found'], 404);
        }

        return response()->json($quiz);
    }
    public function getQuizzesByLangageId($langageId)
    {
        $quiz = Quiz::with('langage')
            ->where('langage_id', $langageId)
            ->whereNull('chapitre_id')
            ->where('type', 'global')
            ->first();

        if (!$quiz) {
            return response()->json(['message' => 'No global quiz found for this langage ID'], 404);
        }

        return response()->json([
            'quiz' => $quiz,
            'nom_langage' => $quiz->langage->nom_langage,
        ]);
    }






    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
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
}
