import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { o, Redirect, useLocation } from 'react-router-dom';
import { Route } from 'react-router'

const Error = ()=>
{
    return <h2>naruto</h2>
}
const AuthRoute = (props) => {
    
    var [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(

        () => { axios.get('/api/auth/CheckAuth', { withCredentials: true }).then((response) => { response.data == true ? setAuthenticated(true) : setAuthenticated(false); }).catch((error) => console.log(error.response)) }, []
    );
    
    if (!isAuthenticated) {
        return <Route path='/error' component={Error} ></Route>;
    }
    return <Route {...props} />
}
export default AuthRoute;

