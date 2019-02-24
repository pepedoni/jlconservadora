<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Service;
use Carbon\Carbon;

class ServiceController extends Controller
{
    public function insertservice(Request $request) {
        $request->validate([
            'name'      => 'required|string|max:255',
            'list_item' => 'required|string|min:1|max:12',
            'aliquot'   => 'required|numeric|between:0,99.99',
            'description' => 'required|string|min:1|max:255'
        ]);
        
        $service = new Service([
            'name' => $request->name,
            'list_item' => $request->list_item,
            'aliquot'   => round($request->aliquot, 2),
            'description' => $request->description
        ]);
            
        $service->save();

        return response()->json([
            'message' => __('service.insert_ok')
        ], 201);
    } 

    public function updateService(Request $request, Service $service) {

        $service = Service::findOrFail($request->id);

        $service->fill($request->all())->save();

        return response()->json(['data'=> $service]);
    }

    public function getServices(Request $request) {
        $services = Service::paginate(7);

        return $services;
    }
}
