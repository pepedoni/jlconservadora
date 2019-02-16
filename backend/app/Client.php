<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name', 'type', 'syndic_ap', 'syndic_birthday', 'syndic_email', 'home_contact', 'phone_contact',
            'commerce_contact', 'manage_init', 'manage_end', 'cond_blocks', 'cond_floors', 'cond_aps',
            'address', 'address_number', 'address_complement'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'clients';
}
