<?php

namespace App\Http\Controllers\Invoice;

use App\Invoice;
use App\InvoiceServices;
use App\Company;
use App\Client;

abstract class InvoiceCity {

    protected $invoice;

    public function __construct(array $invoice) {
        $this->invoice  = $invoice;
        $this->company  = $this->getCompany($invoice["provider_id"]);
        $this->service = $this->getInvoiceServices($invoice["id"])[0];
        $this->client   = $this->getClient($invoice["client_id"]);
        $this->calculateTaxesValue();
        $this->calculateDeductionsValue();
    }
    
    protected function getCompany($provider_id) {
        $company = Company::where('id', '=', $provider_id)->get();
        if(!isset($company[0])) throw new \Exception("Empresa da nota fiscal não encontrada.");
        else {
            return $company[0];
        }
    }

    protected function getInvoiceServices($invoice_id) {
        $services = InvoiceServices::where('invoice_id', '=', $invoice_id)->get();
        if(!isset($services)) throw new \Exception("Serviços da nota fiscal não encontrados.");
        else {
            return $services;
        }
    }

    protected function getClient($client_id) {
        $client = Client::where('id', '=', $client_id)->get();
        if(!isset($client[0])) throw new \Exception("Cliente da nota fiscal não encontrado.");
        else {
            return $client[0];
        }
    }

    protected function calculateValueForAliquot($service, $aliquot_value) {
        $value = $service["value"] * ($aliquot_value / 100);
        return $this->formatNumber($value);
    }

    private function calculateTaxesValue() {
        $this->valuePis = $this->calculateValueForAliquot($this->service, $this->service["aliquot_pis"]);
        $this->valueCofins = $this->calculateValueForAliquot($this->service, $this->service["aliquot_cofins"]);
        $this->valueInss = $this->calculateValueForAliquot($this->service, $this->service["aliquot_inss"]);
        $this->valueIr = $this->calculateValueForAliquot($this->service, $this->service["aliquot_ir"]);
        $this->valueCsll = $this->calculateValueForAliquot($this->service, $this->service["aliquot_csll"]);
    }

    private function calculateDeductionsValue() {
        $this->valueDeductions = $this->formatNumber($this->valuePis + $this->valueCofins + $this->valueInss + $this->valueIr + $this->valueCsll + $this->service["value_iss"]);
    }

    public function formatNumber($numero, $casasDecimais = 2) {
        return number_format($numero, $casasDecimais, '.', '');
    }

    abstract public function getRps();

}
