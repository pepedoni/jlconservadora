import React, { Component} from "react";
import { Layout } from "antd";
import { hot } from 'react-hot-loader';

import "./main.less";
import JLMenu from "core/_menu";
import JLHeader from "core/_header";
import Trigger from "core/_trigger";
import FAB from "core/_fab";
import MainRouter from "routes/main";

const { Header, Content, Footer, Sider } = Layout;

class JL extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: false,
      visibleTooltip: false,
      sizeOfMenu: 270
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed, 
      visibleTooltip: false
    })
  }

  tooltipInvisible = () => {
    if(this.state.collapsed) {
      this.setState({visibleTooltip: false});
    }
  }
  
  tooltipVisible = () => {
    if(this.state.collapsed) {
      this.setState({visibleTooltip: true});
    }
  }

  changeMenuSize = (mobile) => {
    if(mobile) {
      this.setState({sizeOfMenu: window.outerWidth});
    }
  }

  render() {
    return (
      <Layout className="jl">
        <Sider className="jl-sider"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={this.state.sizeOfMenu}
          breakpoint="sm"
          onBreakpoint={this.changeMenuSize}
        >
          <JLMenu collapsed={this.state.collapsed}/>
          <Trigger onClick={this.toggle} collapsed={this.state.collapsed} onMouseLeave={this.tooltipInvisible} onMouseEnter={this.tooltipVisible} visibleTooltip={this.state.visibleTooltip}/>
        </Sider>
        <Layout>
          <Header className="jl-header">
            <JLHeader />
          </Header>
          <Content className="jl-content">
            <FAB />
            <MainRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default hot(module)(JL);