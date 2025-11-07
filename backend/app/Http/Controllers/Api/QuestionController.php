<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Question::all();
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
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' => 'question not found'], 404);
        }

        return response()->json($question);
    }

    //function for mini quiz only
    public function getByQuizId($quizId)
    {
        $question = Question::where('quiz_id', $quizId)->first();

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        return response()->json($question);
    }
    public function getByQuizzesId($quizId)
    {
        $questions = Question::where('quiz_id', $quizId)
            ->orderBy('ordre', 'asc')
            ->get();
        if ($questions->isEmpty()) {
            return response()->json(['message' => 'Questions not found'], 404);
        }

        return response()->json($questions);
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
}
