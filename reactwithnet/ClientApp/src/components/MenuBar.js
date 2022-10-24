import React, { Component } from 'react';
import { Collapse, Container, ButtonGroup, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownItem, DropdownButton, UncontrolledDropdown, DropdownToggle, DropdownMenu, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './MenuBar.css';
import AuthComponent from './Auth/AuthComponent';
import axios from 'axios';

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
                
                <Navbar  expand="md" color="dark" expand="md" >
                    <NavbarToggler className="navbar-dark" onClick={this.toggleNavbar} />
                    <NavLink className='text-white text-bold'>AI DOCTOR ONLINE</NavLink>
                    <Collapse navbar isOpen={this.state.collapsed}>
                    <Nav
                        className="ms-auto"
                        navbar
                    >
                            
                            <NavItem><NavLink className="navbar-link" href="/">Home</NavLink></NavItem>
                            <UncontrolledDropdown
                                inNavbar
                                nav
                            >
                                <DropdownToggle className="navbar-link focus:text-white pull-right" caret nav>Services</DropdownToggle>
                            <DropdownMenu right className='bg-dark'>
                                    <UncontrolledDropdown
                                        inNavbar
                                        nav
           
                                    >
                                        <DropdownItem className='hover:bg-gray-800'><DropdownToggle className="navbar-link focus:text-white     `" caret nav>Covid Counter</DropdownToggle>
                                        
                                        <DropdownMenu className='bg-dark dropend'>
                                            <DropdownItem className='hover:bg-gray-800'><NavLink className="navbar-link" href="/services/covcounter">Daily Counter</NavLink></DropdownItem>
                                            <DropdownItem className='hover:bg-gray-800'><NavLink className="navbar-link" href="/services/covmap">Covid Map</NavLink></DropdownItem>

                                        </DropdownMenu>
                                        </DropdownItem>
                                        
                                    </UncontrolledDropdown>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    
                            <NavItem><NavLink className="navbar-link">Privacy</NavLink></NavItem>
                            <NavItem><NavLink className="navbar-link">About</NavLink></NavItem>
                            <AuthComponent reverse={true}>
                                <NavItem><NavLink className="navbar-link" href="/register">Register</NavLink></NavItem>
                                <NavItem><NavLink className="navbar-link" href="/login">Login</NavLink></NavItem>
                                
                            </AuthComponent>
                            <AuthComponent reverse={false}><UncontrolledDropdown
                                inNavbar
                                nav
                            >
                                <DropdownToggle  className="focus:text-white navbar-link" caret nav>Account</DropdownToggle>
                                <DropdownMenu right className='bg-dark'>
                                    <UncontrolledDropdown
                                        inNavbar
                                        nav
                                       
                                    >
                                        <div>
                                        <NavItem><NavLink className="navbar-link" href="/dashboard">Dashboard</NavLink></NavItem>
                                        <NavItem><NavLink className="navbar-link" href="/profile">Profile</NavLink></NavItem>
                                        <NavItem><NavLink className="navbar-link" href="/doctor">Doctor</NavLink></NavItem>
                                            <NavItem><NavLink className="navbar-link hover:cursor-pointer" onClick={() => { axios.post('api/auth/logout').then(res => { console.log(res); window.location = "/" }).catch(e=>console.log(e))}}>LogOut</NavLink></NavItem>
                                        </div>

                                        
                                    </UncontrolledDropdown>
                                </DropdownMenu>
                            </UncontrolledDropdown></AuthComponent>


                        </Nav>
                        </Collapse>
                    </Navbar>

              
            </div>
            
            
      </header>
    );
  }
}
