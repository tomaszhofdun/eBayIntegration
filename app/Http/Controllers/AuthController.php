<?php

namespace App\Http\Controllers;

use App\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {

        $fields = $request->validate([
            'name' => 'required|string',
            'email'=> 'required|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password'])
        ]);

         $token = $user->createToken('appToken')->plainTextToken;

        $response = [
            'user' => $user,
            "token" => $token
        ];
        return response($response, 201);
    }
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'=> 'required|string',
            'password' => 'required|string'
        ]);
        
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return [
                'response' => 'The provided credentials are incorrect.'
                
            ];
        }
    
        return [
            'token'=> $user->createToken('appToken')->plainTextToken,
            'success' => 'ok',
            'username' => $user->name,
            'avatar' => $user->email

            ];
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); 
        
        return [
            'message' => "Token destroyed"
        ];
    }
}
