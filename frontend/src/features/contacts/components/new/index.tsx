import React, { Component } from 'react'
import { Modal } from 'antd';

export default class NewContact extends Component {
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
        title="Novo Contato"
        okText="Criar"
        cancelText="Cancelar"
        onCancel={this.handleCancel}
        destroyOnClose
        maskClosable={false}
      >
        Vamos criar um contatoa
      </Modal>
    )
  }
}