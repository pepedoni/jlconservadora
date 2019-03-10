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

    if (props.service) {
      this.state = this.props.service;
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
    this.props.onSave(this.props.service, this.props.mode);
  };

  getTextItem(item) {
    return item.code + " | " + item.description + " | " + item.aliquot;
  }

  onSelect(value, option) {
    let aliquota = parseFloat(
      option.props.children[2].replace(" ", "").replace("|", "")
    );
    this.props.service["aliquot"] = aliquota;
    this.props.service["list_item"] = option.key;
    this.setState({ aliquot: aliquota });
    this.setState({ list_item: option.key });
  }

  handleChange = name => event => {
    this.props.service[name] = event.target.value;
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
                value={this.props.service.name}
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
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                outData={["key", "aliquot"]}
                displayedfields={["key", "description", "aliquot"]}
                optionLabelProp="text"
                value={this.props.service.list_item}
              />
            </Col>
            <Col className="gutter-row" md={4} sm={12} xs={12}>
              <JlInput
                id="standard-aliquot"
                label="Aliquota"
                className={classes.textField}
                disabled={true}
                value={this.props.service.aliquot}
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
                value={this.props.service.description}
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
