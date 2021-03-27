<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UsersAlpacas;
use App\Models\Alpacas;

class PageHomeController extends Controller
{
    public function index ()
    {
        return view('home');
    }

    private function getAlpaca()
    {

    }
}
