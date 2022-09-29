import React from "react";
import './CreateUser'
import { useState } from "react";
import axios from 'axios';


export default function CreateUser() {

    const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
})

const [error, setError] = useState({})

let handleChange = (e) => {
    setInput({
       ...input,
       [e.target.name]: e.target.value
    });
    setError(validate({
       ...input,
       [e.target.name]: e.target.value
    }))}

    let handleClick = (e) => {
    e.preventDefault()
    if(!input.name || !input.email || !input.password) return
    else{
        (async () => {
        const response = await axios({
                method:'post',
                url:'http://localhost:3001/users',
                data: input
            })
            console.log(response)
        })()
    }}
    console.log(input)
    return(
        <form>
        <h1 className="texto">Create User</h1>
        <br />
        <div>
            <label className='texto'>Nombre:</label>
            <br />
            <input className={error.name && 'danger'} type='text' name="name" onChange={handleChange} value={input.name}/>
            {error.name && 
            <p className="danger">{error.name}</p>
            }
        </div>
        <br />
        <div>
            <label className='texto'>Email:</label>
            <br />
            <input className={error.email && 'danger'} type='text' name="email" onChange={handleChange} value={input.email}/>
            {error.email && 
            <p className="danger">{error.email}</p>
            }
        </div>
        <br />
        <div>
            <label className='texto'>Password:</label>
            <br />
            <input className={error.password && 'danger'} type='password' name="password" onChange={handleChange} value={input.password}/>
            {error.password && 
            <p className="danger">{error.password}</p>
            }
        </div>
        <br />
        <div>
         <button onClick={handleClick}>Registrarse</button>
        </div>     
        <br/>
        </form>
    )
}

const validate = (input) => {
    let error = {};
    if(!input.name){
        error.name = 'Se necesitan datos'
    }else if(!/^[a-zA-Z\s]*$/.test(input.name)){
        error.name = 'El dato ingresado no es valido'
    }
    if(!input.email){
        error.email = 'Se necesitan datos'
    }else if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.email)){
        error.email = 'El dato ingresado no es valido'
    }
    if(!input.password){
        error.password = 'Se necesitan datos'
    }else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.password)){
        error.password = 'El dato ingresado no es valido'
    }
    return error
}