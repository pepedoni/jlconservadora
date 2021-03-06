<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name', 'list_item', 'description', 'aliquot', 'taxation_code'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'services';
}
