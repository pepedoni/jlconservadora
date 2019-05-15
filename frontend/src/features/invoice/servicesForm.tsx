import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Spin } from "antd";
import { withStyles } from "@material-ui/core/styles";
import JlAutoComplete from "core/_input/autoComplete";
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

class ServicesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.services
    };
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

  save = () => {
    this.props.onSave(this.state, this.props.mode);
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

export default withStyles(styles)(ServicesForm);
