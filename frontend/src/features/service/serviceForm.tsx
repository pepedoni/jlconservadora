import React, { Component } from "react";
import { Row, Col, Icon, Button, Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlInput from "core/_input/input";
import JlAutoComplete from "core/_input/autoComplete";
import listaServicos from "./listaServicos";

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

class ServiceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.service
    };

  }

  isReadOnly(mode, readOnlyOnEdit) {
    if (mode == "view" || (mode == "edit" && readOnlyOnEdit)) {
      return true;
    } else return false;
  }

  save = () => {
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSearch() {
    console.log("teste");
  }

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
            <Col className="gutter-row" md={12}>
              <JlInput
                id="standard-address"
                label="Nome"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                value={this.state.name}
                disabled={this.isReadOnly(this.props.mode, true)}
                fullWidth
                onChange={this.handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={8}>
              <JlInput
                  id="standard-aliquot"
                  label="Item da Lista"
                  className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                  disabled={this.isReadOnly(this.props.mode, true)}
                  value={this.state.item_list}
                  fullWidth
                  onChange={this.handleChange("list_item")}
                  margin="normal"
                  variant="outlined"
                />
            </Col>
            <Col className="gutter-row" md={4} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.aliquot}
                fullWidth
                endAdornment="%"
                onChange={this.handleChange("aliquot")}
                margin="normal"
                variant="outlined"
                type="float"
              />
            </Col>
            <Col className="gutter-row" md={24} sm={24} xs={24}>
              <JlInput
                id="standard-description"
                label="Descrição para Emissão"
                className={this.props.mode === "edit" ? classes.textFieldReadOnly : classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.description}
                fullWidth
                extraProps={{multiline: true}}
                onChange={this.handleChange("description")}
                margin="normal"
                variant="outlined"
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
