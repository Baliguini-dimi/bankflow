<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ParametresController extends Controller
{
    public function index()
    {
        return Inertia::render('Parametres');
    }

    public function updateProfil(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . Auth::id(),
            ]);

            Auth::user()->update($validated);

            return response()->json(['success' => true, 'message' => 'Profil mis a jour.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'current_password' => 'required|current_password',
                'password' => ['required', 'confirmed', Password::min(8)],
            ]);

            Auth::user()->update([
                'password' => Hash::make($request->password),
            ]);

            return response()->json(['success' => true, 'message' => 'Mot de passe mis a jour.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}