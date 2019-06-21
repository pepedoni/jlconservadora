import React, { Component } from 'react'

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import BirthdaysMonth from './birthdaysMonth'
import RandomCard from './randomCard'
import { Row, Col } from "antd";

class Dashboard extends Component {
    render() {
        return (
          <div className="top-dashboard">
            <Row className="row-dashboard" gutter={8}>
              <Col className="gutter-row ant-card-body-dashboard" md={8}>
                <BirthdaysMonth></BirthdaysMonth>
              </Col>    
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

