import React, { Component } from "react";
import { Row, Col, Button, Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlSelect from "core/_input/select";
import axios from "axios";
import { async } from "q";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class CompanyForm extends Component {
  constructor(props) {
    super(props);

    if (props.company) {
      this.state = this.props.company;
    } else {
      this.state = {
        validEmail: "",
        cpf: null,
        address: "",
        syndic_email: "",
        name: "Pedro",
        valid: false
      };
    }

    this.onSelect = this.onSelect.bind(this);
  }

  isReadOnly(mode, readOnlyOnEdit) {
    if (mode == "view" || (mode == "edit" && readOnlyOnEdit)) {
      return true;
    } else return false;
  }

  save = () => {
    this.props.onSave(this.props.company, this.props.mode);
  };

  getTextItem(item) {
    return item.code + " | " + item.description + " | " + item.inscription;
  }

  handleChange = name => event => {
    this.props.company[name] = event.target.value;
    this.setState({ [name]: event.target.value });
  };

  onSelect(event, name) {
    if (event) {
      this.props.company[name] = event.target.value;
      this.setState({ [name]: event.target.value });
    }
  }

  onChangeCep = name => async event => {
    if (event.target.value.replace("-", "").replace(/_/g, "").length == 8) {
      this.setCepFields(event.target.value.replace("-", ""));
    }
    else {
      this.clearCepFields();
    }
    this.props.company.cep = event.target.value;
    this.setState({ [name]: event.target.value });
  };

  clearCepFields() {
    this.props.company.city = '';
    this.props.company.state = '';
    this.props.company.address = '';
    this.props.company.address_neighborhood = '';
    this.setState({ city: '' });
    this.setState({ state: '' });
    this.setState({ address: '' });
    this.setState({ address_neighborhood: '' });
  }

  setCepFields = async cep => {
    this.props.callLoading(true);
    const response = await fetch(`http://api.postmon.com.br/v1/cep/${cep}`);
    const json = await response.json();
    this.props.company.city = json.cidade;
    this.props.company.state = json.estado;
    this.props.company.address = json.logradouro;
    this.props.company.address_neighborhood = json.bairro;
    this.setState({ city: json.localidade });
    this.setState({ state: json.uf });
    this.setState({ address: json.logradouro });
    this.setState({ address_neighborhood: json.bairro });
    this.props.callLoading(false);
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.container}
        onSubmit={this.save}
      >
        <Spin
          spinning={this.props.loading}
          tip="Carregando..."
          wrapperClassName="spin"
        >
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-inscription"
                label="Inscrição"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.props.company.inscription}
                extraProps={{required: true}}
                fullWidth
                onChange={this.handleChange("inscription")}
                margin="normal"
                variant="outlined"
                mask="99.999.999/9999-99"
                type="float"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-name"
                label="Nome"
                className={classes.textField}
                value={this.props.company.name}
                extraProps={{required: true}}
                disabled={this.isReadOnly(this.props.mode, true)}
                fullWidth
                onChange={this.handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-municipal_inscription"
                label="Inscrição Municipal"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.municipal_inscription}
                extraProps={{required: true}}
                fullWidth
                onChange={this.handleChange("municipal_inscription")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlSelect
                id="company-taxation_regime"
                name="taxation_regime"
                label="Regime de Tributação"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.taxation_regime}
                dataSource={[
                  {
                    key: 1,
                    description: "Microempresa Municipal",
                    label: "Microempresa Municipal"
                  },
                  { key: 2, description: "Estimativa", label: "Estimativa" },
                  {
                    key: 3,
                    description: "Sociedade de Profissionais",
                    label: "Sociedade de Profissionais"
                  },
                  { key: 4, description: "Cooperativa", label: "Cooperativa" },
                  {
                    key: 5,
                    description: "MEI - Simples Nacional",
                    label: "MEI - Simples Nacional"
                  },
                  {
                    key: 6,
                    description: "ME EPP - Simples Nacional",
                    label: "ME EPP - Simples Nacional"
                  }
                ]}
                fullWidth
                onSelect={this.onSelect}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlSelect
                id="company-national_simple"
                name="national_simple"
                label="Simples Nacional"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.national_simple}
                dataSource={[
                  { key: 0, description: "Não", label: "Não" },
                  { key: 1, description: "Sim", label: "Sim" }
                ]}
                fullWidth
                onSelect={this.onSelect}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlSelect
                id="company-cultural_promoter"
                name="cultural_promoter"
                label="Incentivador Cultural"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.cultural_promoter}
                dataSource={[
                  { key: 0, description: "Não", label: "Não" },
                  { key: 1, description: "Sim", label: "Sim" }
                ]}
                fullWidth
                onSelect={this.onSelect}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-cep"
                name="cep"
                label="CEP"
                mask="99999-999"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                fullWidth
                onChange={this.onChangeCep("cep")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-state"
                label="Estado"
                className={classes.textField}
                value={this.props.company.state}
                disabled={true}
                fullWidth
                onChange={this.handleChange("state")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-city"
                label="Cidade"
                className={classes.textField}
                value={this.props.company.city}
                disabled={true}
                fullWidth
                onChange={this.handleChange("city")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-address_neighborhood"
                label="Bairro"
                className={classes.textField}
                value={this.props.company.address_neighborhood}
                disabled={true}
                fullWidth
                onChange={this.handleChange("address_neighborhood")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-city"
                label="Logradouro"
                className={classes.textField}
                value={this.props.company.address}
                disabled={true}
                fullWidth
                onChange={this.handleChange("address")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={4} sm={12} xs={12}>
              <JlInput
                id="company-address_number"
                label="Número"
                className={classes.textField}
                value={this.props.company.address_number}
                disabled={this.isReadOnly(this.props.mode, false)}
                fullWidth
                extraProps={{required: true}}
                onChange={this.handleChange("address_number")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={8} sm={12} xs={12}>
              <JlInput
                id="company-address_complement"
                label="Complemento"
                className={classes.textField}
                value={this.props.company.address_complement}
                disabled={this.isReadOnly(this.props.mode, false)}
                fullWidth
                onChange={this.handleChange("address_complement")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
        </Spin>
        <div className="center-actions">
          <Button
            shape="circle"
            size="large"
            type="primary"
            icon="check"
            onClick={this.save}
          />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(CompanyForm);
