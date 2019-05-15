import { Card } from 'antd';
import React, { Component } from 'react'

import { bindActionCreators } from "redux";
import { Row, Col, List, Button } from "antd";
import { connect } from "react-redux";
import moment from 'moment';
import './dashboard.css';

class BirthdaysMonth extends Component {

    constructor(props) {
        
        super(props);

        var date = new Date();

        this.ano = date.getFullYear();
        this.aniversariantes = [{date: "15/05", name: "Pedro"}, {date: "21/05", name: "João"}, {date: "25/05", name: "Germano"}];

    }

    getAniversariante(aniversariante) {

        let aniversario = aniversariante.date + "/" + this.ano;
        let dias = this.calculaDiferencaDatas(aniversario);

        if(dias == 1) {
            return (
                <div>
                    <div className="inline">
                        <b>{aniversariante.name}</b>
                    </div>
                    <div className="inline right">
                        <b>Hoje!</b>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="inline">
                    {aniversariante.name}
                </div>
                <div className="inline right">
                    {this.calculaDiferencaDatas(aniversario) + "  dias"}
                </div>
            </div>
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
            <div>
                <Card title="Próximos Aniversários" bordered={true}>                
                    <List
                        size="small"
                        dataSource={this.aniversariantes}
                        useWindow={false}
                        itemLayout="vertical"
                        renderItem={item => <List.Item>{this.getAniversariante(item)}</List.Item>}
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

export default connect(mapStateToProps, mapDispatchToProps)(BirthdaysMonth);

