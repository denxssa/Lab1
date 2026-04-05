<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::view('/about-us', 'welcome');
Route::view('/jobs', 'welcome');
Route::view('/pricing', 'welcome');
