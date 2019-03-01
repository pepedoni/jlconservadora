<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'code','municipal_inscription', 'inscription', 'name', 'nature_operation','taxation_regime', 'national_simple', 'cultural_promoter' 
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'companies';
}