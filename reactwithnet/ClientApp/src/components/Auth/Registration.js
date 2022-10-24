import React, { Component, createRef, useRef } from 'react';
import { Container, Form, FormGroup, Label, Input, Col, Row, Button, FormFeedback } from 'reactstrap';
import { PersonFill, EnvelopeFill,ArrowRepeat, KeyFill } from 'react-bootstrap-icons';
import "./Registration.css";
import axios from 'axios';

export class Registration extends Component {
    static displayName = this.name;



    constructor(props) {
        super(props)
        this.state = { usr:"", email:"", pwd:"", c_pwd:"", pwd_matched:false }
        this.usr = React.createRef();
        this.email = React.createRef();
        this.pwd = React.createRef();
        this.c_pwd = React.createRef();
        this.sendData = this.sendData.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.pwd_matched = false;
        this.tos = createRef();
}
 
  
   sendData(e) {
       e.preventDefault();
       console.log(this.usr.current.value);
       const UserData = {

            Username: this.usr.current.value,
            Email: this.email.current.value,
            Password: this.pwd.current.value,
            ConfirmPassword: this.c_pwd.current.value,
            TosConsent: this.tos.current.checked,

        }
       console.log(typeof (UserData.Username));


       //http POST: To Register User
        axios.post('/api/auth/register',
            UserData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
            console.log(response);
            console.log("bruh");
        })
            .catch(function (error) {
                console.log(error.response);
                console.log(error.request);
            });

       console.log(this.tos.current.checked)

    }

    validatePassword(e) {
        if (this.pwd.current.value != e.target.value ) {

            e.target.setCustomValidity("Password didn't match");

        }
        else {
            e.target.setCustomValidity("");
            console.log("yes")
        }

    }
    checkUniqueUser(e)
    {
           axios.post('/api/auth/isUniqueUser',e.target.value, {
            headers: {
                'Content-Type': 'application/json'
            }
           }).then(res => { if(!res.data)e.target.setCustomValidity("User Already Exists") }).catch(err=>console.log(err.response))
        }
    render() {

        return (

            <Container fluid >
                
                <Container fluid className="main">
                    <Row className="border-rounded">
                        <Col>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" /> </Col>
                        <Col className="justify-content-center" sm={5}>

                                <h2 className="pb-3">Sign Up</h2>

                            <Form onSubmit={this.sendData}>
                            
                            <FormGroup>
                                    <Container className="test">
                                    <PersonFill class="icon"  />
                               
                                        <Input required onChange={this.checkUniqueUser} innerRef={ this.usr }placeholder="Username" id="username" type="text" />

                                </Container>
                                
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                    <Container className="test">
                                        <EnvelopeFill class="icon"/>
                                   
                                        <Input required innerRef={this.email} placeholder="E-mail" id="email" type="email" >
                                            
                                        </Input>
                                        
                                    </Container>

                                </FormGroup>
                                <br/>
                            <FormGroup>
                                    <Container className="test">
                                        <KeyFill class="icon" />

                                        <Input required innerRef={this.pwd} placeholder="Password" id="pwd" type="password" >
                                            
                                        </Input>
                                        
                                    </Container>

                                </FormGroup>
                                <br/>
                            <FormGroup>
                                    <Container className="test">
                                        <ArrowRepeat class="icon" />

                                        <Input required onChange={this.validatePassword}

                                            onInvalid={(e) =>
                                        {
                                            //sets the custom error message
                                           if( e.target.value == "" ) e.target.setCustomValidity("Password can not be empty ")
                                        }}
                                            innerRef={this.c_pwd} placeholder="Repeat Password" id="rep-pwd" type="password" />
                                    
                                        </Container>
                                </FormGroup>
                                    <br />
                                <Container className="test tos">
                                    <Input onChange={(e) => { e.target.checked ? e.target.setCustomValidity("") : e.target.setCustomValidity("You must accept TOS to use our services")} } innerRef={ this.tos } type="checkbox" for="tos" id="tos-input" />
                                    <Label id="tos">&nbsp; I agree to all the&nbsp;<a color="primary" href="">Terms of service</a> </Label>
                                </Container>
                                
                                <Container className="test btn">
                                    
                                    <Button type="submit"  id="submit" color="primary" >Register</Button>
                                    </Container>
                            </Form>
                           
                        </Col>
                   
                    </Row>
                    
                </Container>
              </Container>
            )
    }
}