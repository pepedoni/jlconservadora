<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
		'provider_id',
        'provider_inscription',  
        'provider_inscription_municipal',
		'provider_social_name',
		'client_id',
        'client_inscription',  
        'client_name',  
        'number',                
        'value',          
        'provision_date',
        'provision_state',
        'provision_city_ibge',
        'provision_city_name',              
		'iss_retain',
		'state',
		'series',
		'lot_id',
		'emission',
		'competence'                
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'invoices';
    protected $casts = ['value' => 'float'];

    /**
	 * Cast an attribute to a native PHP type.
	 *
	 * @param  string  $key
	 * @param  mixed   $value
	 * @return mixed
	 */
	protected function castAttribute($key, $value)
	{
		switch ($this->getCastType($key))
		{
			case 'int':
			case 'integer':
				return (int) $value;
			case 'real':
			case 'float':
            case 'double':
                return number_format((float) $value, 2, '.', '');
			case 'string':
				return (string) $value;
			case 'bool':
			case 'boolean':
				return (bool) $value;
			case 'object':
				return json_decode($value);
			case 'array':
			case 'json':
				return json_decode($value, true);
			default:
				return $value;
		}
	}
}
