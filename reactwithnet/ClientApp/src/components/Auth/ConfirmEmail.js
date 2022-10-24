import React, { Component, useState } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'reactstrap';
import dancing from '../../Assets/dancing.webp'

export class ConfirmEmail extends Component {
    static displayName = this.name;
    constructor(props) {
        super(props);
        this.state = {isError : true }
        
    }
    componentDidMount() {
        //const name = useParams();
        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var token = url.searchParams.get("token");
        

        console.log(token);
        axios.post('/api/auth/confirmemail', token,
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }

        )
            .then((response) => { console.log(response); this.setState({isError:false}) })
            .catch((error) => { console.log(error.response); this.setState({ isError: true }) });
    }

    render() {
        return (
            <Container>
                {!this.state.isError ? <div className="flex flex-col justify-center align-center"><div className='text-3xl text-center'><b>Congratulations! </b> <div>Your E-mail has been verified</div>
                </div>
                    <img src={dancing} />
                    <Button href="/login" className="">Go to the login page</Button>
                </div> : <div>Something Went Wrong</div>}
                </Container>
            
            
            )
    }

}
