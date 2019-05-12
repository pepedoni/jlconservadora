import { Card } from 'antd';
import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import moment from 'moment';

class BirthdaysMonth extends Component {

    constructor(props) {
        
        super(props);

        var date = new Date();

        this.ano = date.getFullYear();
        this.aniversariantes = [{date: "15/05", name: "Pedro"}, {date: "21/05", name: "João"}];

    }

    getAniversariante(aniversariante) {

        let aniversario = aniversariante.date + "/" + this.ano;

        return (
            <Row gutter={16} style={{ paddingLeft: '30px'}}>
                <Col className="gutter-row" md={20} span={8}>
                    {aniversariante.name}
                </Col>
                <Col className="gutter-row" md={4} span={8}>
                    {this.calculaDiferencaDatas(aniversario) + "  dias"}
                </Col>
            </Row>
        );
    }

    calculaDiferencaDatas(date1){
        //formato do brasil 'pt-br'
        moment.locale('pt-br');
        //setando data1
        var data1 = moment(date1,'DD/MM/YYYY');
        //setando data2
        var data2 = moment(new Date());
        //tirando a diferenca da data2 - data1 em dias
        var diff  = data2.diff(data1, 'days');
        
        return Math.abs(diff) + 1;
    }


    render() {
        return (
            <Card>
                <Card title="Próximos Aniversários" bordered={false}></Card>
                { this.aniversariantes.map(aniversariante => this.getAniversariante(aniversariante)) }
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

