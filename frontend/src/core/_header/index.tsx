import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Avatar, Popover, Badge, Modal } from "antd";
import { bindActionCreators } from "redux";
import { logout, getToken, getUser } from "features/auth/authActions";
import QueueAnim from 'rc-queue-anim';
import "./style.less";

import UserPopover from 'core/_user_popover';
import {withRouter} from "react-router-dom";

class JLHeader extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showLogoutConfirmation: false,
    }
  }


  //Renders
  renderBreadcrumb = () => (
    <Col className="hide-mobile breadcrumb-container">
      <span className="breadcrumb">
        {this.props.currentLocation && this.props.currentLocation.breadcrumb && this.props.currentLocation.breadcrumb.replace(/\//g, " \/  ")}
      </span>
    </Col>
  )

  renderTitle = () => (
    <Col span={22}>
      {this.renderBreadcrumb()}
      <QueueAnim delay={0} duration={[1000,0]}
      >
        <Col key={this.props.currentLocation.title} className="title-container">
          <span className="title">
            {this.props.currentLocation.title}
          </span>  
        </Col>
      </QueueAnim>
    </Col>
  )

  renderAvatar = () => (
    <Col span={2} className="avatar-container">
    <Badge count={0}>
      <Popover placement="bottomLeft" 
        content={
          <UserPopover 
            userName={(this.props.user) ? this.props.user.name : ''}
            companyName="Jl Conservadora" 
            hasNotification={true}
            logout={this.confirmLogout}
          />} 
        trigger="click">
        <Avatar icon="user" src={this.props.user && this.props.user.image} alt={this.props.user && this.props.user.name}/>
      </Popover>
    </Badge>
    </Col>
  )

  renderLogoutConfirmation = () => (
    <Modal visible={this.state.showLogoutConfirmation} 
      onOk={this.logout}
      confirmLoading={this.state.logginOut}
      onCancel={() => this.setState({showLogoutConfirmation: false})}
      title={this.state.logginOut? "Saindo" : "Sair"}
      okText={this.state.logginOut? "Saindo" : "Sim"}
      cancelText="Não"
      okButtonProps={{disabled:this.props.logginOut}}
      cancelButtonProps={{disabled:this.props.logginOut}}
    >
      <span>
        Tem certeza que deseja sair do sistema?
      </span>
    </Modal>
  )

  //Actions
  confirmLogout = () => {
    this.setState({showLogoutConfirmation: true});
  }

  logout = () => {
    this.props.logout(this.props.history);
  }

  render() {

    if(this.props.user == undefined) {
      if(getToken() != '') {
        this.props.getUser();
      }
      else return <Redirect to={"/login"} />
    } 

    return (
      <Row>
        {this.renderTitle()}
        {this.renderAvatar()}
        {this.renderLogoutConfirmation()}
      </Row>
      
    )
  }
}

//Listen to path change
const mapStateToProps = state => ({
  currentLocation: state.general.currentLocation,
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      getUser
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JLHeader));