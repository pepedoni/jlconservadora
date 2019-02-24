import React, {Component} from 'react'

import { Modal } from 'antd'

export default class Filter extends Component {
    render() {
        return (
            <Modal visible={this.props.visible} onCancel={this.props.onCloseFilter}
                centered={true} title="Filtrar" okText="Filtrar" cancelText="Cancelar"
                onOk={() => this.props.onFilter(this.props.filter)}>
                { this.props.children }
            </Modal>
        )
    }
}