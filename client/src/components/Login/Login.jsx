import React, {useContext} from "react";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import axios from '../../axios';
import { UserContext } from "../../Context/UserContext";

export default function Login(){
    const [user, setUser] = useState({})
    const [logginUsername, setLoginUsername] = useState('')
    const [logginPassword, setLoginPassword] = useState('')
    const {value, setValue} = useContext(UserContext)
    const [errors, setErrors] = useState()
    console.log(logginUsername, logginPassword, document.cookie, value)
    const login = () => {
        
        axios({
            method: 'POST',
            data: {
                email: logginUsername,
                password: logginPassword,
            },
            withCredentials: true,
            url: '/users/login'
        })
        .then((res) =>
       { 
        console.log(res.data.user)   
        if(!res.data.user) { setErrors(res.data.message) }
        else{
        document.cookie = `token=${res.data.token}; max-age=${60 * 1}; path=/; samesite=strict`
        setValue(res.data.user)}
     }) 
    }

    function logout(){
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        setValue(null)
    }

    console.log(value, document.cookie)
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
        <input placeholder="Email" onChange={e => setLoginUsername(e.target.value)}/>
        <input type='password' placeholder="Password" onChange={e => setLoginPassword(e.target.value)}/>
        
        {!value ?
        <button onClick={login}>Login</button> :
        <button onClick={logout}>Logout</button>}
        {errors && 
            <p className="danger">{errors}</p>
            }
        
        {value ? <div>Loggeado</div> : <div>No loggeado</div> }
        
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