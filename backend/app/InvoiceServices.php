<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceServices extends Model
{
    protected $fillable = [
        'invoice_id', 'service_id', 'aliquot_iss', 'aliquot_pis', 'aliquot_cofins', 
        'aliquot_csll', 'aliquot_inss', 'value_inss', 'value_iss', 'value_pis', 'value_cofins', 'value_csll',
        'description', 'value'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'invoice_services';
}
