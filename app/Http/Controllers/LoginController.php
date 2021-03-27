<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Session;

class LoginController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->remember_token = $request->input('_token');
            $user->password = Hash::make($request->input('pass'));
            $user->save();

            Session::put('_sessionToken', $request->input('_token'));
            return response()->json(['success' => true, 'link' => 'home']);
        } catch (Exception $e) {
            return response()->json(['error'=>"Up exception: $e->getMessage()"]);
        }
    }

    public function login(LoginRequest $request)
    {
        $name = $request->input('name');
        $pass = $request->input('pass');
        $_token = $request->input('_token');

        $user = User::where([
            ['name', '=', $name]
        ])->get();
        if (Hash::check($pass, $user[0]->password)) {
            Session::put('_sessionToken', $_token);
            return response()->json(['success' => true, 'link' => 'home']);
        } else {
            return response()->json(['error' => "No one account found"]);
        }
    }
}
