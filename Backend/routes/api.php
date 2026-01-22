<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserCalculationController;

//links to the URL "/api/calculations" to the Controller
Route::apiResource('calculations', UserCalculationController::class);