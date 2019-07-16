<?php

namespace App\Http\Controllers\Invoice;

use App\Invoice;
use App\InvoiceServices;

abstract class InvoiceCity {

    protected $invoice;

    public function __construct(array $invoice) {
        $this->invoice = $invoice;
    }
    
    abstract public function getRps();

}
