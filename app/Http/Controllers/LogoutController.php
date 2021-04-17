<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Class LogoutController
 * @package App\Http\Controllers
 */
class LogoutController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->session()->forget('_sessionToken');
        $request->session()->forget('user_id');

        return response()->json(['success' => true, 'link' => '/']);
    }
}
