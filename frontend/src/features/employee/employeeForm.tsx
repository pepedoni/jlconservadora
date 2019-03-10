import React, { Component } from "react";
import { Row, Button, Col, Spin } from "antd";
import JlInput from "core/_input/input";
import { withStyles } from "@material-ui/core/styles";

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

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.employee
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

  renderSave() {
    if (this.props.mode == "edit" || this.props.mode == "new") {
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
  };

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.mode == "view" || nextProps.mode == "new") &&
      nextProps.mode != this.props.mode
    ) {
      this.setState({
        ...nextProps.employee
      });
    }
  };

  handleChange = name => event => {
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
                id="standard-cpf"
                label="CPF"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.cpf}
                fullWidth
                onChange={this.handleChange("cpf")}
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
                value={this.state.name}
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
                disabled={this.isReadOnly(this.props.mode, false)}
                value={this.state.email}
                fullWidth
                onChange={this.handleChange("email")}
                margin="normal"
                variant="outlined"
              />
            </Col>
          </Row>
        </Spin>

        {this.renderSave()}
      </form>
    );
  }
}

export default withStyles(styles)(EmployeeForm);
