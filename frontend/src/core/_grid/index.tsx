import React, { Component } from 'react'
import { Table, Card, Button, Pagination } from 'antd';

import request from 'api/request';
import GridHeader from '../_grid_header';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      pagination: {position: 'top', showSizeChanger: true, pageSizeOptions: ['5', '10', '15', '20']},
      loading: false
    }
  }

  componentDidMount() {
    let params = {};
    let filters = {};
    if(this.props.filters) {
      filters = Object.assign(filters, this.props.filters);
      
      params = {
        ...filters
      };
    }
    this.fetch(params);
  }

  componentWillReceiveProps() {
    if(this.props.filter != Array() 
      && this.props.filter 
      && this.props.filter.length != 0) 
      this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    if(this.props.filters) {
      filters = Object.assign(filters, this.props.filters);
    }
    pager.current = pagination.current;
    pager.position =  'top';
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      url: pagination.nextPage,
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  fetch = (params) => {

    if(!params) {
      params = {};
    }
    this.setState({ loading: true });
    
    let url =  this.props.url;

    if(params.page) {
      url += '?page=' + params.page;
      if(params.pageSize) {
        url += '&pageSize=' + params.pageSize;
      }
    }

    const pagination = { ...this.state.pagination };

    request.get(url, { params: params }).then(result => {

      if(result.data) {
        if(result.data.data) {
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = result.data.total;
          pagination.nextPage = result.data.next_page_url; 
          pagination.pageSize = result.data.per_page;
          this.setState({
            loading: false,
            data: result.data.data,
            pagination,
          });
        }
        else {
          this.setState({
            loading: false,
            data: result.data,
            pagination,
          });
        }
      }
      else {
        this.setState({
          loading: false,
          data: result.data,
          pagination,
        });
      }
    }).catch( error => {
        this.setState({
          loading: false,
          data: [],
          pagination,
        });
    });

  }

  updateRow(rowIndex, row) {
    this.state.data[rowIndex] = row;
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
          onClickFilter={this.props.openFilter}
          onReload={this.reload}
          otherButtons={(this.props.otherButtons) ? this.props.otherButtons : []}
          />
        <Card>
          <Table
            columns={this.props.columns}
            // rowKey={record => record.login.uuid}
            dataSource={(this.props.filter === undefined || !! this.props.filter) ? this.state.data : this.props.filter}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange}
            rowKey={this.props.rowKey}
            {...this.props.otherProps}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => { 
                  record.rowIndex = rowIndex;
                  this.props.onRowClick(record);
                }, 
              };
            }}
          >
          </Table>
        </Card>
      </div>
    );
  }
}
