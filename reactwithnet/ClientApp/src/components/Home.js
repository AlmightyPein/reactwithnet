import React, { Component } from 'react';
import './Home.css';
import { Jumbotron, Row, Col, Container, Carousel, CarouselItem, CarouselIndicators, CarouselCaption, CarouselControl } from 'reactstrap';
import { CovidCounter } from './Services/CovidCounter';
import { CovidMap } from './Services/CovidMap';
import CoronaBackground from './Services/CoronaBackground';
import VaccBG from '../Assets/vacc.jpg';
export class Home extends Component {
  static displayName = Home.name;
    
       
  render () {
      return (

          <Container fluid className="banner">

              <div fluid className="flex flex-col max mb-[-90] " >
                  <div className=''><img src={VaccBG} className='h-fit'/></div>
                  <div className='absolute'></div>
                  <div className='absolute flex-auto text-black px-3'>
                  
                  <p className='  text-white' style={{ maxWidth:'40vw', color: 'whitesmoke', opacity: 0.9, fontSize: '17px', Size: '30%', lineHeight: 2 }}>
                      Find reliable information about COVID-19 pandemic <br /> and use our AI tool for disease detection.<br />
                      All the data is provided using government <br /> sources and is Verified.
                      </p>
                      
                  </div>
                  
                  
              </div>
              <Container fluid >
                  
                  <CovidCounter />
                  <div className='flex flex-column'>
                      <CovidMap />
                  </div>
              </Container>

              
              
              
          </Container>
          

          
          
              
            



    );
  }
}
