import { Card } from 'antd';
import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// import { LineChart } from "react-chartjs";

const dailySalesChart = { 
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[12, 17, 7, 17, 23, 18, 38]]
  }
};

class Dashboard extends Component {
    render() {
        return (
          <div>

              <Card>
                <p>Teste</p>
                <p>Teste</p>
                <p>Teste</p>
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

