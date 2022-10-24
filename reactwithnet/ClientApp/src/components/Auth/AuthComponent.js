import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { timeout } from "workbox-core/_private";

export default function AuthComponent(props) {
    const [auth, setAuth] = useState(false);
    const [loaded, setLoaded] = useState(true);
    
    axios.get('/api/auth/CheckAuth', { withCredentials: true }).then((response) => { response.data == true ? setAuth(true) : setAuth(false); setLoaded(false) }).catch((error) => { console.log(error.response); setLoaded(true); setAuth(false); }) 
    
    switch (props.reverse) {

        case true:
            if (auth)
                return null;
            else
                return props.children;

            console.log("asd");
        case false:
            if (auth)
                return props.children;
            else
                return null;
    }
}
