import React, {Component} from 'react';
import {
    Form, Button, Col, Row, Input, Select, DatePicker, Icon,
  } from 'antd';
  
class Employee extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        validEmail: "",
        cpf: null,
        email: null,
        name: null,
        valid: false
      }
    }

    isReadOnly(mode, readOnlyOnEdit) {
      if(mode == 'view' || (mode == 'edit' && readOnlyOnEdit)) {
        return true;
      }
      else return false;
    }

    save = () => {
      this.props.onSave(this.props.form.getFieldsValue());
    }

    handleChange(key,value) {
        this.props.form.setFieldsValue({
                [key]: value,
            });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
        return (
          
            <Form layout="inline" onSubmit={this.save}>
                <Form.Item
                      label="CPF"
                      >
                        {getFieldDecorator('cpf', {
                          rules: [{ required: true, message: 'Informe o CPF do colaborador!' }],
                        })(
                          <Input placeholder="999.999.99-99" id="cpf" value={this.state.cpf}  disabled={this.isReadOnly(this.props.mode, true)}/>
                        )}
                </Form.Item>
                    
                  <Form.Item
                        label="Nome"
                        >
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Informe o Nome do colaborador!' }],
                          })(
                            <Input placeholder="João Carlos" id="name" value={this.state.name}  disabled={this.isReadOnly(this.props.mode, true)}/>
                          )}
                  </Form.Item>
                    
                  <Form.Item
                          label="E-mail"
                          >
                            {getFieldDecorator('email', {
                              rules: [{ required: true, message: 'Informe o email do colaborador!' }],
                            })(
                              <Input placeholder="example@jlconservadora.com.br" id="email" value={this.state.email} disabled={this.isReadOnly(this.props.mode, true)}/>
                            )}
                    </Form.Item>
              <div className="center-actions">
                  <Button shape="circle" size="large" type="primary" icon="check" htmlType="submit"></Button>
              </div>
            </Form>
        );
    }
  }
  
const EmployeeForm = Form.create({name: 'employee'})(Employee);

export default EmployeeForm;