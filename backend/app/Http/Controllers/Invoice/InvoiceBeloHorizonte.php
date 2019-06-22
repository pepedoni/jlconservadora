<?php

namespace App\Http\Controllers\Invoice;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvoiceBeloHorizonte extends Controller
{
    
    private $invoices = array();
    private $listaRps = array();
    private $xmlEnviarLoteRps;
    private $idLote;
    private $inscricaoPrestador;
    private $inscricaoMunicipalPrestador;

    public function __construct($invoices) {
        $this->invoices = $invoices;
    }

    public function gerarListaRps() {
        foreach($this->invoices as $invoice) {
            $this->gerarRps($invoice);
        }
    }
    
    public function gerarRps($invoice) {
        $rps = '
            <Rps xmlns="http://www.abrasf.org.br/nfse.xsd">
            <InfRps Id="'.$this->IdRps.'">
                <IdentificacaoRps>
                    <Numero>'.$this->NumeroRps.'</Numero>
                    <Serie>'.$this->SerieRps.'</Serie>
                    <Tipo>'.$this->TipoRps.'</Tipo>
                </IdentificacaoRps>
                <DataEmissao>'.$this->DataEmissao.'</DataEmissao>
                <NaturezaOperacao>'.$this->NaturezaOperacao.'</NaturezaOperacao>
                <RegimeEspecialTributacao>'.$this->RegimeEspecialTributacao.'</RegimeEspecialTributacao>
                <OptanteSimplesNacional>'.$this->OptanteSimplesNacional.'</OptanteSimplesNacional>
                <IncentivadorCultural>'.$this->IncentivadorCultural.'</IncentivadorCultural>
                <Status>'.$this->StatusRps.'</Status>
                <Servico>
                    <Valores>
                        <ValorServicos>'.Util::formatarNumero($this->ValorServicos).'</ValorServicos>
                        <ValorDeducoes>'.Util::formatarNumero($this->ValorDeducoes).'</ValorDeducoes>
                        <ValorPis>'.Util::formatarNumero($this->ValorPis).'</ValorPis>
                        <ValorCofins>'.Util::formatarNumero($this->ValorCofins).'</ValorCofins>
                        <ValorInss>'.Util::formatarNumero($this->ValorInss).'</ValorInss>
                        <ValorIr>'.Util::formatarNumero($this->ValorIr).'</ValorIr>
                        <ValorCsll>'.Util::formatarNumero($this->ValorCsll).'</ValorCsll>
                        <IssRetido>'.$this->IssRetido.'</IssRetido>
                        <ValorIss>'.Util::formatarNumero($this->ValorIss).'</ValorIss>
                        <ValorIssRetido>'.Util::formatarNumero($this->ValorIssRetido).'</ValorIssRetido>
                        <OutrasRetencoes>'.Util::formatarNumero($this->OutrasRetencoes).'</OutrasRetencoes>
                        <BaseCalculo>'.Util::formatarNumero($this->BaseCalculo).'</BaseCalculo>
                        <Aliquota>'.$this->Aliquota.'</Aliquota>
                        <ValorLiquidoNfse>'.Util::formatarNumero($this->ValorLiquidoNfse).'</ValorLiquidoNfse>
                        <DescontoIncondicionado>'.Util::formatarNumero($this->DescontoIncondicionado).'</DescontoIncondicionado>
                        <DescontoCondicionado>'.Util::formatarNumero($this->DescontoCondicionado).'</DescontoCondicionado>
                    </Valores>
                    <ItemListaServico>'.$this->ItemListaServico.'</ItemListaServico>
                    <CodigoCnae>'.$this->CodigoCnae.'</CodigoCnae>
                    <CodigoTributacaoMunicipio>'.$this->CodigoTributacaoMunicipio.'</CodigoTributacaoMunicipio>
                    <Discriminacao>'.$this->Discriminacao.'</Discriminacao>
                    <CodigoMunicipio>'.$this->CodigoMunicipioPrestador.'</CodigoMunicipio>
                </Servico>
                <Prestador>
                    <Cnpj>'.$this->InscricaoPrestador.'</Cnpj>
                    <InscricaoMunicipal>'.$this->InscricaoMunicipalPrestador.'</InscricaoMunicipal>
                </Prestador>
                <Tomador>
                    <IdentificacaoTomador>
                        <CpfCnpj>
                            ';

                        if (strlen($this->InscricaoTomador) == 11) {
                            $xmlRps .= '<Cpf>'.$this->InscricaoTomador.'</Cpf>';
                        }
                        else {
                            $xmlRps .= '<Cnpj>'.$this->InscricaoTomador.'</Cnpj>';
                        }

                        $xmlRps .= '
                        </CpfCnpj>
                    <InscricaoMunicipal>'.$this->InscricaoMunicipalTomador.'</InscricaoMunicipal>
                    </IdentificacaoTomador>
                    <RazaoSocial>'.$this->RazaoSocialTomador.'</RazaoSocial>
                    <Endereco>
                        <Endereco>'.$this->Endereco.'</Endereco>
                        <Numero>'.$this->Numero.'</Numero>
                        <Complemento>'.$this->Complemento.'</Complemento>
                        <Bairro>'.$this->Bairro.'</Bairro>
                        <CodigoMunicipio>'.$this->CodigoMunicipioTomador.'</CodigoMunicipio>
                        <Uf>'.$this->Uf.'</Uf>
                        <Cep>'.$this->Cep.'</Cep>
                    </Endereco>
                    <Contato>
                        <Telefone>'.$this->Telefone.'</Telefone>
                        <Email>'.$this->Email.'</Email>
                    </Contato>
                </Tomador>
            </InfRps>
        </Rps>';
    }

    private function gerarXmlEnviarLoteRps() {
		$this->xmlEnviarLoteRps = '
		<EnviarLoteRpsEnvio xmlns="http://www.abrasf.org.br/nfse.xsd">
			<LoteRps Id="'.$this->idLote.'" xmlns="http://www.abrasf.org.br/nfse.xsd" versao="1.00">
				<NumeroLote>'.$this->numeroLote.'</NumeroLote>
				<Cnpj>'.$this->inscricaoPrestador.'</Cnpj>
				<InscricaoMunicipal>'.$this->inscricaoMunicipalPrestador.'</InscricaoMunicipal>
				<QuantidadeRps>'.count($this->listaRps).'</QuantidadeRps>
				<ListaRps>';

				foreach ($this->listaRps as $rps) {
                    $this->xmlEnviarLoteRps .= "\n" . $rps;
                }

                $this->xmlEnviarLoteRps .= '
                </ListaRps>
			</LoteRps>
		</EnviarLoteRpsEnvio>';
	}
}
