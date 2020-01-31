import React, { Component } from 'react'
import { Modal } from 'antd'

class InvoiceErrors extends Component {
    
    render() {
        return (
            <Modal visible={true} onCancel={this.props.onCloseErrors}
                    centered={true} title="Confirmar" okText="Confirmar" cancelText="Cancelar"
                    onOk={() => console.log('teste')}>
            </Modal>
        );
    }
}

