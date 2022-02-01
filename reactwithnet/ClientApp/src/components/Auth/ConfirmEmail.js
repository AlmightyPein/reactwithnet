import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Container } from 'reactstrap';
export class ConfirmEmail extends Component {
    static displayName = this.name;
    constructor(props) {
        super(props);
        
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
         .then((response) => { console.log(response) })
             .catch((error) => { console.log(error.response) });
    }

    render() {
        return (
            <Container>
                  
                </Container>
            
            
            )
    }

}
