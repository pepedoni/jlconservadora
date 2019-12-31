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
            'description' => 'required|string|min:1|max:255',
            'taxation_code' => 'required|string'
        ]);
        // var_dump($request->taxation_code);die;
        
        $service = new Service([
            'name' => $request->name,
            'list_item' => $request->list_item,
            'aliquot'   => round($request->aliquot, 2),
            'description' => $request->description,
            'taxation_code' => $request->taxation_code
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

    public function getServicesList(Request $request) {
        $servicesList = file_get_contents(__DIR__.DIRECTORY_SEPARATOR.'servicesList.json');
        $servicesList = json_decode($servicesList);
        return response()->json(['data' => $servicesList]);
    }

    public function getServices(Request $request) {
        
        $pageSize = $request->get('pageSize') ? $request->get('pageSize') : 10;
        
        $services = Service::paginate($pageSize);

        return $services;
    }

    
    public function getServiceByName(Request $request) {
        return Service::distinct()->where('name', 'LIKE', $request->query('name').'%')->get();
    }

    public function remove(Request $request, Service $service) {
        $service = Service::findOrFail($request->id);

        $service->delete();
    }
}
