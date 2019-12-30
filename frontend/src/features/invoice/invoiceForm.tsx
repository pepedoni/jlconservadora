import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlDate from "core/_input/date";
import JlAutoComplete from "core/_input/autoComplete";
import JlSelect from "core/_input/select";
import states from './states';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
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

class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    
    this.filteredCities = [];
    this.cities = [];

    this.state = {
      ...this.props.invoice
    };

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectState = this.onSelectState.bind(this);

    this.onSelectState({target: {value: 31}}, 'state');
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.mode == "view" || nextProps.mode == "new") &&
      nextProps.mode != this.props.mode
    ) {
      this.setState({
        ...nextProps.invoice
      });
      
    }
  }

  isReadOnly(mode, readOnlyOnEdit) {
    if (mode == "view" || (mode == "edit" && readOnlyOnEdit)) {
      return true;
    } else return false;
  }

  onSuggestionSelected = (outData) => (event, { suggestion}) =>  {
    for (var property in outData){
      this.setState({
        [property]: suggestion[outData[property]]
      });
    }
  }

  onSuggestionsFetchMunicipio = (event) => {

    if(this.filteredCities.length > 0) {
      this.filteredCities = this.filteredCities.filter( (e) => {
          return e.nome.toUpperCase().indexOf(event.value.toUpperCase()) != -1;
      });
    }
    else {
      this.filteredCities = this.cities.filter( (e) => {
          return e.nome.toUpperCase().indexOf(event.value.toUpperCase()) != -1;
      });
    }
  };

  save = () => {
    this.props.onSave(this.state, this.props.mode);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeAutoComplete = name => (event, { newValue }) => {
    if(newValue !== undefined) {
      this.setState({
        [name]: newValue
      });
    }
    else {
      this.setState({
        [name]: newValue
      });
    }
    
  };

  delete = () => {
    this.props.onDelete(this.state);
  };

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

  async onSelectState(event, name)  {
    
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/";

    let { value } = event.target; 

    this.setState({ [name]: value });

    if(value) {
      url += value + '/municipios';
      this.filteredCities = [];
      let cities = await fetch(url).then((response) => {
        return response.json().then(function(json) {
          return json;
        });
      });
      this.cities = await cities;
      this.setState({...this.state, city: ''});
    }
    else {
      this.cities = [];
      this.filteredCities = [];
    }
  };

  onSelect(event, name) {
    if (event) {
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
            <Col className="gutter-row" md={12}>
              <JlAutoComplete
                id="standard-provider_inscription"
                label="Prestador"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.provider_social_name}
                fullWidth
                filters={['name']}
                route="companies/getByName"
                valueField="name"
                displayedFields={["name"]}
                outData={{
                  provider_id: 'id',
                  provider_inscription: 'inscription',
                  provider_inscription_municipal: 'municipal_inscription',
                  provider_social_name: 'name'
                }}
                onSuggestionSelected={this.onSuggestionSelected}
                onChange={this.handleChangeAutoComplete('provider_social_name')}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12}>
              <JlAutoComplete
                  id="standard-provider_inscription"
                  label="Cliente"
                  className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                  disabled={this.isReadOnly(this.props.mode, true)}
                  value={this.state.client_name}
                  fullWidth
                  filters={['name']}
                  route="clients/getByName"
                  valueField="name"
                  displayedFields={["name"]}
                  outData={{
                    client_id: 'id',
                    client_inscription: 'inscription',
                    client_name: 'name'
                  }}
                  onSuggestionSelected={this.onSuggestionSelected}
                  onChange={this.handleChangeAutoComplete('client_name')}
                  margin="normal"
                  variant="outlined"
                />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="series"
                label="Série"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                disabled={true}
                value={this.state.series}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-number"
                label="Número"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                disabled={true}
                value={this.state.number}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlDate
                id="standard-date"
                label="Data"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.provision_date}
                fullWidth
                onChange={this.handleChange("provision_date")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={6} sm={12} xs={12}>
              <JlInput
                id="standard-date"
                label="Valor"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                startAdornment="R$"
                value={this.state.value}
                fullWidth
                onChange={this.handleChange("value")}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={8} sm={8} xs={8}>
              <JlSelect
                id="company-iss_retain"
                name="iss_retain"
                label="ISS Retido"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.iss_retain}
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
            <Col className="gutter-row" md={8} sm={8} xs={8}>
              <JlSelect
                id="company-iss_retain"
                name="state"
                label="Estado"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.provision_state}
                dataSource={states}
                fullWidth
                onSelect={this.onSelectState}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={8}>
              <JlAutoComplete
                  id="standard-state"
                  label="Municipio"
                  className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                  disabled={this.isReadOnly(this.props.mode, true)}
                  value={this.state.provision_city_name}
                  fullWidth
                  filters={['name']}
                  displayedFields={["nome"]}
                  suggestions={this.filteredCities}
                  outData={{
                    provision_city_name: "nome", 
                    provision_city_ibge: "id"
                  }}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchMunicipio}
                  onSuggestionSelected={this.onSuggestionSelected}
                  onChange={this.handleChangeAutoComplete('provision_city_name')}
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

export default withStyles(styles)(InvoiceForm);
