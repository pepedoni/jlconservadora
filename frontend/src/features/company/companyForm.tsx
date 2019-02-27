import React, {Component} from 'react';
import {
  Col, Button, Spin
} from 'antd';
import { withStyles } from '@material-ui/core/styles';
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

class CompanyForm extends Component {

  constructor(props) {
    super(props);

    if(props.company)  {
      this.state = this.props.company;
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
    
    this.onSelect = this.onSelect.bind(this);

  }

    isReadOnly(mode, readOnlyOnEdit) {
      if(mode == 'view' || (mode == 'edit' && readOnlyOnEdit)) {
        return true;
      }
      else return false;
    }

    save = () => {
      this.props.onSave(this.props.company, this.props.mode);
    }

    getTextItem(item) {
      return item.code + ' | ' + item.description + ' | ' + item.aliquot;
    }

    onSelect(value, option) {
      let aliquota = parseFloat(option.props.children[2].replace(" ", "").replace("|", ""));
      this.props.company["aliquot"] = aliquota;
      this.props.company["list_item"] = option.key;
      this.setState({aliquot: aliquota});
      this.setState({list_item: option.key})
    }

    handleChange = name => event => {
      this.props.company[name] = event.target.value;
      this.setState({ [name]: event.target.value });
    };

    handleSearch() {
      console.log('teste');
    }

    render() {
      const { classes } = this.props;

        return (
          
          <form noValidate autoComplete="off" className={classes.container} onSubmit={this.save}> 
            <Spin spinning={this.props.loading}>
            <Col className="gutter-row" md={12}>
                <JlInput
                    id="standard-address"
                    label="Nome"
                    className={classes.textField}
                    value={this.props.company.name}
                    disabled={this.isReadOnly(this.props.mode, true)}
                    fullWidth
                    onChange={this.handleChange('name')}
                    mask=""
                    margin="normal"
                    variant="outlined"
                  />
              </Col>  
              <Col className="gutter-row" md={4} sm={12} xs={12}>
                <JlInput
                    id="standard-aliquot"
                    label="Aliquota"
                    className={classes.textField}
                    disabled={true}
                    value={this.props.company.aliquot}
                    fullWidth
                    onChange={this.handleChange('aliquot')}
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
                    value={this.props.company.description}
                    fullWidth
                    multiline
                    onChange={this.handleChange('description')}
                    margin="normal"
                    variant="outlined"
                    rows={3}
                  />
              </Col> 

            </Spin>
            <div className="center-actions">
                  <Button shape="circle" size="large" type="primary" icon="check" onClick={this.save}></Button>
              </div>
          </form>
        );
    }
}

export default withStyles(styles)(CompanyForm);