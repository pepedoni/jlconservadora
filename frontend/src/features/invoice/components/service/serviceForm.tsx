import React, { Component } from "react";
import { Row, Col, Icon, Button, Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlAutoComplete from "core/_input/autoComplete";
import states from "../../states";

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

class ServiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.service
    };

    this.handleChangeAutoComplete = this.handleChangeAutoComplete.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

  }

  isReadOnly(mode, readOnlyOnEdit) {
    if (mode == "view" || (mode == "edit" && readOnlyOnEdit)) {
      return true;
    } else return false;
  }

  save = () => {
    let invoiceService = this.state;
    invoiceService.invoice_id = this.props.invoice_id;
    this.props.onSave(this.state, this.props.mode);
  };

  getTextItem(item) {
    return item.code + " | " + item.description + " | " + item.aliquot;
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.mode == "view" || nextProps.mode == "new") &&
      nextProps.mode != this.props.mode
    ) {
      this.setState({
        ...nextProps.service
      });
    }
  }

  handleChangeAutoComplete = name => (event, { newValue }) => {

    this.setState({
        [name]: newValue,
    });
    
  };

  onSuggestionSelected = (outData) => (event, { suggestion}) =>  {
    for (var property in outData){
      this.setState({
        [property]: suggestion[outData[property]]
      });
    }
  }

  handleChangeValue = name => event => { 
    let value = event.target.value != "" ? parseFloat(event.target.value) : '';

    this.setState(
      {   
        ...this.state, 
        value: value,
        value_pis:    (value * ( parseFloat(this.state.aliquot_pis)     / 100 )).toFixed(2),
        value_cofins: (value * ( parseFloat(this.state.aliquot_cofins)  / 100 )).toFixed(2),
        value_csll:   (value * ( parseFloat(this.state.aliquot_csll)    / 100 )).toFixed(2),
        value_iss:    (value * ( parseFloat(this.state.aliquot_iss)     / 100 )).toFixed(2),
        value_inss:   (value * ( parseFloat(this.state.aliquot_inss)    / 100 )).toFixed(2)
      }
    );

  }

  handleChangeImposto = ( name, valueToChange ) => event => {

    let value = event.target.value;

    this.setState( 
      {
        ...this.state, 
        [name]: value,
        [valueToChange]: ( value * ( this.state.value     /  100 )).toFixed(2),
      }
    );
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  renderButtons() {
    if(this.props.mode == 'view') {
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
            icon="check"
            onClick={this.save}
          />
        </div>
      );
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
            <Col className="gutter-row" md={8}>
                <JlAutoComplete
                    id="standard-provider_inscription"
                    label="Nome do Serviço"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    value={this.state.name}
                    valueField="name"
                    fullWidth
                    filters={['name']}
                    route="services/getByName"
                    displayedFields={['name', 'list_item']}
                    outData={{
                        aliquot_iss:      'aliquot',
                        description:  'description',
                        list_item:    'list_item',
                        service_id:   'id'  
                    }}
                    onSuggestionSelected={this.onSuggestionSelected}
                    onChange={this.handleChangeAutoComplete('name')}
                    margin="normal"
                    variant="outlined"
                />
            </Col>
            <Col className="gutter-row" md={8}>
              <JlInput
                  id="standard-aliquot"
                  label="Item da Lista"
                  className={classes.textField}
                  disabled={true}
                  value={this.state.list_item}
                  fullWidth
                  onChange={this.handleChange("list_item")}
                  margin="normal"
                  variant="outlined"
                />
            </Col>
            <Col className="gutter-row" md={8}>
              <JlInput
                id="standard-aliquot"
                label="Valor do Serviço"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                startAdornment="R$"
                value={this.state.value}
                fullWidth
                onChange={this.handleChangeValue("value")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota ISS"
                className={classes.textField}
                disabled={true}
                endAdornment="%"
                value={this.state.aliquot_iss}
                fullWidth
                onChange={this.handleChange("aliquot_iss")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={12} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Valor ISS"
                className={classes.textField}
                disabled={true}
                startAdornment="R$"
                value={this.state.value_iss}
                fullWidth
                onChange={this.handleChange("value_iss")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota PIS"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.aliquot_pis}
                endAdornment="%"
                fullWidth
                onChange={this.handleChangeImposto("aliquot_pis", "value_pis")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Valor PIS"
                className={classes.textField}
                disabled={true}
                startAdornment="R$"
                value={this.state.value_pis}
                fullWidth
                onChange={this.handleChange("value_pis")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota Cofins"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.aliquot_cofins}
                endAdornment="%"
                fullWidth
                onChange={this.handleChangeImposto("aliquot_cofins", "value_cofins")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Valor Cofins"
                className={classes.textField}
                disabled={true}
                startAdornment="R$"
                value={this.state.value_cofins}
                fullWidth
                onChange={this.handleChange("value_cofins")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota INSS"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.aliquot_inss}
                endAdornment="%"
                fullWidth
                onChange={this.handleChangeImposto("aliquot_inss", "value_inss")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Valor Inss"
                className={classes.textField}
                disabled={true}
                startAdornment="R$"
                value={this.state.value_inss}
                fullWidth
                onChange={this.handleChange("value_inss")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota CSLL"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.aliquot_csll}
                endAdornment="%"
                fullWidth
                onChange={this.handleChangeImposto("aliquot_csll", "value_csll")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Valor CSLL"
                className={classes.textField}
                disabled={true}
                startAdornment="R$"
                value={this.state.value_csll}
                fullWidth
                onChange={this.handleChange("value_csll")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
            <Col className="gutter-row" md={24} sm={24} xs={24}>
              <JlInput
                id="standard-description"
                label="Descrição"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.description}
                fullWidth
                extraProps={{multiline: true}}
                onChange={this.handleChange("description")}
                margin="normal"
                variant="outlined"
                type="text"
                rows={3}
              />
            </Col>
          </Row>
        </Spin>
        {this.renderButtons()}
      </form>
    );
  }
}

export default withStyles(styles)(ServiceForm);
