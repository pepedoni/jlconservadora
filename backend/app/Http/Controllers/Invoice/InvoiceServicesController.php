<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\InvoiceServices;
use Carbon\Carbon;

class InvoiceServicesController extends Controller {

    public function store(Request $request) {
        $request->validate([
        ]);
        
        $invoice = new InvoiceServices($request->all());
            
        $invoice->save();

        return response()->json([
            'message' => __('invoice_services.insert_ok')
        ], 201);
    } 

    public function updateInvoice(Request $request, Invoice $invoice) {

        $invoice = InvoiceServices::findOrFail($request->id);

        $invoice->fill($request->all())->save();

        return response()->json(['data'=> $invoice]);
    }

    public function deleteInvoice(Request $request, Invoice $invoice) {
        $invoice = InvoiceServices::findOrFail($request->id);
        $invoice->delete();
    }

    public function index(Request $request) {
        $invoice_id = $request->get('invoice_id');
        $pageSize = $request->get('pageSize') ? $request->get('pageSize') : 10;
        
        if($invoice_id) {
            $invoices = InvoiceServices::where('invoice_id', '=', $invoice_id)->paginate($pageSize);
        }
        else $invoices = invoicesServices::paginate($pageSize);
        
        return $invoices;

    }
}
