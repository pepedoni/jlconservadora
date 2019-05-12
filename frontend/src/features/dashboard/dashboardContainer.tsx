import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BirthdaysMonth from './birthdaysMonth';
import { Row, Col } from "antd";

class Dashboard extends Component {
    render() {
        return (
          <div>
            <Row gutter={8}>
              <Col className="gutter-row" md={8}>
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

