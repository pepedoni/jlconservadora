<?php


namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Client;
use Carbon\Carbon;

class ClientController extends Controller {
    public function insertClient(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'syndic_email' => 'required|string|email|unique:clients'//,
            // 'password' => 'required|string|confirmed'
            ]);
        // var_dump($request->syndic_email);die;
        
        
        $client = new Client([
            'name' => $request->name,
            'type' => 1,
            'syndic_ap' => '309',
            'syndic_birthday' => Carbon::now(),
            'syndic_email' => $request->syndic_email,
            'home_contact' => '84950495049',
            'phone_contact' => '84950695049',
            'commerce_contact' => '93949599945',
            'manage_init' => Carbon::now(),
            'manage_end' => Carbon::now(),
            'cond_blocks' => 3,
            'cond_floors' => 2,
            'cond_aps' => 12,
            'address' => 'Rua Não Te Interessa',
            'address_number' => 234,
            'address_complement' => 'AP202'
        ]);
            
        $client->save();
        var_dump('uei gida');die;

        return response()->json([
            'message' => __('client.insert_ok')
        ], 201);
    } 

    public function getClients(Request $request) {
        $clients = Client::paginate(2);
        foreach($clients as &$client) {
            $client['complete_address'] = $client['address'].', '.$client['address_number'];
            if($client['address_complement'] != '')
                $client['complete_address'] = $client['complete_address'].'/'.$client['address_complement'];
        }
        return $clients;
    }
}
