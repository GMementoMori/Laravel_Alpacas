<?php
namespace App\Http\Controllers;

use App\Models\AlpacasColors;
use App\Models\User;
use App\Models\UsersAlpacas;
use App\Models\Alpacas;
use App\Models\Colors;
use App\Models\Locations;
use App\Models\UsersLocations;
use App\Models\Foods;
use App\Models\UsersFoods;
use App\Models\Toys;
use App\Models\UsersToys;

/**
 * Class PageHomeController
 * @package App\Http\Controllers
 */
class PageHomeController extends Controller
{
    /**
     * @var
     */
    private $userId;

    /**
     * @var
     */
    private $alpaca;

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index ()
    {
        $this->userId = session()->get('user_id');

        if($alpaca = $this->checkCurrentUserAlpacas()){

            $this->alpaca = $alpaca;

            return view('home', [
                'register' => true,
                'backImage' => '/images/' . $this->getMainLocation(),
                'alpacaName' => $this->alpaca->name,
                'alpacaColor' => $this->getAlpacaColor(),
                'actions' => [
                    'Location' => $this->getActions('\App\Models\Locations'),
                    'Feed' => $this->getActions('\App\Models\Foods'),
                    'Play' => $this->getActions('\App\Models\Toys'),
                ]
            ]);
        } else {
            $colors = $this->getColors();
            return view('home', ['register' => false, 'backImage' => '/images/desert.jpg', 'colors' => $colors]);
        }
    }

    /**
     * @return false|mixed
     */
    private function checkCurrentUserAlpacas()
    {
        if ($alpaca = $this->getUserAlpaca()) {
            return $alpaca;
        }

        return false;
    }

    /**
     * @return mixed
     */
    private function getAlpacaColor()
    {
        $alpacaColorId = AlpacasColors::where([['alpaca_id', '=', $this->alpaca->id]])->get();
        $color = Colors::where([['id', '=', $alpacaColorId[0]->color_id]])->get('value');
        return $color[0]->value;
    }

    /**
     * @return string
     */
    private function getMainLocation()
    {
        $locationId = UsersLocations::where([['user_id', '=', $this->userId]])->get();
        if(!isset($locationId[0]->location_id)){
            return 'forest.jpg';
        }
        $location = Locations::where([['id', '=', $locationId[0]->location_id]])->get();

        return $location[0]->path;
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

    /**
     * @return array
     */
    private function getColors()
    {
        foreach (Colors::all() as $color) {
            $colors[] = [$color->id, $color->title, $color->value];
        }
        return $colors;
    }

    /**
     * @param $actionClass
     * @return array
     */
    private function getActions($actionClass)
    {
        foreach ($actionClass::all() as $action) {
            $result[] = [$action->id, $action->title,  $action->path];
        }
        return $result;
    }

}
