<?php

namespace App\Http\Controllers\Invoice;

use NFePHP\Common\Certificate;
use App\Lot;

abstract class LotCity {

    protected $cod_city_ibge  = '';
    protected $cod_city_siafi = '';
    protected $xml = '';

    public function __construct($invoices, Certificate $certificate, Lot $lot) {
        $this->invoices = $invoices;
        $this->certificate = $certificate;
        $this->lot = $lot;
    }

    abstract protected function genXmlEnviarLoteRps();
    abstract public function transmitLotRps();
    abstract public function consultLotRps();

    protected function signXmlEnviarLoteRps($tags) {
        
    }

    public function getCodCityIbge() {
        return $this->cod_city_ibge;
    }

    public function getCodCitySiafi() {
        return $this->cod_city_siafi;
    }

}
