<?php

namespace App\Http\Controllers\Invoice;

use App\Invoice;
use App\InvoiceServices;
use App\Company;
use App\Client;
use App\Service;
use App\Newcode;

abstract class InvoiceCity {

    protected $invoice;
    protected $company;
    protected $service;

    public function __construct(array $invoice) {
        $this->invoice  = $invoice;
        $this->company  = $this->getCompany($invoice["provider_id"]);
        $this->service  = $this->getInvoiceServices($invoice["id"])[0];
        $this->system_service = $this->getSystemServiceByService($this->service)[0];
        $this->client   = $this->getClient($invoice["client_id"]);
        $this->number   = $this->generateNumberRps();
        $this->idRps    = "RPS_" . $this->invoice["series"] . "_" . $this->number;
        $this->calculateTaxesValue();
        $this->calculateDeductionsValue();
        $this->calculateLiquidValue();
    }

    abstract public function getRps(); 

    private function getSystemServiceByService($service) {
        $system_service = Service::where('id', "=", $service["service_id"])->get();
        if(!isset($system_service[0])) throw new \Exception("Serviço não encontrado no sistema.");
        else {
            return $system_service;
        }
    }
    
    private function getCompany($provider_id) {
        $company = Company::where('id', '=', $provider_id)->get();
        if(!isset($company[0])) throw new \Exception("Empresa da nota fiscal não encontrada.");
        else {
            return $company[0];
        }
    }

    private function getInvoiceServices($invoice_id) {
        $services = InvoiceServices::where('invoice_id', '=', $invoice_id)->get();
        if(!isset($services)) throw new \Exception("Serviços da nota fiscal não encontrados.");
        else {
            return $services;
        }
    }

    private function getClient($client_id) {
        $client = Client::where('id', '=', $client_id)->get();
        if(!isset($client[0])) throw new \Exception("Cliente da nota fiscal não encontrado.");
        else {
            return $client[0];
        }
    }

    private function generateNumberRps() {
        $key = "NUMERO_".$this->invoice["provider_id"]."_".$this->invoice["series"];
        $newCode = Newcode::where('key', '=', $key)->get();
    
        if(isset($newCode[0])) {
            $newCode = $newCode[0];
            $newCode["code"] += 1;
            $newCode->save();
            return $newCode["code"];
        }
        else {
            $newCode = new NewCode([
                "key"  => $key,
                "code" => 1
            ]);
            $newCode->save();
            return 1;
        }
    }

    private function calculateLiquidValue() {
        $this->liquidValue = $this->invoice["value"] - ( $this->valueDeductions + $this->service["conditioned_discount"] + $this->service["unconditioned_discount"] );
    }

    private function calculateValueForAliquot($service, $aliquot_value) {
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

    protected function formatNumber($numero, $casasDecimais = 2) {
        return number_format($numero, $casasDecimais, '.', '');
    }

}
