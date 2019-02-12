import React, { Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { setCurrentLocation } from "core/actions";

import { images } from "assets";
import screensConfig from "config/screens";
import "./style.less";

const jlLogo = images.jlLogo;
const jlLogoCollapsed = images.jlLogoCollapsed;

class JLMenu extends Component {
  constructor(props) {
    super(props);

    this.screensConfigMap = {}
  }

  //Lifecycles
  componentDidUpdate(oldProps) {
    if(oldProps.currentPath !== this.props.currentPath) {
      this.props.setCurrentLocation(this.screensConfigMap[this.props.currentPath]);
    }
  }

  componentDidMount() {
    this.props.setCurrentLocation(this.screensConfigMap[this.props.currentPath]);
  }

  //Renders 

  renderTitle = (menuItem) => (
    //If has icon
    !menuItem.icon ? menuItem.title : 
    <span>
      <Icon type={menuItem.icon} />
      <span>
        {menuItem.title}
      </span>
    </span>
  )

  renderMenu = (menuItem, index, parentIndex) => {
    
    if(menuItem.link)
      this.screensConfigMap[menuItem.link] = menuItem;
    
    //Check if has children
    let haveChildren = Array.isArray(menuItem.children) && menuItem.children.length > 0 ? true : false;
    //If has, render SubMenu, otherwise, render menu
    if(haveChildren) {
      return (
        <Menu.SubMenu key={index} 
          title={this.renderTitle(menuItem)}>
          {
            //Render children recursively
            menuItem.children.map((childItem, childIndex) => this.renderMenu(childItem, childIndex, index))
          }
        </Menu.SubMenu>
      );
    } else if(menuItem.link !== undefined && !menuItem.notVisibleInMenu){

      return (    
        <Menu.Item key={`${menuItem.link}`}>
          {this.renderTitle(menuItem)}
          <Link to={menuItem.link} />
        </Menu.Item>
      );
    }
  }

  render() {
    return (
      <div className="logo-menu">
        {this.props.collapsed ? <img src={jlLogoCollapsed} width="40"/> : <img src={jlLogo} width="180"/>}
        <Menu
          selectedKeys={[this.props.currentPath]} 
          mode="inline"
        >
          {
            screensConfig.map((menuItem, index) => this.renderMenu(menuItem, index, ""))
          }
        </Menu>
      </div>
    )
  }        
}

//Listen to path change
const mapStateToProps = state => ({
  currentPath: state.router.location.pathname
});

//Set current path with some infos in redux
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentLocation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(JLMenu);