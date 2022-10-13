import React, {useContext} from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from '../../axios';
import jwtDecode from "jwt-decode";
import { useLocalStorage } from "../../customhooks/useLocalStorage";
import { UserContext } from "../../Context/UserContext";
import jwt_decode from "jwt-decode";
import style from './Login.module.css'

export default function Login(){
    const [user, setUser] = useState({})
    const [logginUsername, setLoginUsername] = useState('')
    const [logginPassword, setLoginPassword] = useState('')
    const {value, setValue, setCart} = useContext(UserContext)
    const [errors, setErrors] = useState()
    const [token, setToken] = useLocalStorage('logged', '')

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
           let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1;
               let c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }
    const cookie = getCookie('token')

    console.log('cookies', document.cookie)
    console.log('token', token,'cookie', cookie)
    
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
        let tokencode = getCookie('token')
        
        let decodedtoken = jwtDecode(tokencode)
       
        setToken(decodedtoken)
        setValue(decodedtoken)
        console.log(value)}
     }) 
    }

    function logout(){
        document.cookie= 'token=null'
       
        setToken(false)
        setValue(false)
        setCart([])

        console.log(value)
    }

    function handleSignout(){
        setUser({});
        document.cookie= 'token=null'
        setToken(false)
        setValue(false)
        setCart([])
       
    }

    function handleCallback(response) {
        document.cookie = `token=${response.credential}; path=/; samesite=strict`
        var userObject = jwt_decode(response.credential)
        console.log('Response:' + userObject.name)
        setUser(userObject)
        setValue(userObject)
        setToken(userObject)
        
    }
    console.log(value)

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE,
            callback: handleCallback
        })
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large'}
        )
    }, [token])
    return(
    <div className={style.userbody}>
        {!token 
        ?
        
        <div>
        <h1 className={style.Login} >Login</h1>
        <input placeholder="Email" onChange={e => setLoginUsername(e.target.value)}/>
        <input type='password' placeholder="Password" onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Login</button> 
        </div>
        
        : !token.iss ?
        
        
        
        <button onClick={logout}>Logout</button>
            : 
            <div></div>
    }
        {errors && 
            <p className="danger">{errors}</p>
            }
        
        <div>
        {!token  ?
        <div id="signInDiv"></div>
        : 
        <div></div>
        }
        {token ?
        <button onClick={handleSignout}>Sign Out</button> : 
        <div></div>
        }
        </div>
    
    </div>
    )
}
// document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });