import React from 'react';
import { Table, Button } from 'antd';

const data = [{
  key: '1',
  name: 'Padaria do João',
  value: 32,
  description: "Limpeza de caixa d'agua",
}, {
  key: '2',
  name: 'Mercadinho do Zé',
  value: 42,
  description: 'Faxina',
}, {
  key: '3',
  name: 'Padaria Palmeiras',
  value: 32,
  description: 'Porteiro',
}];

export default class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setvalueSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'value',
      },
    });
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Cliente',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
      sortOrder: sortedInfo.columnKey === 'value' && sortedInfo.order,
    }, {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.description || null,
      onFilter: (value, record) => record.description.includes(value),
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
    }];
    return (
      <div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}