<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IotController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// rute halaman
Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Beranda');
    })->name('beranda');

    Route::get('/pengontrolan', function () {
        return Inertia::render('Pengontrolan');
    })->name('pengontrolan');

    Route::get('/monitoring', function () {
        return Inertia::render('Monitoring');
    })->name('monitoring');
});


// rute Iot
// control pompa campuran & pupuk
Route::post('/command', [IotController::class, 'writeCommand']);
Route::get('/command', [IotController::class, 'getCommand']);

// get jadwal
Route::get('/jadwal', [IotController::class, 'getJadwal']);

// nilai sensor kelembaban
Route::post('/sensor', [IotController::class, 'writeSensorData']);
Route::get('/sensor', [IotController::class, 'getLatestSensorData']);
Route::get('/sensor-data', [IotController::class, 'getAllSensorData']);

// nilai sensor volume air dan campuran
Route::post('/volume', [IotController::class, 'writeVolumeData']);
Route::get('/volume', [IotController::class, 'getLatestVolumeData']);



// rute autentikasi
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout']);
