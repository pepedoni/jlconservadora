<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lot extends Model
{
    protected $fillable = [
		'provider_id',
		'provider_inscription',
		'provider_inscription_municipal',
		'state'      
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'lot';
}
