<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::get('/', function () {
    return view('welcome');
});

// use Illuminate\Support\Facades\Mail;

// Route::get('/test-mail', function () {
//     Mail::raw('This is a test email from Codecoon project.', function ($message) {
//         $message->to('ikram.elfrnani@gmail.com')
//                 ->subject('Test Email from Codecoon');
//     });

//     return 'Test email sent!';
// });
// Route::post('/login', [AuthController::class, 'login'])->name('login');
// Route::post('/register', [AuthController::class, 'register'])->name('register');

