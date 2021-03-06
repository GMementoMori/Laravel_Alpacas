<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Session;

/**
 * Class LoginController
 * @package App\Http\Controllers
 */
class LoginController extends Controller
{
    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
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
            Session::put('user_id', $user->id);

            return response()->json(['success' => true, 'link' => 'home']);
        } catch (Exception $e) {
            return response()->json(['error'=>"Up exception: $e->getMessage()"]);
        }
    }

    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $name = $request->input('name');
        $pass = $request->input('pass');
        $_token = $request->input('_token');

        $user = User::where([
            ['name', '=', $name]
        ])->get();
        if (Hash::check($pass, $user[0]->password)) {
            $user[0]->remember_token = $_token;
            $user[0]->save();

            Session::put('_sessionToken', $_token);
            Session::put('user_id', $user[0]->id);

            return response()->json(['success' => true, 'link' => 'home']);
        } else {
            return response()->json(['error' => "No one account found"]);
        }
    }
}
