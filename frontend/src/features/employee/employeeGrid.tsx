import React, { Component } from 'react'

import Grid from 'core/_grid'
import { Card } from 'antd';

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        // sorter: true,
        // render: name => `${name.first} ${name.last}`,
        // width: '50%',
    },
    {
        title: 'CPF',
        dataIndex: 'cpf',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        // sorter: true,
        // width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    }   
];

const url = '/employee';

export default class EmployeeGrid extends Component {
    render() {
        return (
            <Card>
                <Grid columns={columns} url= {url}/>
            </Card>
        )
    }
}