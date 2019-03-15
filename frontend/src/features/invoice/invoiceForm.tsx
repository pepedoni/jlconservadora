import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlDate from "core/_input/date";
import JlAutoComplete from "core/_input/autoComplete";

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

    this.state = {
      ...this.props.invoice
    };

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.mode == "view" || nextProps.mode == "new") &&
      nextProps.mode != this.props.mode
    ) {
      this.setState({
        ...nextProps.company
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

  save = () => {
    this.props.onSave(this.state, this.props.mode);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeAutoComplete = name => (event, { newValue }) => {

    this.setState({
        [name]: newValue,
    });
    
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
              <JlAutoComplete
                id="standard-provider_inscription"
                label="Prestador"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.provider_name}
                fullWidth
                filters={['name']}
                route="company"
                fieldDescription='name'
                outData={{
                  provider_inscription: 'inscription'
                }}
                onSuggestionSelected={this.onSuggestionSelected}
                onChange={this.handleChangeAutoComplete('provider_name')}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={12}>
              <JlAutoComplete
                  id="standard-provider_inscription"
                  label="Cliente"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, true)}
                  value={this.state.client_name}
                  fullWidth
                  filters={['name']}
                  route="clients"
                  fieldDescription='name'
                  outData={{
                    client_inscription: 'inscription'
                  }}
                  onSuggestionSelected={this.onSuggestionSelected}
                  onChange={this.handleChangeAutoComplete('client_name')}
                  margin="normal"
                  variant="outlined"
                />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" md={8}>
              <JlInput
                id="standard-number"
                label="Número"
                className={classes.textField}
                disabled={true}
                value={this.state.number}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={8} sm={12} xs={12}>
              <JlDate
                id="standard-date"
                label="Data"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.date}
                fullWidth
                onChange={this.handleChange("date")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={8} sm={12} xs={12}>
              <JlInput
                id="standard-date"
                label="Valor"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.value}
                fullWidth
                onChange={this.handleChange("value")}
                margin="normal"
                variant="outlined"
                type="number"
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
