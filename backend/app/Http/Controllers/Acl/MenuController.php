<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class MenuController extends Controller
{

    public function buildMenu(Request $request)
    {

        $menu = file_get_contents(__DIR__.'/menu.json');
        
        $menu = json_decode($menu, true);

        return response()->json($menu, 200);
    }

}
