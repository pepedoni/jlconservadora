import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import { DatePicker } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import JlInput from "core/_input/input";
import locale from 'antd/lib/date-picker/locale/pt_BR';


const RangePicker = DatePicker.RangePicker;
  
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
              
              <Col className="gutter-row" span={12}>
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
              <Col className="gutter-row" span={12}>
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
              <Col className="gutter-row" span={12}>
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
              <Col className="gutter-row" span={4}>
                <JlInput
                    id="standard-address_number"
                    label="Número"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    value={this.props.client.address_number}
                    fullWidth
                    onChange={this.handleChange('address_number')}
                    margin="normal"
                    variant="outlined"
                  />
              </Col> 
              <Col className="gutter-row" span={8}>
                <JlInput
                    id="standard-address_complement"
                    label="Complemento"
                    className={classes.textField}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    value={this.props.client.address_complement}
                    fullWidth
                    onChange={this.handleChange('address_complement')}
                    margin="normal"
                    variant="outlined"
                  />
              </Col> 
              <Col className="gutter-row" span={8}>
                <JlInput
                  id="standard-home_contact"
                  label="Telefone 1"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.home_contact}
                  fullWidth
                  onChange={this.handleChange('home_contact')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <JlInput
                  id="standard-phone_contact"
                  label="Telefone 2"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.phone_contact}
                  fullWidth
                  onChange={this.handleChange('phone_contact')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <JlInput
                  id="standard-commerce_contact"
                  label="Telefone 3"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.commerce_contact}
                  fullWidth
                  onChange={this.handleChange('commerce_contact')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <JlInput
                  id="standard-email"
                  label="Email Sindico"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.syndic_email}
                  fullWidth
                  onChange={this.handleChange('syndic_email')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <JlInput
                  id="standard-email"
                  label="Apartamento do Sindico"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.syndic_ap}
                  fullWidth
                  onChange={this.handleChange('syndic_ap')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <JlInput
                  id="standard-syndic_birthday"
                  label="Aniversario do Sindico"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.syndic_birthday}
                  fullWidth
                  onChange={this.handleChange('syndic_birthday')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              
              <Col className="gutter-row" span={8}>
                <JlInput
                  id="standard-cond_blocks"
                  label="Nº de Blocos"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.cond_blocks}
                  fullWidth
                  onChange={this.handleChange('cond_blocks')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              
              <Col className="gutter-row" span={8}>
                <JlInput
                  id="standard-cond_floors"
                  label="Nº de Andares"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.cond_floors}
                  fullWidth
                  onChange={this.handleChange('cond_floors')}
                  margin="normal"
                  variant="outlined"
                />
              </Col>
              
              <Col className="gutter-row" span={8}>
                <JlInput
                  id="standard-cond_aps"
                  label="Nº de Apartamentos"
                  className={classes.textField}
                  disabled={this.isReadOnly(this.props.mode, false)}
                  value={this.props.client.cond_aps}
                  fullWidth
                  onChange={this.handleChange('cond_aps')}
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