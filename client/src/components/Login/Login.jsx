import React, {useContext} from "react";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import axios from '../../axios';
import { useLocalStorage } from "../../customhooks/useLocalStorage";
import { UserContext } from "../../Context/UserContext";
import jwtDecode from "jwt-decode";

export default function Login(){
    const [user, setUser] = useState({})
    const [logginUsername, setLoginUsername] = useState('')
    const [logginPassword, setLoginPassword] = useState('')
    const {value, setValue, setCart} = useContext(UserContext)
    const [errors, setErrors] = useState()
    const [token, setToken] = useLocalStorage('logged', '')

    
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
        if(!res.data.user) { setErrors(res.data.message) }
        else{
        document.cookie = `token=${res.data.token}; path=/; samesite=strict`
        let tokencode = document.cookie.replace('token=', '')
        
        let decodedtoken = jwtDecode(tokencode)
       
        setToken(decodedtoken)
        setValue(decodedtoken)
        console.log(value)}
     }) 
    }

    function logout(){
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        setToken(false)
        setValue(false)
        setCart([])

        console.log(value)
    }

    function handleSignout(event){
        setUser({});
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        setToken(false)
        setValue(false)
        document.getElementById('signInDiv').hidden = false;
    }

    function handleCallback(response) {
        document.cookie = `token=${response.credential}; path=/; samesite=strict`
        var userObject = jwt_decode(response.credential)
        console.log('Response:' + userObject.name)
        setUser(userObject)
        setValue(userObject)
        setToken(userObject)
        document.getElementById('signInDiv').hidden = true;
    }
    console.log(value)

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
        {!token 
        ?
        
        <div>
        <h1>Login</h1>
        <input placeholder="Email" onChange={e => setLoginUsername(e.target.value)}/>
        <input type='password' placeholder="Password" onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Login</button> 
        </div>
        
        :


        <button onClick={logout}>Logout</button>}
        {errors && 
            <p className="danger">{errors}</p>
            }
        
        {token ? <div>Loggeado</div> : <div>No loggeado</div> }
        
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