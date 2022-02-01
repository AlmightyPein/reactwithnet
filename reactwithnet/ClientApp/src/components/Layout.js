import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { MenuBar} from './MenuBar';
import './layout.css'
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <MenuBar />
        <Container fluid className="main-container">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
