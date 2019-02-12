import React, { Component } from "react";
import { Icon, Tooltip } from "antd";
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu';

import NewTask from "features/schedule/containers/new";
import NewDeal from "features/pipeline/containers/new";
import NewContact from "features/contacts/containers/new";

import "./style.less";

export default class FAB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      currentFeature: undefined
    }
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen});

  openModal = async (feature) => {
    //Force child Re-render
    await this.setState({currentFeature: undefined});
    this.setState({currentFeature: feature});
  };

  render() {
    return (
      <div className="boomy-fab">
        <FloatingMenu
          slideSpeed={500}
          direction="left"
          spacing={8}
          isOpen={this.state.isOpen}
        >
          <Tooltip placement="top" title="Atalhos">
            <div className="tooltip" 
              onClick={this.toggle} />
          </Tooltip>
          <MainButton 
            className="main-button"
            iconResting={
              <Icon type="plus" fill="#fff" />
            }
            iconActive={<Icon type="close" fill="#fff" />}
            backgroundColor="#1890ff"
            size={56}
          />
          <ChildButton
            icon={<Icon type="tags"/>}
            backgroundColor="white"
            size={40}
            onClick={() => this.openModal("pipeline")}
          />
          <ChildButton
            icon={<Icon type="calendar"/>}
            backgroundColor="white"
            size={40}
            onClick={() => this.openModal("schedule")}
          />
          <ChildButton
            icon={<Icon type="solution"/>}
            backgroundColor="white"
            size={40}
            onClick={() => this.openModal("contacts")}
          />
        </FloatingMenu>  
        <NewContact show={this.state.currentFeature === "contacts"} />
        <NewTask    show={this.state.currentFeature === "schedule"} />
        <NewDeal    show={this.state.currentFeature === "pipeline"} />
      </div>
    )
  }
}