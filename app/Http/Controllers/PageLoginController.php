<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageLoginController extends Controller
{
    public function index()
    {
        return view('login');
    }
}
