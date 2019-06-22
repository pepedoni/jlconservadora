<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Invoice\InvoiceBeloHorizonte;
use Illuminate\Http\Request;
use App\Invoice;
use App\InvoiceServices;
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

    public function taxes(Request $request) {
        $invoice_id = $request->get('invoice_id');
        
        $invoiceServices = InvoiceServices::where('invoice_id', '=', $invoice_id)->get();
        
        $value_iss      = 0;
        $value_pis      = 0;
        $value_cofins   = 0;
        $value_csll     = 0;
        $value_ir       = 0;
        $value_inss     = 0;

        foreach($invoiceServices as $invoiceService) {
            $value_iss      += $invoiceService["value_iss"];
            $value_pis      += $invoiceService["value_pis"];
            $value_cofins   += $invoiceService["value_cofins"];
            $value_csll     += $invoiceService["value_csll"];
            $value_ir       += $invoiceService["value_ir"];
            $value_inss     += $invoiceService["value_inss"];
            
        }

        $impostos = array(
     
            array(
                "name" => "ISS",
                "value" => $value_iss
            ),
            array(
                "name" => "PIS",
                "value" => $value_pis
            ),
            array(
                "name" => "COFINS",
                "value" => $value_cofins
            ),
            array(
                "name" => "CSLL",
                "value" => $value_csll
            ),
            array(
                "name" => "IR",
                "value" => $value_ir
            ),
            array(
                "name" => "INSS",
                "value" => $value_inss
            ),

        );

        return $impostos;
    }

    public function transmitInvoice(Request $request) {
        $invoices = $request->all();

        foreach($invoices as $invoice) {
            $invoicesBeloHorizonte = new InvoiceBeloHorizonte($invoices);
            var_dump($invoice["id"]);
        }
    }
}
