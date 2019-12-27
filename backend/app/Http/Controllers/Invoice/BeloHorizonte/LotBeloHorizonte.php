<?php

namespace App\Http\Controllers\Invoice\BeloHorizonte;

use App\Http\Controllers\Invoice\LotCity;
use App\Http\Controllers\Invoice\BeloHorizonte\InvoiceBeloHorizonte;

class LotBeloHorizonte extends LotCity
{
    protected $cod_city_ibge  = '3106200';
    protected $cod_city_siafi = '4123'; 
    protected $xmlLoteRps     = '';
    protected $id_lote = '1';

    const URL_PRODUCAO = "https://bhissdigital.pbh.gov.br/bhiss-ws/nfse?wsdl";
    const URL_HOMOLOGACAO = "https://bhisshomologa.pbh.gov.br/bhiss-ws/nfse?wsdl";

    /**
     * Enviar Lote Rps 
     */

    protected function genHeaderEnviarLoteRps() {
        $this->xmlLoteRps = '
        <EnviarLoteRpsEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
			<LoteRps Id="'.$this->idLotRps.'" xmlns="http://www.abrasf.org.br/nfse.xsd" versao="1.00">
				<NumeroLote>'.str_pad($this->lot["id"], 15, "0", STR_PAD_LEFT).'</NumeroLote>
				<Cnpj>'.$this->lot["provider_inscription"].'</Cnpj>
				<InscricaoMunicipal>'.$this->lot["provider_inscription_municipal"].'</InscricaoMunicipal>
				<QuantidadeRps>'.count($this->invoices).'</QuantidadeRps>
				<ListaRps>';
    }

    protected function getFooterEnviarLoteRps() {   
        $this->xmlLoteRps .= '
                </ListaRps>
            </LoteRps>
        </EnviarLoteRpsEnvio>';
    }

    protected function genXmlEnviarLoteRps() {
        
        $this->genHeaderEnviarLoteRps();

        foreach($this->invoices as $invoice) {
            $invoiceBeloHorizonte = new InvoiceBeloHorizonte($invoice);
            $this->xmlLoteRps .= $invoiceBeloHorizonte->getRps();
        }

        $this->getFooterEnviarLoteRps();
    }

    public function sendLotToWebService() {
        $context = stream_context_create(array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        ));

        $options = array(
            'local_cert' => $caminho,
            'trace' => 1,
            'uri' => 'http://ws.bhiss.pbh.gov.br/',
            'soap_version' => SOAP_1_1,
            'stream_context' => $context,
            'exceptions' => true
        );

        $url = ($this->ambiente == 1) ? self::URL_PRODUCAO : self::URL_HOMOLOGACAO;

        $client = new \SoapClient($url, $options);
        $soapMsg["nfseCabecMsg"] = '<cabecalho xmlns="http://www.abrasf.org.br/nfse.xsd" versao="1.00"><versaoDados>1.00</versaoDados></cabecalho>';
        $soapMsg["nfseDadosMsg"] = $this->xmlLoteRps;

        /* $resultado = $client->__soapCall($nomeFuncao, array($soapMsg));
        return $resultado; */
    }

    public function transmitLotRps() {
        $this->genXmlEnviarLoteRps();
        $this->signXmlEnviarLoteRps(array("InfRps", "LoteRps"));
        $this->sendLotToWebService();
    }

    /**
     * Fim Enviar Lote Rps 
     */

    public function consultLotRps() {

    }
}
