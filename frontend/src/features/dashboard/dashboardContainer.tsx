import { Card } from 'antd';
import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Dashboard extends Component {
    render() {
        return (
          <div>

              <Card>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

