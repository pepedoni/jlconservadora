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
                className={classes.textField}
                value={this.state.name}
                disabled={this.isReadOnly(this.props.mode, true)}
                fullWidth
                onChange={this.handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </Col>
            <Col className="gutter-row" md={8}>
              <JlAutoComplete
                textField={classes.textField}
                label="Item da Lista"
                size="large"
                style={{ width: "100%" }}
                disabled={this.isReadOnly(this.props.mode, false)}
                dataSource={listaServicos}
                onChange={this.handleChangeAutoComplete('item_list')}
                outData={["aliquot"]}
                displayedfields={["description", "aliquot"]}
                optionLabelProp="text"
                value={this.state.item_list}
                route="services/getServicesList"
              />
            </Col>
            <Col className="gutter-row" md={4} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota"
                className={classes.textField}
                disabled={true}
                value={this.state.aliquot}
                fullWidth
                onChange={this.handleChange("aliquot")}
                margin="normal"
                variant="outlined"
                type="float"
              />
            </Col>
            <Col className="gutter-row" md={24} sm={24} xs={24}>
              <JlInput
                id="standard-description"
                label="Descrição"
                className={classes.textField}
                disabled={this.isReadOnly(this.props.mode, true)}
                value={this.state.description}
                fullWidth
                multiline
                onChange={this.handleChange("description")}
                margin="normal"
                variant="outlined"
                rows={3}
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

export default withStyles(styles)(ServiceForm);
