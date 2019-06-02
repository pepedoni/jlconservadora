<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Invoice;
use Carbon\Carbon;

class InvoiceController extends Controller {

    public function store(Request $request) {

        $request->provider_inscription = str_replace(array(".", "/", "-"), "", $request->provider_inscription);

        $request->validate([
            'provider_inscription'              => 'required',
            'provider_inscription_municipal'    => 'required',
            'client_inscription'                => 'required',
            'client_name'                       => 'required',
            'provider_social_name'              => 'required',
            'value'                             => 'required',
            'provision_date'                    => 'required',
            'provision_state'                   => 'required',
            'provision_city_ibge'               => 'required',
            'provision_city_name'               => 'required',
            'iss_retain'                        => 'required'
        ]);
        
        $invoice = new Invoice([
            'provider_inscription'              => $request->provider_inscription,
            'provider_inscription_municipal'    => $request->provider_inscription_municipal,
            'provider_social_name'              => $request->provider_social_name,
            'client_inscription'                => $request->client_inscription,
            'client_name'                       => $request->client_name,
            'number'                            => $request->number,
            'value'                             => $request->value,
            'provision_date'                    => $request->provision_date,
            'provision_state'                   => $request->provision_state,
            'provision_city_ibge'               => $request->provision_city_ibge,
            'provision_city_name'               => $request->provision_city_name,
            'iss_retain'                        => $request->iss_retain
        ]);
            
        $invoice->save();

        return response()->json([
            'message' => __('invoice.insert_ok')
        ], 201);
    } 

    public function update(Request $request, Invoice $invoice) {

        $invoice = Invoice::findOrFail($request->id);

        $invoice->fill($request->all())->save();

        return response()->json(['data'=> $invoice]);
    }

    public function remove(Request $request, Invoice $invoice) {
        $invoice = Invoice::findOrFail($request->id);
        $invoice->delete();
    }

    public function index(Request $request) {
        $pageSize = $request->get('pageSize') ? $request->get('pageSize') : 10;
        
        $invoices = Invoice::paginate($pageSize);
        
        foreach($invoices as &$invoice) {
            $date = new \DateTime($invoice["provision_date"]);
            $invoice["provision_date_grid"] = $date->format('d/m/Y');
        }

        return $invoices;
    }
}
