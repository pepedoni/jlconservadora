<?php

namespace App\Http\Controllers\Acl;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class MenuController extends Controller
{

    public function buildMenu(Request $request)
    {

        $components = array(
            array(
                "icon"  => "dashboard",
                "title" => "Dashboard",
                "link"  =>  "/dashboard"
            ),
            array(
                "icon"  => "tags",
                "title" => "Oportunidades",
                "link"  =>  "/pipeline"
            )
        );
        
        return response()->json($components, 200);
    }

}
