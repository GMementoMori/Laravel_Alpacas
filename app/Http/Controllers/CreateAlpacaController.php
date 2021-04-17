<?php
namespace App\Http\Controllers;

use App\Http\Requests\CreateAlpacaRequest;
use App\Models\Alpacas;
use App\Models\User;
use App\Models\UsersAlpacas;
use App\Models\AlpacasColors;

/**
 * Class CreateAlpacaController
 * @package App\Http\Controllers
 */
class CreateAlpacaController extends Controller
{
    /**
     * @param CreateAlpacaRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(CreateAlpacaRequest $request)
    {
        try {
            $name = $request->input('name');
            $gender = $request->input('gender');
            $color = $request->input('color');
            $startAge = 1;
            $startHappiness = 100;
            $startHunger = 100;

            $userId = $this->getCurrentUserId();

            $alpacaId = $this->createAlpaca($name, $gender, $startAge, $startHappiness, $startHunger);

            $this->setUserAlpaca($userId, $alpacaId);
            $this->setColorAlpaca($color, $alpacaId);

            return response()->json(['success' => true, 'link' => 'home']);
        } catch (Exception $e) {
            return response()->json(['error'=>"Up exception: $e->getMessage()"]);
        }
    }

    /**
     * @param $name
     * @param $gender
     * @param $startAge
     * @param $startHappiness
     * @param $startHunger
     * @return mixed
     */
    private function createAlpaca($name, $gender, $startAge, $startHappiness, $startHunger)
    {
        $alpaca = new Alpacas();
        $alpaca->name = $name;
        $alpaca->gender = $gender;
        $alpaca->age = $startAge;
        $alpaca->happiness = $startHappiness;
        $alpaca->hunger = $startHunger;
        $alpaca->save();

        return $alpaca->id;
    }

    /**
     * @param $userId
     * @param $alpacaId
     */
    private function setUserAlpaca($userId, $alpacaId)
    {
        $relationUserAlpaca = new UsersAlpacas();
        $relationUserAlpaca->user_id = $userId;
        $relationUserAlpaca->alpaca_id = $alpacaId;
        $relationUserAlpaca->save();
    }

    /**
     * @param $color
     * @param $alpacaId
     */
    private function setColorAlpaca($color, $alpacaId)
    {
        $relationColors = new AlpacasColors();
        $relationColors->alpaca_id = $alpacaId;
        $relationColors->color_id = $color;
        $relationColors->save();
    }

    /**
     * @return mixed
     */
    private function getCurrentUserId()
    {
        $userId = session()->get('user_id');

        $user = User::where([
            ['id', '=', $userId]
        ])->get();

        return $user[0]->id;
    }
}
