import React, { Component } from 'react'

import Grid from 'core/_grid'

const columns = [
    {
        title: 'Nome',
        dataIndex: 'name',
        // sorter: true,
        // render: name => `${name.first} ${name.last}`,
        // width: '50%',
    },
    {
        title: 'Endereco',
        dataIndex: 'complete_address',
        // render: (address, data) => `${address}, ${data.address_number}/${da}`,
        // sorter: true,
        // width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'syndic_email',
    }   
];

const url = '/employee';

export default class EmployeeGrid extends Component {
    render() {
        return (
            <div>
                <Grid columns={columns} url= {url}/>
            </div>
        )
    }
}