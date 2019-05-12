import { Card } from 'antd';
import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class BirthdaysMonth extends Component {
    render() {
        return (
          <Card>
            <p>Teste</p>
            <p>Teste</p>
            <p>Teste</p>
          </Card>
        )
      }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BirthdaysMonth);

