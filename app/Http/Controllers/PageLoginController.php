<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Class PageLoginController
 * @package App\Http\Controllers
 */
class PageLoginController extends Controller
{
    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('login');
    }
}
