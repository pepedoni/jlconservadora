<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name', 'type', 'syndic_ap', 'syndic_birthday', 'syndic_email', 'home_contact', 'phone_contact',
            'manage_init', 'manage_end', 'cond_blocks', 'cond_floors', 'cond_aps', 'cep', 'state', 'city',
            'address', 'address_district', 'address_number', 'address_complement', 'is_active', 'inscription'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'clients';
}
