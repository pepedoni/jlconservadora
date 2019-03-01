import React, { Component } from "react";
import { Row, Col, Button, Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlSelect from "core/_input/select";

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
    if(event) {
      this.props.company[name] = event.target.value;
      this.setState({ [name]: event.target.value });
    }
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
                onSelect={this.onSelect()}
                margin="normal"
                variant="outlined"
                select={true}
              />
            </Col>
          </Row>          
          <Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlSelect
                id="company-taxation_regime"
                name="taxation_regime"
                label="Regime de Tributação"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.taxation_regime}
                dataSource={
                  [
                    {key: 1, description: 'Microempresa Municipal', label: 'Microempresa Municipal'},
                    {key: 2, description: 'Estimativa', label: 'Estimativa'},
                    {key: 3, description: 'Sociedade de Profissionais', label: 'Sociedade de Profissionais'},
                    {key: 4, description: 'Cooperativa', label: 'Cooperativa'},
                    {key: 5, description: 'MEI - Simples Nacional', label: 'MEI - Simples Nacional'},
                    {key: 6, description: 'ME EPP - Simples Nacional', label: 'ME EPP - Simples Nacional'}
                  ]
                }
                fullWidth
                onSelect={this.onSelect}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlSelect
                id="company-national_simple"
                name="national_simple"
                label="Simples Nacional"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.national_simple}
                dataSource={
                  [
                    {key: 0, description: 'Não', label: 'Não'},
                    {key: 1, description: 'Sim', label: 'Sim'},
                  ]
                }
                fullWidth
                onSelect={this.onSelect}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row><Row gutter={8}>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlSelect
                id="company-cultural_promoter"
                name="cultural_promoter"
                label="Simples Nacional"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.props.company.cultural_promoter}
                dataSource={
                  [
                    {key: 0, description: 'Não', label: 'Não'},
                    {key: 1, description: 'Sim', label: 'Sim'},
                  ]
                }
                fullWidth
                onSelect={this.onSelect}
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
