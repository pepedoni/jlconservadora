<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'code','municipal_inscription', 'inscription', 'name', 'nature_operation','taxation_regime', 'national_simple', 'cultural_promoter', 
        'cep', 'state', 'city', 'address_district', 'address', 'address_number','address_complement', 'certify_name', 'certify_password', 'certify_data',
        'cnae'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'companies';
}
