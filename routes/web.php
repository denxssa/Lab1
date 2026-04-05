<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/login', 'welcome')->name('login');
Route::view('/signup', 'welcome')->name('signup');

Route::get('/about-us', [AboutController::class, 'index']);
