<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'cpf', 'name', 'email'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'employees';
}
