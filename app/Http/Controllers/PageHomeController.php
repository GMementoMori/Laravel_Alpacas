<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UsersAlpacas;
use App\Models\Alpacas;
use App\Models\Colors;

class PageHomeController extends Controller
{
    public function index ()
    {
        if($alpaca = $this->checkCurrentUserAlpacas()){
            return view('home', ['register' => true]);
        } else {
            $colors = $this->getColors();
            return view('home', ['register' => false, 'colors' => $colors]);
        }
    }

    private function checkCurrentUserAlpacas()
    {
        $userId = session()->get('user_id');

        if ($alpaca = $this->getUserAlpaca($userId)) {
            return $alpaca;
        }

        return false;
    }

    private function getUserAlpaca($userId)
    {
        $alpacaId = $this->getAlpacaId($userId);

        $alpaca = Alpacas::where([['id', '=', $alpacaId]])->get();

        return !empty($alpaca[0]->id) ? $alpaca[0]->id : false;
    }

    private function getAlpacaId($userId)
    {
        $alpaca = UsersAlpacas::where([['user_id', '=', $userId]])->get();

        return !empty($alpaca[0]->alpaca_id) ? $alpaca[0]->alpaca_id : false;
    }

    private function getColors()
    {
        foreach (Colors::all() as $color) {
            $colors[] = [$color->id, $color->title, $color->value];
        }
        return $colors;
    }
}
