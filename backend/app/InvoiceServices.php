<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceServices extends Model
{
    protected $fillable = [
        'invoice_id', 'service_id', 'description', 'value'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'invoice_services';
}
