import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import JlInput from "core/_input/input";

  
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class ClientForm extends React.Component {

  constructor(props) {
    super(props);

    if(props.client)  {
      this.state = this.props.client;
    }
    else {
      
      this.state = {
        validEmail: "",
        cpf: null,
        address: '',
        syndic_email: '',
        name: "Pedro",
        valid: false
      }
    }
    
    
  }

    isReadOnly(mode, readOnlyOnEdit) {
      if(mode == 'view' || (mode == 'edit' && readOnlyOnEdit)) {
        return true;
      }
      else return false;
    }

    save = () => {
      console.log('1');
      this.props.onSave(this.state, this.props.mode);
    }

    handleChange = name => event => {
      this.props.client[name] = event.target.value;
      this.setState({ [name]: event.target.value });
    };

    render() {
      const { classes } = this.props;

        return (
          
          <form noValidate autoComplete="off" className={classes.container} onSubmit={this.save}> 
            <Row gutter={16}>
              
              <Col className="gutter-row" span={8}>
                <JlInput
                    id="standard-address"
                    label="CPF/CNPJ"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    value={this.props.client.cnpj}
                    fullWidth
                    onChange={this.handleChange('cnpj')}
                    margin="normal"
                    variant="outlined"
                  />
              </Col>   
              <Col className="gutter-row" span={8}>
                  <JlInput
                    id="standard-controlled"
                    label="Nome"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    value={this.props.client.name}
                    fullWidth
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />
              </Col>
              <Col className="gutter-row" span={8}>
                <JlInput
                    id="standard-address"
                    label="Endereço"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    value={this.props.client.address}
                    fullWidth
                    onChange={this.handleChange('address')}
                    margin="normal"
                    variant="outlined"
                  />
              </Col> 
                <Col className="gutter-row" span={24}>
                  <JlInput
                    id="standard-email"
                    label="Email"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, false)}
                    value={this.props.client.syndic_email}
                    fullWidth
                    onChange={this.handleChange('syndic_email')}
                    margin="normal"
                    variant="outlined"
                  />
                </Col>
            </Row>
            <div className="center-actions">
                  <Button shape="circle" size="large" type="primary" icon="check" onClick={this.save}></Button>
              </div>
          </form>
        );
    }
}

export default withStyles(styles)(ClientForm);