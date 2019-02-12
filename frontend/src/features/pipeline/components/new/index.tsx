import React, { Component } from 'react'
import { Modal } from 'antd';

export default class NewDeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show
    }
  }
  
  //Lifecycle
  componentDidUpdate(oldProps) {
    if(oldProps.show !== this.props.show) 
      this.setState({show: this.props.show});
  }

  //Actions
  handleCancel = () => {
    this.setState({show: false});
  }

  //Renders


  render() {
    return (
      <Modal
        visible={this.state.show}
        title="Nova Oportunidade"
        okText="Criar"
        cancelText="Cancelar"
        onCancel={this.handleCancel}
        maskClosable={false}
      >
        Vamos criar uma oportunidade
      </Modal>
    )
  }
}