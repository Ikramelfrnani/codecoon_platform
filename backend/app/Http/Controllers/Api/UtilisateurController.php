<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Utilisateur;
use App\Models\User;
use App\Models\Langage;
use App\Models\Chapitre;
use App\Models\Cours;
class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Utilisateur::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Utilisateur::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur not found'], 404);
        }

        return response()->json($user);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Utilisateur $utilisateur)
    {
        $validated = $request->validate([
            'objectif' => 'sometimes|required|string',
            'niveau' => 'sometimes|required|string',
            'objectif_quotidien' => 'sometimes|required|string',
            'date_derniere_connexion' => 'nullable|date',
            'points_energie' => 'sometimes|required|integer',
            'statut' => 'sometimes|required|string',
            'langue_choisi' => 'sometimes|required|string',
        ]);

        $utilisateur->update($validated);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
public function getPreferredLanguage($userId)
{
    $user = User::with('utilisateur')->find($userId);

    if (!$user || !$user->utilisateur) {
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }

    $utilisateur = $user->utilisateur;

    $langage = Langage::where('nom_langage', $utilisateur->langue_choisi)->first();

    if (!$langage) {
        return response()->json(['error' => 'Langage non trouvé'], 404);
    }

    return response()->json([
        'langage_id' => $langage->id,
        'nom_langage' => $langage->nom_langage,
    ]);
}

// public function getEmptyFields($id)
// {
//     $utilisateur = Utilisateur::find($id);

//     if (!$utilisateur) {
//         return response()->json(['message' => 'Utilisateur not found'], 404);
//     }

//     $fieldsToCheck = [
//         'objectif',
//         'statut',
//         'niveau',
//         'langue_choisi',
//         'objectif_quotidien',
//         'date_derniere_connexion',
//         'points_energie',
//         'langage_id_actuel',
//     ];

//     $emptyFields = [];

//     foreach ($fieldsToCheck as $field) {
//         if (is_null($utilisateur->$field) || $utilisateur->$field === '') {
//             $emptyFields[] = $field;
//         }
//     }

//     return response()->json([
//         'empty_fields' => $emptyFields,
//     ]);
// }
public function getEmptyFields($id)
{
    $utilisateur = Utilisateur::find($id);

    if (!$utilisateur) {
        return response()->json(['message' => 'Utilisateur not found'], 404);
    }

    $fieldsToCheck = [
        'objectif',
        'statut',
        'niveau',
        'langue_choisi',
        'objectif_quotidien',
    ];

    foreach ($fieldsToCheck as $field) {
        if (is_null($utilisateur->$field) || $utilisateur->$field === '') {
            return response()->json([
                'empty_field' => $field,
            ]);
        }
    }

    // If no empty fields
    return response()->json([
        'empty_field' => null,
        'message' => 'All fields are filled.',
    ]);
}



}
