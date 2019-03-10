import React, { Component } from 'react'

import {Row, Col} from 'antd'

import Filter from 'core/_filter'
import Input from 'core/_input/input'

export default class InvoiceFilter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: '',
            cpfCnpj: ''
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render () {
        return (
            <Filter visible={this.props.visible} onCloseFilter={this.props.invoiceCloseFilter}
                onFilter={this.props.invoiceOnFilter} filter={this.state}>
                <Row gutter={4}>
                    <Col className="gutter-row" span={12}>
                        <Input label='Nome' onChange={this.handleChange('nome')}/>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Input label='CPF/CNPJ' onChange={this.handleChange('cpfCnpj')}/>
                    </Col>
                </Row>
            </Filter>
        )
    }
}