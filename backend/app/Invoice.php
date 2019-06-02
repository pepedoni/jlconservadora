<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'provider_inscription',  
        'provider_inscription_municipal',
        'provider_social_name',
        'client_inscription',  
        'client_name',  
        'number',                
        'value',          
        'provision_date',
        'provision_state',
        'provision_city_ibge',
        'provision_city_name',              
        'iss_retain'                
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'invoices';
}
