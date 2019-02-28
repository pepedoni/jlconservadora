import React, { Component } from "react";
import { Row, Col, Button, Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";

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

  handleSearch() {
    console.log("teste");
  }

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
                fullWidth
                onChange={this.handleChange("municipal_inscription")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-nature_operation"
                label="Natureza da Operação"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.nature_operation}
                fullWidth
                onChange={this.handleChange("nature_operation")}
                margin="normal"
                variant="outlined"
                select={true}
              />
            </Col>
          </Row>          
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-taxation_regime"
                label="Regime de Tributação"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.taxation_regime}
                fullWidth
                onChange={this.handleChange("taxation_regime")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-national_simple"
                label="Simples Nacional"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.national_simple}
                fullWidth
                onChange={this.handleChange("national_simple")}
                margin="normal"
                variant="outlined"
                select={true}
              />
            </Col>
          </Row><Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="company-cultural_promoter"
                label="Incentivador Cultural"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.cultural_promoter}
                fullWidth
                onChange={this.handleChange("cultural_promoter")}
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
