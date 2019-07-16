<?php

namespace App\Http\Controllers\Invoice\BeloHorizonte;

use App\Http\Controllers\Invoice\LotCity;
use App\Http\Controllers\Invoice\BeloHorizonte\InvoiceBeloHorizonte;

class LotBeloHorizonte extends LotCity
{
    protected $cod_city_ibge  = '3106200';
    protected $cod_city_siafi = '4123'; 

    protected $id_lote = '1';

    protected function genHeaderEnviarLoteRps() {
        $this->xmlLoteRps = '<EnviarLoteRpsEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
			<LoteRps Id="LOTE_'.$this->lot["company_id"].'_'.$this->lot["id"].'" xmlns="http://www.abrasf.org.br/nfse.xsd" versao="1.00">
				<NumeroLote>'.str_pad($this->lot["id"], 15, "0", STR_PAD_LEFT).'</NumeroLote>
				<Cnpj>'.$this->lot["provider_inscription"].'</Cnpj>
				<InscricaoMunicipal>'.$this->lot["provider_inscription_municipal"].'</InscricaoMunicipal>
				<QuantidadeRps>'.count($this->invoices).'</QuantidadeRps>
				<ListaRps>';
    }



    protected function genXmlEnviarLoteRps() {
        
        $this->genHeaderEnviarLoteRps();

        foreach($this->invoices as $invoice) {
            $invoiceBeloHorizonte = new InvoiceBeloHorizonte($invoice);
            $invoiceBeloHorizonte->getRps();

        }
    }

    protected function createEnviarLoteRps() {
        
    }

    public function transmitLotRps() {
        $this->createEnviarLoteRps();
        $this->genXmlEnviarLoteRps();
        $this->signXmlEnviarLoteRps(array("InfRps", "LoteRps"));
    }

    public function consultLotRps() {

    }
}
