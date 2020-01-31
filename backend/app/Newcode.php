<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Newcode extends Model
{
    protected $fillable = [
		'key',
		'code'  
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'newcodes';
}
