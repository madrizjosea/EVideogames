import React from "react";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useState } from "react";

export default function Login(){
    const [user, setUser] = useState({})
    
    function handleSignout(event){
        setUser({});
        document.getElementById('signInDiv').hidden = false;
    }

    function handleCallback(response) {
        var userObject = jwt_decode(response.credential)
        console.log('Response:' + userObject)
        setUser(userObject)
        document.getElementById('signInDiv').hidden = true;
    }

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id: '621995996270-p9h5r8tc618nuq79hnl1avt92h8pdv8m.apps.googleusercontent.com',
            callback: handleCallback
        })
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large'}
        )
    }, [])
    return(
    <div>
        <h1>Login</h1>
        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignout(e)}>Sign Out</button>
        }
    
    {user && 
    <div>
        <img src={user.picture} alt="" />
        <h3>{user.name}</h3>
    </div>
    }
    </div>
    )
}