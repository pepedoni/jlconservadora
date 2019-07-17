<?php

namespace App\Http\Controllers\Invoice\BeloHorizonte;

use App\Http\Controllers\Invoice\InvoiceCity;

class InvoiceBeloHorizonte extends InvoiceCity
{
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
                        <InfRps Id="'.''.'">
                            <IdentificacaoRps>
                                <Numero>'.''.'</Numero>
                                <Serie>'.''.'</Serie>
                                <Tipo>'.''.'</Tipo>
                            </IdentificacaoRps>
                            <DataEmissao>'.$date->format('Y-m-d').'T'.$date->format('h:i:s').'</DataEmissao>
                            <NaturezaOperacao>'.$this->company['nature_operation'].'</NaturezaOperacao>
                            <RegimeEspecialTributacao>'.$this->company['taxation_regime'].'</RegimeEspecialTributacao>
                            <OptanteSimplesNacional>'.$this->company['national_simple'].'</OptanteSimplesNacional>
                            <IncentivadorCultural>'.$this->company['national_simple'].'</IncentivadorCultural>
                            <Status>'.''.'</Status>
                            <Servico>
                                <Valores>
                                    <ValorServicos>'.''.'</ValorServicos>
                                    <ValorDeducoes>'.''.'</ValorDeducoes>
                                    <ValorPis>'.''.'</ValorPis>
                                    <ValorCofins>'.''.'</ValorCofins>
                                    <ValorInss>'.''.'</ValorInss>
                                    <ValorIr>'.''.'</ValorIr>
                                    <ValorCsll>'.''.'</ValorCsll>
                                    <IssRetido>'.''.'</IssRetido>
                                    <ValorIss>'.''.'</ValorIss>
                                    <ValorIssRetido>'.''.'</ValorIssRetido>
                                    <OutrasRetencoes>'.''.'</OutrasRetencoes>
                                    <BaseCalculo>'.''.'</BaseCalculo>
                                    <Aliquota>'.''.'</Aliquota>
                                    <ValorLiquidoNfse>'.''.'</ValorLiquidoNfse>
                                    <DescontoIncondicionado>'.''.'</DescontoIncondicionado>
                                    <DescontoCondicionado>'.''.'</DescontoCondicionado>
                                </Valores>
                                <ItemListaServico>'.''.'</ItemListaServico>
                                <CodigoCnae>'.''.'</CodigoCnae>
                                <CodigoTributacaoMunicipio>'.''.'</CodigoTributacaoMunicipio>
                                <Discriminacao>'.$this->discrimnation.'</Discriminacao>
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
}
