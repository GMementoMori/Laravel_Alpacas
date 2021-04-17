<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Locations;
use App\Models\UsersLocations;
use App\Models\Foods;
use App\Models\UsersFoods;
use App\Models\Toys;
use App\Models\UsersToys;

class ActionsController extends Controller
{
    private $userId;

    public function index(Request $request)
    {
        try {
            $this->userId = session()->get('user_id');

            $action = $request->input('action');
            $idAction = $request->input('idAction');

            switch ($action){
                case "location":
                    $this->setUserlocation($idAction);
                    break;
            }

            return response()->json(['success' => true, 'link' => 'home']);
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
}
