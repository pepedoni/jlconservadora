import React, { Component } from 'react'

import {Row, Col} from 'antd'

import Filter from 'core/_filter'
import JlAutoComplete from "core/_input/autoComplete";
import JlInput from "core/_input/input";
import JlSelect from "core/_input/select"
import request from "api/request"

export default class ClientFilter extends Component {

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

    getDistrictData = async (teste = '') => {
        const response =  await request.get('/clients/districts');
        const data = await response.data;
        return data;
    }

    render () {
        return (
            <Filter visible={this.props.visible} onCloseFilter={this.props.clientCloseFilter}
                onFilter={this.props.clientOnFilter} filter={this.state}>
                <Row gutter={4}>
                    <Col className="gutter-row" span={12}>
                        <JlInput label='Nome' onChange={this.handleChange('nome')}/>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <JlInput label='CPF/CNPJ' onChange={this.handleChange('cpfCnpj')}/>
                    </Col>
                </Row>
                <Row gutter={4}>
                    <Col className="gutter-row" span={12}>
                        <JlInput label='Email' onChange={this.handleChange('email')}/>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <JlSelect
                            id="client_is_active"
                            name="is_active"
                            label="Ativo"
                            // className={classes.textField}
                            // disabled={this.isReadOnly(this.props.mode, false)}
                            // value={this.props.company.cultural_promoter}
                            dataSource={[
                                { key: 0, description: "Não", label: "Não" },
                                { key: 1, description: "Sim", label: "Sim" }
                            ]}
                            fullWidth
                            // onSelect={this.onSelect}
                            margin="normal"
                            variant="outlined"
                        />
                    </Col>
                </Row>
                <Row gutter={4}>
                    <Col className="gutter-row" span={12}>
                        <JlInput label='Rua' onChange={this.handleChange('rua')}/>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <JlAutoComplete
                            // textField={classes.textField}
                            label="Item da Lista"
                            size="large"
                            style={{ width: "100%" }}
                            dataSource={this.getDistrictData()}
                            // onSelect={this.onSelect}
                            // onSearch={this.handleSearch}
                            className={"filter"}
                            outData={["key", "aliquot"]}
                            displayedfields={["key", "description", "aliquot"]}
                            optionLabelProp="text"
                            // value={this.props.service.list_item}
                        />
                    </Col>
                </Row>
            </Filter>
        )
    }
}