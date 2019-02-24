import React, { Component } from 'react'
import { Table, Card, Pagination } from 'antd';

import request from 'api/request';
import GridHeader from '../_grid_header';

export default class App extends Component {
  state = {
    pagination: {position: 'top'},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.position =  'top';
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      url: pagination.nextPage,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    
    let url = (params.page) ? this.props.url + '?page=' + params.page : this.props.url;

    request.get(url).then(result => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = result.data.total;
      pagination.nextPage = result.data.next_page_url; 
      pagination.pageSize = result.data.per_page;
      this.setState({...this.state, pagination});
      this.setState({
        loading: false,
        data: result.data.data,
        pagination,
      });
    });

  }

  
  reload = () =>  {
    if(this.state.pagination) {
      return this.handleTableChange(this.state.pagination, {}, {});
    }
    else {
      return this.fetch({});
    }
  }

  render() {
    return (
      <div> 
        <GridHeader addLabel={'Adicionar ' + this.props.addLabel} 
          onAdd={this.props.onAdd}
          onClickFilter={this.reload}
          onReload={this.reload}
          />
        <Card>
          <Table
            columns={this.props.columns}
            // rowKey={record => record.login.uuid}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowKey={this.props.rowKey}
            onRow={(record) => {
              return {
                onClick: (event) => { this.props.onRowClick(record) }, 
              };
            }}
          />
        </Card>
      </div>
    );
  }
}
