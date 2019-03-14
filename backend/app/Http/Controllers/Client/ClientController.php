<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Client;
use Carbon\Carbon;

class ClientController extends Controller {

    public function insertClient(Request $request) {

        $request->phone_contact = str_replace(array("(", ")", "-", " "), "", $request->phone_contact);
        $request->commerce_contact = str_replace(array("(", ")", "-", " "), "", $request->commerce_contact);

        $request->validate([
            'name' => 'required|string|max:255',
            'syndic_ap' => 'required|string|max:5',
            'syndic_birthday' => 'required|string|max:10',
            'syndic_email' => 'required|string|email|unique:clients|max:50',
            'phone_contact' => 'required|string|max:18',/* 
            'manage_init' => 'required|string|max:10',
            'manage_end' => 'required|string|max:10', */
            'cond_blocks' => 'required|integer|max:99',
            'cond_floors' => 'required|integer|max:99',
            'cond_aps' => 'required|integer',
            'address' => 'required|string|max:255',
            'address_number' => 'required|integer'
        ]);
        
        $client = new Client([
            'name' => $request->name,
            'type' => 1,
            'syndic_ap' => $request->syndic_ap,
            'syndic_birthday' => Carbon::parse($request->syndic_birthday),
            'syndic_email' => $request->syndic_email,
            'phone_contact' => $request->phone_contact,
            'home_contact' => '99999999',
            'manage_init' => Carbon::parse($request->manage_init),
            'manage_end' => Carbon::parse($request->manage_end),
            'cond_blocks' => $request->cond_blocks,
            'cond_floors' => $request->cond_floors,
            'cond_aps' => $request->cond_aps,
            'cep' => $request->cep,
            'state' => $request->state,
            'city' => $request->city,
            'address_district' => $request->address_district,
            'address' => $request->address,
            'address_number' => $request->address_number,
            'inscription' =>$request->inscription
        ]);
            
        $client->save();

        return response()->json([
            'message' => __('client.insert_ok')
        ], 201);
    } 

    public function updateClient(Request $request, Client $client) {

        $client = Client::findOrFail($request->id);

        $client->fill($request->all())->save();

        return response()->json(['data'=> $client]);
    }

    public function deleteClient(Request $request, Client $client) {
        $client = Client::findOrFail($request->id);
        $client->delete();
    }

    public function getClients(Request $request) {
        $clients = Client::paginate(7);
        foreach($clients as &$client) {
            $client['complete_address'] = $this->getCompleteAddress($client);
        }

        return $clients;
    }

    public function filterClients(Request $request) {
        //var_dump(array_keys($request->all()));die;
        $filteredClients = Client::query()->whereLike($request->all())->get();
        
        return $filteredClients;
    }

    public function getCompleteAddress($client) {
        $completeAddress = $client['address'].', '.$client['address_number'];
        if($client['address_complement'] != '')
            $completeAddress = $client['complete_address'].'/'.$client['address_complement'];
        
        return $completeAddress;
    }

    public function getDistricts(Request $request) {
        if($request->query('address_district')) {
            return Client::distinct()->where('address_district', 'LIKE', '%'.$request->query('address_district').'%')->get(['address_district']);
        }
        else return Client::distinct()->get(['address_district']);
    }
}
