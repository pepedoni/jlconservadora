<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceServices extends Model
{
    protected $fillable = [
        'invoice_id', 'service_id', 'aliquot_iss', 'aliquot_pis', 'aliquot_cofins', 
        'aliquot_csll', 'aliquot_inss', 'value_inss', 'value_iss', 'value_pis', 'value_cofins', 'value_csll',
        'description', 'value', 'taxation_code', 'conditioned_discount', 'unconditioned_discount'
    ];

    protected $guarded = ['id', 'created_at', 'update_at'];
    protected $table = 'invoice_services';
    protected $casts = [
        'value'                  => 'float',
        'aliquot_iss'            => 'float',
        'aliquot_pis'            => 'float',
        'aliquot_cofins'         => 'float',
        'aliquot_csll'           => 'float',
        'aliquot_inss'           => 'float',
        'value_inss'             => 'float',
        'value_iss'              => 'float',
        'value_pis'              => 'float',
        'value_cofins'           => 'float',
        'value_csll'             => 'float',
        'conditioned_discount'   => 'float',
        'unconditioned_discount' => 'float'
    ];

    /**
     * Get invoice.
     */
    public function invoice() {
        return $this->belongsTo('App\Invoice', 'invoice_id');
    }

    public function service() {
        return $this->belongsTo('App\Service', 'service_id');
    }

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
