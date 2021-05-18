<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Locations;
use App\Models\UsersLocations;
use App\Models\Foods;
use App\Models\UsersFoods;
use App\Models\Toys;
use App\Models\UsersToys;
use App\Models\UsersAlpacas;
use App\Models\Alpacas;

class ActionsController extends Controller
{
    private $userId;

    public function index(Request $request)
    {
        try {
            $this->userId = session()->get('user_id');
            $this->alpaca = $this->getUserAlpaca();
            $action = $request->input('action');
            $idAction = $request->input('idAction');

            switch ($action){
                case "location":
                    $this->setUserlocation($idAction);
                    return response()->json(['success' => true, 'link' => 'home']);
                case "feed":
                    $this->feedAlpaca($idAction);
                    return response()->json(['success' => true, 'link' => 'home']);
                case "play":
                    $this->playWithAlpaca($idAction);
                    return response()->json(['success' => true, 'link' => 'home']);
            }

            return response()->json(['success' => false]);
        } catch (Exception $e) {
            return response()->json(['error'=>"Up exception: $e->getMessage()"]);
        }

    }

    private function setUserlocation($idLocation)
    {
        $location = UsersLocations::where([['user_id', '=', $this->userId]])->get();
        if(isset($location[0])){
            $location[0]->location_id = $idLocation;
            $location[0]->save();
        }else{
            $location = new UsersLocations();
            $location->location_id = $idLocation;
            $location->user_id = $this->userId;
            $location->save();
        }

    }

    private function feedAlpaca($idFood)
    {
        $food = Foods::where([['id', '=', $idFood]])->get();
        if(isset($this->alpaca) && !empty($food[0])){
            $countValueHunger = $this->alpaca->hunger + $food[0]->hunger_value;
            if($countValueHunger <= 100) {
                $this->alpaca->hunger = $countValueHunger;
            } else{
                $this->alpaca->hunger = 100;
            }
            $this->alpaca->save();
        }
    }

    private function playWithAlpaca($idToy)
    {
        $toy = Toys::where([['id', '=', $idToy]])->get();
        if(isset($this->alpaca) && !empty($toy[0])){
            $countValueHappy = $this->alpaca->happiness + $toy[0]->happy_value;
            if($countValueHappy <= 100) {
                $this->alpaca->happiness = $countValueHappy;
            } else{
                $this->alpaca->happiness = 100;
            }
            $this->alpaca->save();
        }
    }

    /**
     * @return false|mixed
     */
    private function getUserAlpaca()
    {
        $alpacaId = $this->getAlpacaId($this->userId);

        $alpaca = Alpacas::where([['id', '=', $alpacaId]])->get();

        return !empty($alpaca[0]) ? $alpaca[0] : false;
    }

    /**
     * @return false
     */
    private function getAlpacaId()
    {
        $alpaca = UsersAlpacas::where([['user_id', '=', $this->userId]])->get();

        return !empty($alpaca[0]->alpaca_id) ? $alpaca[0]->alpaca_id : false;
    }
}
