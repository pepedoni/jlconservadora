<?php

namespace App\Http\Controllers\Invoice\BeloHorizonte;

use App\Http\Controllers\Invoice\InvoiceCity;

class InvoiceBeloHorizonte extends InvoiceCity
{
    protected $cod_city_ibge  = '3106200';
    protected $cod_city_siafi = '4123'; 

    public function getRps() {

        $client_inscription = str_replace(array(".", "/", "-"), "", $this->invoice["client_inscription"]);
        $client_inscription_municipal = str_replace(array(".", "/", "-"), "", $this->client["client_inscription_municipal"]);
    
        $provider_inscription = str_replace(array(".", "/", "-"), "", $this->invoice["provider_inscription"]);
        $provider_inscription_municipal = str_replace(array(".", "/", "-"), "", $this->invoice["provider_inscription_municipal"]);

        if($this->client["home_contact"]) {
            $client_phone = str_replace(array("(", ")", "-"), "", $this->client["home_contact"]);
        }
        else {
            $client_phone = str_replace(array("(", ")", "-"), "", $this->client["phone_contact"]);
        }

        $date = new \DateTime();
            
        $xmlRps =  '
                    <Rps xmlns="http://www.abrasf.org.br/nfse.xsd">
                        <InfRps Id="'.$this->idRps.'">
                            <IdentificacaoRps>
                                <Numero>'.str_pad($this->number, 0, 15).'</Numero>
                                <Serie>'.''.'</Serie>
                                <Tipo>1</Tipo>
                            </IdentificacaoRps>
                            <DataEmissao>'.$date->format('Y-m-d').'T'.$date->format('h:i:s').'</DataEmissao>
                            <NaturezaOperacao>'.$this->getNatureOperation().'</NaturezaOperacao>
                            <RegimeEspecialTributacao>'.$this->company['taxation_regime'].'</RegimeEspecialTributacao>
                            <OptanteSimplesNacional>'.$this->company['national_simple'].'</OptanteSimplesNacional>
                            <IncentivadorCultural>'.$this->company['national_simple'].'</IncentivadorCultural>
                            <Status>1</Status>
                            <Servico>
                                <Valores>
                                    <ValorServicos>'.$this->service["value"].'</ValorServicos>
                                    <ValorDeducoes>'.$this->valueDeductions.'</ValorDeducoes>
                                    <ValorPis>'.$this->valuePis.'</ValorPis>
                                    <ValorCofins>'.$this->valueCofins.'</ValorCofins>
                                    <ValorInss>'.$this->valueInss.'</ValorInss>
                                    <ValorIr>'.$this->valueIr.'</ValorIr>
                                    <ValorCsll>'.$this->valueCsll.'</ValorCsll>
                                    <IssRetido>'.$this->service["iss_retain"].'</IssRetido>
                                    <ValorIss>'.$this->formatNumber($this->service["value_iss"]).'</ValorIss>
                                    <ValorIssRetido>'.$this->formatNumber($this->invoice["iss_retain"] == 1 ? $this->service["value_iss"] : 0).'</ValorIssRetido>
                                    <OutrasRetencoes>'.$this->formatNumber(0).'</OutrasRetencoes>
                                    <BaseCalculo>'.$this->service["value"].'</BaseCalculo>
                                    <Aliquota>'.$this->formatNumber($this->service["aliquot_iss"]).'</Aliquota>
                                    <ValorLiquidoNfse>'.$this->liquidValue.'</ValorLiquidoNfse>
                                    <DescontoIncondicionado>'.''.'</DescontoIncondicionado>
                                    <DescontoCondicionado>'.''.'</DescontoCondicionado>
                                </Valores>
                                <ItemListaServico>'.$this->system_service["list_item"].'</ItemListaServico>
                                <CodigoCnae>'.''.'</CodigoCnae>
                                <CodigoTributacaoMunicipio>'.''.'</CodigoTributacaoMunicipio>
                                <Discriminacao>'.substr($this->service["description"], 0, 2000).'</Discriminacao>
                                <CodigoMunicipio>'.$this->invoice["provision_city_ibge"].'</CodigoMunicipio>
                            </Servico>
                            <Prestador>
                                <Cnpj>'.$provider_inscription.'</Cnpj>
                                <InscricaoMunicipal>'.$provider_inscription_municipal.'</InscricaoMunicipal>
                            </Prestador>
                            <Tomador>
                                <IdentificacaoTomador>
                                    <CpfCnpj>
                                        ';

                                    if (strlen($client_inscription) == 11) {
                                        $xmlRps .= '<Cpf>'.$client_inscription.'</Cpf>';
                                    }
                                    else {
                                        $xmlRps .= '<Cnpj>'.$client_inscription.'</Cnpj>';
                                    }

                                    $xmlRps .= '
                                    </CpfCnpj>
                                <InscricaoMunicipal>'.$client_inscription_municipal.'</InscricaoMunicipal>
                                </IdentificacaoTomador>
                                <RazaoSocial>'.$this->invoice["client_name"].'</RazaoSocial>
                                <Endereco>
                                    <Endereco>'.$this->client['address'].'</Endereco>
                                    <Numero>'.$this->client['address_number'].'</Numero>
                                    <Complemento>'.$this->client['address_complement'].'</Complemento>
                                    <Bairro>'.$this->client['address_district'].'</Bairro>
                                    <CodigoMunicipio>'.''.'</CodigoMunicipio>
                                    <Uf>'.substr($this->client['cep'], 0, 2).'</Uf>
                                    <Cep>'.str_replace("-", "", $this->client["cep"]).'</Cep>
                                </Endereco>
                                <Contato>
                                    <Telefone>'.$client_phone.'</Telefone>
                                    <Email>'.$this->client["syndic_email"].'</Email>
                                </Contato>
                            </Tomador>
                        </InfRps>
                    </Rps>';

        return $xmlRps;
    }

    private function getNatureOperation() {
        if($this->invoice["provision_city_ibge"] == $this->cod_city_ibge) return 1;
        else return 2;
    }
} 
