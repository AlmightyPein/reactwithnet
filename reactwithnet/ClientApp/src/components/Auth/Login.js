import { Component, createRef } from 'react';
import './Registration.css';
import { Container, Form, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import { PersonFill, EnvelopeFill, ArrowRepeat, KeyFill } from 'react-bootstrap-icons';
import  axios  from 'axios';
export class Login extends Component
{
    constructor(props) {
        super(props);
        this.username = createRef();
        this.password = createRef();
        this.sendData = this.sendData.bind(this);
    }
    sendData(e) {
        e.preventDefault();
        const LoginData = {
            Username: this.username.current.value,
            Password: this.password.current.value
        }
        axios.post('api/auth/login',
            LoginData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => { console.log(response) }).catch((error) => { console.log(error.response) });
    }
    render() {
        return (
            <Container fluid >

                <Container fluid className="main">
                    <Row className="border-rounded">
                        <Col>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" /> </Col>
                        <Col className="justify-content-center" sm={5}>

                            <h2>Login</h2>

                            <Form onSubmit={this.sendData}>

                                <FormGroup>
                                    <Container className="test">
                                        <PersonFill class="icon" />

                                        <Input innerRef={ this.username} required placeholder="Username" id="username" type="text" />
                                     </Container>

                                    
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Container className="test">
                                        <KeyFill class="icon" />

                                        <Input innerRef={this.password} required placeholder="Password" id="pwd" type="password" >

                                        </Input>

                                    </Container>

                                </FormGroup>
                               
                                
                                
                                <Container className="test btn">

                                    <Button type="submit" id="submit" color="primary">Login</Button>
                                </Container>
                            </Form>

                        </Col>

                    </Row>

                </Container>
            </Container>

            )
    }
}