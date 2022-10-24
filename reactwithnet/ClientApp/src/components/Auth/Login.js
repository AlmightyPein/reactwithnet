import { Component, createRef } from 'react';
import './Registration.css';
import { Container, Form, FormGroup, Label, Input, Col, Row, Button,Alert} from 'reactstrap';
import { PersonFill, EnvelopeFill, ArrowRepeat, KeyFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class Login extends Component
{
    constructor(props) {
        super(props);
        this.username = createRef();
        this.password = createRef();
        this.sendData = this.sendData.bind(this);
        this.state = {showAlert: false, alertText: ""}
        this.showError = this.showError.bind(this);

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
            }).then((response) =>
            {
                if (response.status == 200) {
                    this.setState({ showAlert: false });
                    this.props.history.push('/dashboard');
                    window.location.reload();
                }
                
            }).catch((error) => {
                if (error.response.status == 400)
                    this.setState({ showAlert: true, alertText: error.response.data })
                else
                    this.setState({ showAlert: false })});
    }
    showError() {
        
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
                            { this.state.showAlert ? <Alert color='danger'>{this.state.alertText}</Alert> : null}
                           
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