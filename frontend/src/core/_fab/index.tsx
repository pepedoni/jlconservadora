import React, { Component } from "react";
import { FloatingMenu} from 'react-floating-button-menu';
import { Button } from 'antd';
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

  onClick = () => {

  }


  render() {
    return (

        
      <Button shape="circle" icon="plus" size="large" type="primary" onClick={this.props.onClick} className="add-button"/>

    )
  }
}