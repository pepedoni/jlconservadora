import React, { Component } from 'react'

import {Row, Col} from 'antd'

import Filter from 'core/_filter'
import JlAutoComplete from "core/_input/autoComplete";
import JlInput from "core/_input/input";
import JlSelect from "core/_input/select"
// import request from "api/request"

export default class ClientFilter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: '',
<<<<<<< HEAD
            inscription: ''
=======
            cpfCnpj: '',
            district: ''
>>>>>>> 62855dddde321f4f584e0e3992c36eb735d1de7d
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleChangeAutoComplete = name => (event, { newValue }) => {

        this.setState({
            [name]: newValue,
        });
        
    };
    
    render () {
        return (
            <Filter visible={this.props.visible} onCloseFilter={this.props.clientCloseFilter}
                onFilter={this.props.clientOnFilter} filter={this.state}>
                <Row gutter={4}>
                    <Col className="gutter-row" span={12}>
                        <JlInput label='Nome' onChange={this.handleChange('nome')}/>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <JlInput label='CPF/CNPJ' onChange={this.handleChange('inscription')}/>
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
                            label="Bairro"
                            size="large"
                            style={{ width: "100%" }}
<<<<<<< HEAD
                            // dataSource={this.props.clientDistricts}
=======
>>>>>>> 62855dddde321f4f584e0e3992c36eb735d1de7d
                            // onSelect={this.onSelect}
                            // onSearch={this.handleSearch}
                            className={"filter"}
                            outData={["key", "aliquot"]}
                            displayedfields={["key", "description", "aliquot"]}
                            route="clients/districts"
                            optionLabelProp="text"
                            onChange={this.handleChangeAutoComplete('district')}
                            value={this.state.district}
                        />
                    </Col>
                </Row>
            </Filter>
        )
    }
}