<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Notifications\CustomResetPassword;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;



class AuthController extends Controller
{

   public function register(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
            'age' => 'nullable|integer|min:0',
        ]);

        // Wrap in a transaction for safety
        \DB::beginTransaction();

        try {
            // Step 1: Create the related utilisateur record
            $utilisateur = Utilisateur::create([
                'objectif' => '',
                'niveau' => '',
                'objectif_quotidien' => '',
                'date_derniere_connexion' => now(),
                'points_energie' => 0,
                'statut' => '',
                'langue_choisi' => '',
            ]);

            $utilisateur_id = $utilisateur->id;

            // Step 2: Create the user and link with utilisateur_id
            $user = User::create([
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'age' => $validated['age'] ?? null,
                'role' => 'user',
                'utilisateur_id' => $utilisateur_id,
            ]);

            \DB::commit();

            return response()->json([
                'message' => 'Inscription réussie !',
                'user' => $user,
                'utilisateur_id' => $utilisateur_id
            ], 201);

        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json([
                'message' => "Erreur lors de l'inscription",
                'error' => $e->getMessage()
            ], 500);
        }
    }





    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // L'utilisateur est connecté, on renvoie ses infos
        return response()->json([
            'user' => Auth::user()
        ]);
    }
public function user(Request $request)
{
   return response()->json($request->user());
}

    public function logout(Request $request)
    {
        // 1. Delete Sanctum tokens (optional, if you use token auth too)
        $request->user()->tokens()->delete();

        // 2. Laravel session logout
        Auth::logout();

        // 3. Invalidate session & regenerate CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    // Send reset password link to user's email
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['email' => 'User not found.'], 404);
        }

        // Create and store the token properly
        $token = Password::createToken($user);

        // Store hashed token in DB (necessary for reset to work)
        \DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => Hash::make($token),
                'created_at' => now(),
            ]
        );

        // Now send the custom mail
        $email = $user->email;
        $url = config('app.frontend_url') . "/reset-password?token=$token&email=$email";
        Mail::to($email)->send(new ResetPasswordMail($url, $email));

        return response()->json(['status' => 'Reset link sent!']);
    }

    // Reset the password using token and new password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['status' => __($status)])
            : response()->json(['email' => __($status)], 422);
    }


}

