<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|string',
            'full_name' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $checkUsername = User::where('username', $request->username)->count();
        if ($checkUsername === 1) {
            return to_route('register')->withErrors(['username' => 'Username already exists']);
        }

        // Membuat user baru
        User::create([
            'username' => $request->username,
            'full_name' => $request->full_name,
            'password' => Hash::make($request->password), // Menggunakan bcrypt untuk mengenkripsi password
        ]);

        // Redirect ke halaman home atau ke halaman selanjutnya setelah registrasi
        return to_route('login')->with('message', 'Registration successful. Please login.');
    }

    public function login(Request $request)
    {
        // Validasi input
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Coba untuk melakukan autentikasi
        if (Auth::attempt($credentials)) {
            // Autentikasi berhasil
            return to_route('beranda'); // Redirect ke halaman home
        }

        // Autentikasi gagal
        return to_route('login')->withErrors(['login' => 'Incorrect Username or Password']); // Redirect kembali ke halaman login dengan pesan kesalahan
    }
    public function logout()
    {
        Auth::logout();
        return to_route('login');
    }
}
