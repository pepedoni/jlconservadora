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
        $this->services = $this->getInvoiceServices($invoice["id"]);
        $this->client   = $this->getClient($invoice["client_id"]);
        $this->discrimnation = $this->getDiscrimination();
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

    public function getDiscrimination() {
        $discimination = '';
        $first = true;
        foreach($this->services as $service) {
            if($first) $discimination .= $service["description"];
            else {
                $discimination .= '
                '.$service["description"];
            }
        }
        return $discimination;
    }

    public function formatarNumero($numero, $casasDecimais = 2) {
        return number_format($numero, $casasDecimais, '.', '');
    }

    abstract public function getRps();

}
