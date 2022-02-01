import { get, getJSON } from 'jquery';
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './CovidCounter.css';


export class CovidCounter extends Component {
    static displayName = this.name;
    constructor(props) {
        super(props);
        this.state = { CovidData: [], loading: true };
    }

    componentDidMount() {
        this.populateCovidData();
    }
    calcPercentage(a, b) {
        return (a - b) * 100 / a;
    }

    render() {
        let content = this.state.loading ? null : this.state.CovidData;
        
        if (content != null) {
            let indiaCovData = content.at(-1);
            return (
                
                    <Row>
                    <Col className="col-counter">
                        <p>Active Cases{(indiaCovData.active > indiaCovData.new_active) ? <label class="positive">(▼)</label> : <label>(▲)</label>}</p>
                        <h3>{content.at(-1).new_active} ({indiaCovData.new_active > indiaCovData.active ?
                            <label class="negative">{(Math.abs(this.calcPercentage(indiaCovData.active, indiaCovData.new_active))).toFixed(2)}%</label> :
                            <label class="positive">{(Math.abs(this.calcPercentage(indiaCovData.active, indiaCovData.new_active))).toFixed(2)}%</label>})
                        </h3>
                        
                    </Col>
                    <Col className="col-counter">
                        <p>Positive Cases{(indiaCovData.positive > indiaCovData.new_positive) ? <label class="positive">(▼)</label> : <label class="negative">(▲)</label>}</p>
                        <h3>{content.at(-1).new_positive} ({indiaCovData.new_positive > indiaCovData.positive ?
                            <label class="negative">{(Math.abs(this.calcPercentage(indiaCovData.positive, indiaCovData.new_positive))).toFixed(2)}%</label> :
                            <label class="positive">{(Math.abs(this.calcPercentage(indiaCovData.positive, indiaCovData.new_positive))).toFixed(2)}%</label>})
                        </h3>

                    </Col>
                    <Col className="col-counter">
                        <p>Cured Cases{(indiaCovData.cured > indiaCovData.new_cured) ? <label class="negative">(▼)</label> : <label class="positive">(▲)</label>}</p>
                        <h3>{content.at(-1).new_cured} ({indiaCovData.new_cured > indiaCovData.cured ?
                            <label class="positive">{(Math.abs(this.calcPercentage(indiaCovData.cured, indiaCovData.new_cured))).toFixed(2)}%</label> :
                            <label class="negative">{(Math.abs(this.calcPercentage(indiaCovData.cured, indiaCovData.new_cured))).toFixed(2)}%</label>})
                        </h3>

                    </Col>
                    <Col className="col-counter">
                        <p>Deaths{(indiaCovData.death > indiaCovData.new_death) ? <label class="positive">(▼)</label> : <label class="negative">(▲)</label>}</p>
                        <h3>{content.at(-1).new_death} ({indiaCovData.new_death > indiaCovData.death ?
                            <label class="negative">{(Math.abs(this.calcPercentage(indiaCovData.death, indiaCovData.new_death))).toFixed(2)}%</label> :
                            <label class="positive">{(Math.abs(this.calcPercentage(indiaCovData.death, indiaCovData.new_death))).toFixed(2)}%</label>})
                        </h3>

                    </Col>
                        </Row>
                    
                
            )
        }
        else {return(<h3>loading...</h3>)}
    }
    async populateCovidData() {
        const response = await fetch('https://www.mohfw.gov.in/data/datanew.json');
        const data = await response.json();
        this.setState({ CovidData: data, loading: false });
        
    }
}