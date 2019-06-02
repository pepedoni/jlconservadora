<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Invoice;
use Carbon\Carbon;

class InvoiceController extends Controller {

    public function insertInvoice(Request $request) {
        $request->validate([
        ]);
        
        $invoice = new Invoice([
        ]);
            
        $invoice->save();

        return response()->json([
            'message' => __('invoice.insert_ok')
        ], 201);
    } 

    public function updateInvoice(Request $request, Invoice $invoice) {

        $invoice = Invoice::findOrFail($request->id);

        $invoice->fill($request->all())->save();

        return response()->json(['data'=> $invoice]);
    }

    public function deleteInvoice(Request $request, Invoice $invoice) {
        $invoice = Invoice::findOrFail($request->id);
        $invoice->delete();
    }

    public function getInvoices(Request $request) {
        $pageSize = $request->get('pageSize') ? $request->get('pageSize') : 10;
        
        $invoice = Invoice::paginate($pageSize);

        return $invoice;
    }
}
