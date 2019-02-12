import React, { Component } from 'react'
import { Tabs } from 'antd';
import Table from './table';

const TabPane = Tabs.TabPane;
export default class Pipeline extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Notas Fiscais" key="1"><Table></Table></TabPane>
        <TabPane tab="Produtos" key="2">Contenat Tasdabaaa Pane 2</TabPane>
        <TabPane tab="Impostos" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    )
  }
}