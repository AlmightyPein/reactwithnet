import React, { Component } from 'react';
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownItem, DropdownButton, UncontrolledDropdown, DropdownToggle, DropdownMenu, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './MenuBar.css';

export class MenuBar extends Component {
  static displayName = MenuBar.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }
 

  render () {
    return (
        <header>
            <div>
                
                <Navbar color="dark" expand="md" navbar="true" >
                    <NavbarToggler onClick={function noRefCheck() { }} />
                    <Collapse navbar>
                    <Nav
                        className="ms-auto"
                        navbar
                    >
                        
                        <NavItem><NavLink href="/">Home</NavLink></NavItem>
                            <UncontrolledDropdown
                                inNavbar
                                nav
                            >
                            <DropdownToggle caret nav>Services</DropdownToggle>
                            <DropdownMenu right>
                                    <UncontrolledDropdown
                                        inNavbar
                                        nav
           
                                    >
                                        <DropdownToggle caret nav>Covid Counter</DropdownToggle>
                                        <DropdownMenu>
                                            <NavItem><NavLink href="/services/covcounter">Daily Counter</NavLink></NavItem>
                                            <DropdownItem><NavLink href="/services/covmap">Covid Map</NavLink></DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    
                    <NavItem><NavLink>Privacy</NavLink></NavItem>
                        <NavItem><NavLink>About</NavLink></NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>

              
            </div>
            
            
      </header>
    );
  }
}
