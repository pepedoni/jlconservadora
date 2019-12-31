<?php

namespace App\Http\Controllers\Invoice;

use NFePHP\Common\Certificate;
use App\Lot;
use App\Newcode;
use App\Company;

abstract class LotCity {

    protected $cod_city_ibge  = '';
    protected $cod_city_siafi = '';
    protected $xml = '';
    protected $certificate = '';
    protected $password = '';
    protected $certificate_data = '';

    public function __construct($invoices, Lot $lot) {
        $this->invoices = $invoices;
        $this->provider_id = $invoices[0]["provider_id"];
        $this->getCertificate();
        $this->lot = $lot;
        $this->idLotRps = $this->genNumberLoteRps();
    }

    abstract protected function genXmlEnviarLoteRps();
    abstract public function transmitLotRps();
    abstract public function consultLotRps();

    protected function signXmlEnviarLoteRps($tags, $assinatura = "") {

		$domXml = new \DOMDocument("1.0", "UTF-8");
        $domXml->loadXML($this->xmlLoteRps, LIBXML_NOBLANKS);

        foreach($tags as $tag) {
            $nodes = $domXml->getElementsByTagName($tag);
            foreach ($nodes as $node) {
                $root = $node->parentNode;
                $id = trim($node->getAttribute("Id"));
                $dados = $node->C14N(false, false, null, null);
                $hashValue = hash("sha1", $dados, true);
                $digValue = base64_encode($hashValue);
    
                $signature = $domXml->createElement("Signature");
                $root->appendChild($signature);
                $signature->setAttribute("xmlns", "http://www.w3.org/2000/09/xmldsig#");
                $signature->setAttribute("Id", "Ass_".$id);
    
                $signedInfo = $domXml->createElement("SignedInfo");
                $signature->appendChild($signedInfo);
    
                $novaTag = $domXml->createElement("CanonicalizationMethod");
                $signedInfo->appendChild($novaTag);
                $novaTag->setAttribute("Algorithm", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315");
    
                $novaTag = $domXml->createElement("SignatureMethod");
                $signedInfo->appendChild($novaTag);
                $novaTag->setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#rsa-sha1");
    
                $reference = $domXml->createElement("Reference");
                $signedInfo->appendChild($reference);
                $reference->setAttribute("URI", "#".$id);
    
                $transforms = $domXml->createElement("Transforms");
                $reference->appendChild($transforms);
    
                $novaTag = $domXml->createElement("Transform");
                $transforms->appendChild($novaTag);
                $novaTag->setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#enveloped-signature");
    
                $novaTag = $domXml->createElement("Transform");
                $transforms->appendChild($novaTag);
                $novaTag->setAttribute("Algorithm", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315");
    
                $novaTag = $domXml->createElement("DigestMethod");
                $reference->appendChild($novaTag);
                $novaTag->setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#sha1");
    
                $novaTag = $domXml->createElement("DigestValue", $digValue);
                $reference->appendChild($novaTag);
    
                $dados = $signedInfo->C14N(false, false, null, null);
    
                openssl_sign($dados, $assinatura, $this->certificate->privateKey);
                $signatureValue = base64_encode($assinatura);
    
    
                $novaTag = $domXml->createElement("SignatureValue", $signatureValue);
                $signature->appendChild($novaTag);
    
                $keyInfo = $domXml->createElement("KeyInfo");
                $signature->appendChild($keyInfo);
    
                $X509Data = $domXml->createElement("X509Data");
                $keyInfo->appendChild($X509Data);
    
                $novaTag = $domXml->createElement("X509Certificate", $this->getPublicKey($this->certificate->publicKey));
                $X509Data->appendChild($novaTag);
            }
            $this->xmlLoteRps = $domXml->saveXml();
        }

    }

	private function getPublicKey($key) {
        $data = "";
        $arCert = explode("\n", $key);
        foreach ($arCert as $curData) {
            //remove a tag de inicio e fim do certificado
            if (strncmp($curData, "-----BEGIN CERTIFICATE", 22) != 0 &&
                    strncmp($curData, "-----END CERTIFICATE", 20) != 0 ) {
                //carrega o resultado numa string
                $data .= trim($curData);
            }
        }
        return $data;
    }


    private function getCertificate() {
        
        $company = Company::where('id', '=', $this->provider_id)->get();
        
        if(!isset($company[0])) throw new \Exception("Empresa da nota fiscal não encontrada.");

        $company = $company[0];

        $certificate = array(
            "file" => ($company["certify_data"]) ? base64_decode($company["certify_data"]) : '',
            "password" => $company["certify_password"]
        );

        if(!$certificate["file"]) throw new \Exception("Certificado não encontrado.");

        $this->certificate_data = $certificate["file"];

        $this->password = $certificate["password"];

        $certificate = Certificate::readPfx($certificate["file"], $certificate["password"]);

        $this->certificate = $certificate;
    } 

    private function genNumberLoteRps(){
        $key = "LOTE_".$this->provider_id;
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

    public function getCodCityIbge() {
        return $this->cod_city_ibge;
    }

    public function getCodCitySiafi() {
        return $this->cod_city_siafi;
    }

    protected function removerTagsVazias(\DOMDocument $xml) {
        $xpath = new \DOMXPath($xml);
        foreach($xpath->query('//*[not(node())]') as $node) {
            if (!$node->hasAttributes()) {
                $node->parentNode->removeChild($node);
            }
        }
        return $xml;
    }

}
