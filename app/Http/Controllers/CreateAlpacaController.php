<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateAlpacaRequest;
use App\Models\Alpacas;
use App\Models\Users;
use App\Models\UsersAlpacas;
use App\Models\AlpacasColors;

class CreateAlpacaController extends Controller
{
    public function create(CreateAlpacaRequest $request)
    {
        try {
            $_token = $request->input('_token');
            $name = $request->input('name');
            $gender = $request->input('gender');
            $color = $request->input('color');
            $startAge = 1;
            $startHappiness = 100;
            $startHunger = 100;

            $userId = $this->getCurrentUserId($_token);

            $alpacaId = $this->createAlpaca($name,$gender,$startAge,$startHappiness,$startHunger);

            $test = $this->setUserAlpaca($userId, $alpacaId);

            $this->setColorAlpaca($color, $alpacaId);

            return response()->json(['success' => true, 'link' => 'home']);
        } catch (Exception $e) {
            return response()->json(['error'=>"Up exception: $e->getMessage()"]);
        }
    }

    private function createAlpaca($name, $gender, $startAge, $startHappiness, $startHunger)
    {
        $alpaca = new Alpacas();
        $alpaca->name = $name;
        $alpaca->gender = $gender;
        $alpaca->age = $startAge;
        $alpaca->happiness = $startHappiness;
        $alpaca->hunger = $startHunger;
        $alpaca->save();

//        return $alpaca->id;
        return 2;
    }

    private function setUserAlpaca($userId, $alpacaId)
    {
//        if(UsersAlpacas::where('user_id', $userId)->get()){
//            return false;
//        }else{
            $relationUser = new UsersAlpacas();
            $relationUser->userId = $userId;
            $relationUser->alpacaId = $alpacaId;
            $relationUser->save();
//        }
    }

    private function setColorAlpaca($color, $alpacaId)
    {
        if($relationColors = AlpacasColors::where('alpaca_id', $alpacaId)->get()){
            $relationColors->alpaca_id = $alpacaId;
            $relationColors->color_id = $color;
            $relationColors->save();
        }else{
            $relationColors = new AlpacasColors();
            $relationColors->alpaca_id = $alpacaId;
            $relationColors->color_id = $color;
            $relationColors->save();
        }
    }

    private function getCurrentUserId($_token)
    {
//        $user = Users::where('_token', $_token)->get();
//        return $user->id;
        return 2;
    }
}
