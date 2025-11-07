<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UtilisateurController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\LangageController;
use App\Http\Controllers\ChapitreController;
use App\Http\Controllers\CoursController;
use App\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\Api\ProgressionController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ResultatController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\ReponseController;
use App\Http\Controllers\Api\UtilisateurReponseController;
use App\Http\Controllers\Api\ApprenantBadgeController;
use App\Http\Controllers\Api\BadgeImageController;
use App\Http\Controllers\Api\BadgeController;
use App\Http\Controllers\Api\Admin\AdminStatsController;
use Illuminate\Support\Facades\Log;
use App\Models\Utilisateur;
use App\Models\User;
use App\Models\Langage;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum'
])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum',])->post('/logout', [AuthController::class, 'logout']);

Route::get('/utilisateurs/{id}/empty-fields', [UtilisateurController::class, 'getEmptyFields']);
Route::apiResource('utilisateurs', UtilisateurController::class);
Route::apiResource('users', UserController::class);
Route::put('/users/{id}/change-password', [UserController::class, 'changePassword']);

Route::get('/langages', [LangageController::class, 'index']);
Route::get('/chapitres/langage/{id}', [ChapitreController::class, 'getByLangage']);
Route::get('/cours/chapitre/{id}', [CoursController::class, 'getByChapitre']);

Route::get('/utilisateur-preference-langage/{id}', [UtilisateurController::class, 'getPreferredLanguage']);

Route::post('/utilisateur/langue', function (Request $request) {
    $request->validate([
        'langue_choisi' => 'required|string',
    ]);

    // Si tu enlèves l'authentification, il faut récupérer l'utilisateur autrement :
    // soit par ID envoyé dans la requête :
    $request->validate([
        'utilisateur_id' => 'required|exists:apprenants,id'
    ]);

    $utilisateur = \App\Models\Utilisateur::find($request->utilisateur_id);

    if (!$utilisateur) {
        return response()->json(['error' => 'Utilisateur introuvable'], 404);
    }

    $utilisateur->langue_choisi = $request->langue_choisi;
    $utilisateur->save();

    return response()->json(['message' => 'Langue mise à jour avec succès']);
});

Route::post('/update-langage-actuel', function (Request $request) {
    $validated = $request->validate([
        'utilisateur_id' => 'required|exists:apprenants,id',
        'langage_id' => 'required|exists:langages,id'
    ]);

    $utilisateur = Utilisateur::find($validated['utilisateur_id']);

    if (!$utilisateur) {
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }

    $utilisateur->langage_id_actuel = $validated['langage_id'];
    $utilisateur->save();

    return response()->json(['message' => 'Langage actuel mis à jour']);
});
Route::get('/progressions', [ProgressionController::class, 'index']);
Route::post('/progressions', [ProgressionController::class, 'updateOrCreate']);
Route::get('/progressions/langage/{userId}', [ProgressionController::class, 'progressionParLangage']);

Route::get('/langages', [LangageController::class, 'index']);

Route::get('quizzes/chapitre/{chapitreId}', [QuizController::class, 'getMiniQuizByChapitreId']);
Route::apiResource('quizzes', QuizController::class);

Route::get('/questions/quiz/{quizId}', [QuestionController::class, 'getByQuizzesId']);
Route::get('/questions/by-quiz/{quizId}', [QuestionController::class, 'getByQuizId']);
Route::apiResource('questions', QuestionController::class);

Route::get('/resultats/by-user-with-quiz', [ResultatController::class, 'getByUtilisateurIdWithQuiz']);
Route::put('resultats/update-by-user-quiz', [ResultatController::class, 'updateByUserAndQuiz']);
Route::get('/quizzes/langage/{langageId}', [QuizController::class, 'getQuizzesByLangageId']);
Route::get('/resultats/score/{utilisateur_id}/{quiz_id}', [ResultatController::class, 'getScore']);
Route::apiResource('resultats', ResultatController::class);

Route::get('/reponses/question/{questionId}', [ReponseController::class, 'getReponsesByQuestionId']);
Route::apiResource('reponses', ReponseController::class);

Route::get('/quiz/{quizId}/utilisateur/{utilisateurId}/reponses', [UtilisateurReponseController::class, 'getResponsesByQuiz']);
Route::post('/user-response', [UtilisateurReponseController::class, 'storeOrUpdate']);
Route::apiResource('utilisateur/reponses', UtilisateurReponseController::class);

Route::get('/badge/image/{filename}', [BadgeImageController::class, 'show']);
Route::get('/test-image/{filename}', function ($filename) {
    $path = "image/" . $filename;
    if (\Storage::exists($path)) {
        return "File EXISTS at: $path";
    } else {
        return "File NOT FOUND at: $path";
    }
});
Route::apiResource('badges', BadgeController::class);

Route::get('/badge/langage/{langage_id}', [BadgeController::class, 'getBadgeByLangage']);

Route::get('/utilisateur/{id}/badges/count', [ApprenantBadgeController::class, 'countBadgesByUtilisateur']);
Route::get('utilisateur/{id}/badges', [ApprenantBadgeController::class, 'badgesByUtilisateur']);
Route::apiResource('utilisateur/badges', ApprenantBadgeController::class);


Route::get('/admin/stats', [AdminStatsController::class, 'stats']);

Route::post('/admin/update-nombre-utilisateurs-termines', [AdminStatsController::class, 'updateNombreUtilisateursTermines']);
Route::get('/admin/langages-termines', [AdminStatsController::class, 'getNombreUtilisateursTermines']);


