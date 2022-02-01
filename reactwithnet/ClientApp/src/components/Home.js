import React, { Component } from 'react';
import './Home.css';
import { Jumbotron, Row, Col, Container, Carousel, CarouselItem, CarouselIndicators, CarouselCaption, CarouselControl } from 'reactstrap';
import { CovidCounter } from './Services/CovidCounter';
import { CovidMap } from './Services/CovidMap';

export class Home extends Component {
  static displayName = Home.name;
    
       
  render () {
      return (

          <Container fluid className="banner">

              <Row fluid className="img">
                  <h1 style={{ color: 'white' }}>Covid 19 Info</h1>
                  <p style={{ color: 'whitesmoke', opacity: 0.7, fontSize: 15, Size: '30%', lineHeight: 2 }}>
                      Our goal is to provide each and every <br /> person with right data at right time.<br />
                      All the data is provided using government <br /> sources and is Verified.
                  </p>
                  

              </Row>
              <Container fluid className="container-full">
                  <CovidCounter />
                  <CovidMap />
              </Container>

              
              
              
          </Container>
          

          
          
              
            



    );
  }
}
