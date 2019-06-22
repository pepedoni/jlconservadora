import { Card } from 'antd';
import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { Statistic, Icon, Row, Col, List, Button } from "antd";
import { connect } from "react-redux";
import moment from 'moment';
import './dashboard.css';

class RandomCard extends Component {

    constructor(props) {
        
        super(props);


    }

    render() {
        return (
            <div className="ant-card-body-dashboard">
                <Card title="Vendas" className="ant-card-body-dashboard" bordered={true}>                
                    <Statistic
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600', fontSize: 60 }}
                        prefix={<Icon type="arrow-up" />}
                        suffix="%"
                    />
                </Card>

            </div>
        )
      }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RandomCard);

