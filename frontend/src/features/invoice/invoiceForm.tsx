import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlDate from "core/_input/date";


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

class InvoiceForm extends Component {
  constructor(props) {
    super(props);

    if (props.invoice) {
      this.state = this.props.invoice;
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
  }

  isReadOnly(mode, readOnlyOnEdit) {
    if (mode == "view" || (mode == "edit" && readOnlyOnEdit)) {
      return true;
    } else return false;
  }

  save = () => {
    this.props.onSave(this.props.invoice, this.props.mode);
  };

  handleChange = name => event => {
    this.props.invoice[name] = event.target.value;
    this.setState({ [name]: event.target.value });
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
            <Col className="gutter-row" md={12}>
              <JlInput
                id="standard-address"
                label="CPF/CNPJ"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.props.invoice.cnpj}
                fullWidth
                onChange={this.handleChange("cnpj")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12}>
              <JlInput
                id="standard-controlled"
                label="Nome"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.props.invoice.name}
                fullWidth
                onChange={this.handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={18} xs={18}>
              <JlInput
                id="standard-address"
                label="Endereço"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.props.invoice.address}
                fullWidth
                onChange={this.handleChange("address")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={6} xs={6}>
              <JlInput
                id="standard-address_number"
                label="Número"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.props.invoice.address_number}
                fullWidth
                onChange={this.handleChange("address_number")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={24} xs={24}>
              <JlInput
                id="standard-address_complement"
                label="Complemento"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.props.invoice.address_complement}
                fullWidth
                onChange={this.handleChange("address_complement")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <JlInput
                id="standard-phone_contact"
                label="Celular"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.invoice.phone_contact}
                fullWidth
                onChange={this.handleChange("phone_contact")}
                margin="normal"
                variant="outlined"
                mask="(99) 99999-9999"
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <JlInput
                id="standard-commerce_contact"
                label="Telefone Comercial"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.invoice.commerce_contact}
                fullWidth
                onChange={this.handleChange("commerce_contact")}
                margin="normal"
                variant="outlined"
                mask="(99) 9999-9999"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={24} xs={24}>
              <JlInput
                id="standard-email"
                label="Email Sindico"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.invoice.syndic_email}
                fullWidth
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
                value={this.props.invoice.syndic_ap}
                fullWidth
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
                value={this.props.invoice.syndic_birthday}
                fullWidth
                onChange={this.handleChange("syndic_birthday")}
                margin="normal"
                variant="outlined"
              />
            </Col>

            <Col className="gutter-row" span={8}>
              <JlInput
                id="standard-cond_blocks"
                label="Nº de Blocos"
                className={classes.textField}
                extraProps={{date: "true", required: true}}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.invoice.cond_blocks}
                fullWidth
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
                value={this.props.invoice.cond_floors}
                fullWidth
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
                value={this.props.invoice.cond_aps}
                fullWidth
                onChange={this.handleChange("cond_aps")}
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

export default withStyles(styles)(InvoiceForm);
