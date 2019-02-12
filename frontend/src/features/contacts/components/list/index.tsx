import React, { Component } from 'react'
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }
  
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
};