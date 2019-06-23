import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { DatePicker, Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";

import JlDate from "core/_input/date";

const RangePicker = DatePicker.RangePicker;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textFieldReadOnly: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#b9b7b74f'
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.client
    };

    this.setCepFields = this.setCepFields.bind(this);
  }

  isReadOnly(mode, readOnlyOnEdit) {
    return (mode == "view" || (mode == "edit" && readOnlyOnEdit));
  }

  save = () => {
    this.props.onSave(this.state, this.props.mode);
  };

  delete = () => {
    this.props.onDelete(this.state);
  }

  renderButtons(mode) {
    if(mode == 'view') {
        return (<div className="center-actions">
            <Button shape="circle" type="primary" icon="form" size="large" onClick={this.props.onEdit}></Button>
            <Button shape="circle" type="primary" icon="delete" size="large" onClick={this.delete}></Button>
        </div>);
    }
    else if(this.props.mode == "edit" || this.props.mode == "new") {
      return (
        <div className="center-actions">
          <Button
              shape="circle"
              size="large"
              type="primary"
              icon="close"
              onClick={this.props.view}
          />
          <Button
            shape="circle"
            size="large"
            type="primary"
            icon="check"
            onClick={this.save}
          />
        </div>
      );
    } 
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.mode == "view" || nextProps.mode == "new") 
      && nextProps.mode != this.props.mode
    ) {
      this.setState({
        ...nextProps.client
      });
    }
  }

  onChangeCep = name => async event => {
    if (event.target.value.replace("-", "").replace(/_/g, "").length == 8) {
      this.setCepFields(event.target.value.replace("-", ""));
    } else {
      this.clearCepFields();
    }
    this.setState({ [name]: event.target.value });
  };

  clearCepFields() {
    this.setState({ city: "" });
    this.setState({ state: "" });
    this.setState({ address: "" });
    this.setState({ address_district: "" });
  }

  setCepFields = async cep => {
    this.props.callLoading(true);
    try {
      const response = await fetch(`http://api.postmon.com.br/v1/cep/${cep}`);
      const json = await response.json();
      this.setState({ city: json.cidade });
      this.setState({ state: json.estado });
      this.setState({ address: json.logradouro });
      this.setState({ address_district: json.bairro });

    }
    catch(e) {
      this.clearCepFields();
    }
    finally {
      this.props.callLoading(false);
    }

  };

  render() {
    const { classes } = this.props;
    const { errors }  = this.props;


    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.container}
        onSubmit={this.save}
        style={{height:'100%'}}
      >
        <Spin
          spinning={this.props.loading}
          tip="Carregando..."
          wrapperClassName="spin"
        >
          <Row gutter={8}>
            <Col className="gutter-row" md={12}>
              <JlInput
                id="standard-address"
                label="CPF/CNPJ"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.inscription}
                fullWidth
                extraProps={{ required: true, error: !!(errors.inscription)}}
                onChange={this.handleChange("inscription")}
                margin="normal"
                variant="outlined"
                mask="999.999.999-99"
              />
            </Col>
            <Col className="gutter-row" md={12}>
              <JlInput
                id="standard-name"
                label="Nome"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.name}
                fullWidth
                extraProps={{ required: true, error: !!(errors.name) }}
                onChange={this.handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" span={12}>
              <JlInput
                id="standard-phone_contact"
                label="Celular"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.phone_contact}
                fullWidth
                extraProps={{ required: true, error: !!(errors.phone_contact) }}
                onChange={this.handleChange("phone_contact")}
                margin="normal"
                variant="outlined"
                mask="(99) 99999-9999"
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <JlInput
                id="standard-home_contact"
                label="Telefone de Contato"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.home_contact}
                fullWidth
                extraProps={{ required: true, error: !!(errors.home_contact) }}
                onChange={this.handleChange("home_contact")}
                margin="normal"
                variant="outlined"
                mask="(99) 9999-9999"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={24} xs={24}>
              <JlInput
                id="standard-email"
                label="Email Sindico"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.syndic_email}
                fullWidth
                extraProps={{ required: true, error: !!(errors.syndic_email) }}
                onChange={this.handleChange("syndic_email")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-email"
                label="Apartamento do Sindico"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.syndic_ap}
                fullWidth
                extraProps={{ required: true, error: !!(errors.syndic_ap) }}
                onChange={this.handleChange("syndic_ap")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlDate
                id="standard-syndic_birthday"
                label="Aniversario do Sindico"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.syndic_birthday}
                fullWidth
                extraProps={{ required: true, error: !!(errors.syndic_birthday) }}
                onChange={this.handleChange("syndic_birthday")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" span={8}>
              <JlInput
                id="standard-cond_blocks"
                label="Nº de Blocos"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.cond_blocks}
                fullWidth
                extraProps={{ required: true, error: !!(errors.cond_blocks) }}
                onChange={this.handleChange("cond_blocks")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" span={8}>
              <JlInput
                id="standard-cond_floors"
                label="Nº de Andares"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.cond_floors}
                fullWidth
                extraProps={{ required: true, error: !!(errors.cond_floors) }}
                onChange={this.handleChange("cond_floors")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" span={8}>
              <JlInput
                id="standard-cond_aps"
                label="Nº de Apartamentos"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.cond_aps}
                fullWidth
                extraProps={{ required: true, error: !!(errors.cond_aps) }}
                onChange={this.handleChange("cond_aps")}
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
                value={this.state.cep}
                disabled={this.isReadOnly(this.props.mode, false)}
                fullWidth
                extraProps={{ required: true, error: !!(errors.cep) }}
                onChange={this.onChangeCep("cep")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-state"
                label="Estado"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                value={this.state.state}
                disabled={true}
                fullWidth
                extraProps={{ required: true }}
                onChange={this.handleChange("state")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-city"
                label="Cidade"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                value={this.state.city}
                disabled={true}
                fullWidth
                extraProps={{ required: true }}
                onChange={this.handleChange("city")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="company-address_district"
                label="Bairro"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                value={this.state.address_district}
                disabled={true}
                fullWidth
                extraProps={{ required: true }}
                onChange={this.handleChange("address_district")}
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
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                value={this.state.address}
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
                value={this.state.address_number}
                disabled={this.isReadOnly(this.props.mode, false)}
                fullWidth
                extraProps={{ required: true }}
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
                value={this.state.address_complement}
                disabled={this.isReadOnly(this.props.mode, false)}
                fullWidth
                onChange={this.handleChange("address_complement")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
        </Spin>
        {this.renderButtons(this.props.mode)}
      </form>
    );
  }
}

export default withStyles(styles)(ClientForm);