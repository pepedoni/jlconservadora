import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Form, Input, Icon, Checkbox } from "antd";

import "./style.less";
import { images } from "assets";
import { validateMail } from "utils/utils";
import Password from "antd/lib/input/Password";

const boomyMote = images.boomy_mote_vertical;
const background = images.background_login;
const techLogo = images.techprise;

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validEmail: "",
      email: null,
      password: null,
      valid: false,
      rememberMe: true
    }
  }

  // Lifecycle
  componentDidMount() {
    this.email.input.onblur = this.onBlurEmail;
    this.email.input.onfocus = this.onFocusEmail;
  }

  componentDidUpdate(oldProps) {
    if(oldProps.errorLogin !== this.props.errorLogin && this.state.valid === true)
      this.setState({valid: false});
  }

  //Actions
  login = () => this.props.login({email: this.state.email, password: this.state.password, rememberMe: this.state.rememberMe});
  
  // Validations And Changes
  validateForm = () => {
    let valid = (this.state.validEmail === "success" && !!this.state.password);
    this.setState({valid})
  }

  onBlurEmail = () => {
    if(this.state.validEmail === 'warning')
      this.setState({validEmail: 'error'});
  }

  onFocusEmail = () => {
    if(this.state.validEmail === 'error')
      this.setState({validEmail: 'warning'});
  }

  onChangeEmail = async (event) => {
    let email = event.target.value;
    await this.setState(
      { 
        email, 
        validEmail: validateMail(email) ? "success" : "warning"
      }
    );
    this.validateForm();
  }

  onChangePassword = async (event) => {
    let password = event.target.value;
    await this.setState({password});
    this.validateForm();
  }

  onChangeRememberMe = () => this.setState({rememberMe: !this.state.rememberMe});

  // Renders
  renderBackground = () => (
    <Col xs={0} md={16} className="brand">
      <div className="overlay" />
        <div className="background">
          <img src={background} />
        </div>
      <img src={boomyMote} />
    </Col>
  );

  renderTitle = () => (
    <div className="title">
      <span>
        Seja Bem Vindo!
      </span>
      <span className="subtitle">
        Entre com seu e-mail e senha para continuar...
      </span>
    </div>
  )

  renderFormItems = () => (
    <Form layout="vertical">
      <Form.Item
        label="Email"
        validateStatus={this.state.validEmail}
        help={this.state.validEmail === "error" ? "Tem que ser um e-mail válido" : null}
      >
        <Input placeholder="jl@jlconservadora.com.br" id="email" value={this.state.email} onChange={this.onChangeEmail}
          ref={(input) => this.email = input}/>
      </Form.Item>
      <Form.Item
        label="Senha"
      >
        <Input.Password id="password" value={this.state.password} onChange={this.onChangePassword} onPressEnter={this.login}/>
      </Form.Item>
    </Form>
  )

  renderErrorMessage = () => (
    <div className="error">
      <span>
        {this.props.errorLogin && !this.state.valid ? this.props.errorLogin : null}
      </span>
    </div>
  )

  renderForgotPassword = () => (
    <div className="forgot-password">
      <span>
        Esqueci minha senha
      </span>
    </div>
  )

  renderRememberMe = () => (
    <div className="remember">
      <Checkbox checked={this.state.rememberMe} onChange={this.onChangeRememberMe}/>
      <span>
        Continuar conectado
      </span>
    </div>
  )

  renderButton = () => (
    <Button type="primary" disabled={!this.state.valid} onClick={this.login}>
      Entrar
      <Icon type="loading" style={{display: this.props.loadingLogin ? "inline" : "none"}}/>
    </Button>
  )

  renderForm = () => (
    <Col xs={24} md={8} className="form-container">
      {this.renderTitle()}
      {this.renderFormItems()}
      {this.renderErrorMessage()}
      <div className="additional-info">
        {this.renderRememberMe()}
        {this.renderForgotPassword()}
      </div>
      {this.renderButton()}
    </Col>
  )
  
  render() {
    const { from } = this.props.location.state || {from: { pathname: "/" }};
    
    // If successful login
    if (this.props.user) {
      return <Redirect to={from.pathname} />
    }

    return (
      <Row className="jl-login">
        {this.renderBackground()} 
        {this.renderForm()}
      </Row>
    )
  }
}