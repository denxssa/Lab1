<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/about-us', 'welcome');
Route::view('/companies', 'welcome');
Route::view('/jobs', 'welcome');
Route::view('/contact-us', 'welcome');
Route::view('/pricing', 'welcome');
Route::view('/login', 'welcome')->name('login');
Route::view('/signup', 'welcome')->name('signup');
Route::view('/jobs/{any}', 'welcome');
