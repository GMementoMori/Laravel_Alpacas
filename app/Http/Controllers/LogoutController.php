<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        $request->session()->forget('_sessionToken');
        $request->session()->forget('user_id');

        return response()->json(['success' => true, 'link' => '/']);
    }
}
