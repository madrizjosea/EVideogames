import React from "react";
import './CreateUser'
import { useState } from "react";
import axiosInstance from "../../axios";
import { Image } from 'cloudinary-react';
import Style from "./CreateUser.module.css";

export default function CreateUser() {
    const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    image: ''
})
const [result, setResult] = useState('')
const [image, setImage] = useState('')
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
                await axiosInstance({
                method:'post',
                url:'/users',
                data: input
            })
            .then((response) => setResult(response.status))
        })()
    }}

const uploadImage = (files) => {
        files.preventDefault()
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'uk5jmzhu')
        axiosInstance.post('https://api.cloudinary.com/v1_1/dnf3cz1f3/image/upload', formData)
        .then((response) => setInput({
            ...input,
            image: `https://res.cloudinary.com/dnf3cz1f3/image/upload/v1664485387/${response.data.public_id}.png`
        }))  
    }
    
   
    return(
        <form>
        <div className={Style.cointainer}>
        <h1 className={Style.textoUser}>Create User</h1>
        <br />
        <input className="texto" type='file' onChange={(event) => {event.preventDefault()
            setImage(event.target.files[0])
            }}/>
        <button className= {Style.ImgLoad} onClick={uploadImage}>Subir Imagen</button>
        <Image 
        style={{width: 200}} 
        cloudName='dnf3cz1f3' 
        publicId = {input.image}/>
        <div>
            <label className={Style.textoNombre}>Nombre:</label>
            <br />
            <input className={error.name && 'danger'} type='text' name="name" onChange={handleChange} value={input.name}/>
            {error.name && 
            <p className="danger">{error.name}</p>
            }
        </div>
        <br />
        <div>
            <label className={Style.textoEmail}>Email:</label>
            <br />
            <input className={error.email && 'danger'} type='text' name="email" onChange={handleChange} value={input.email}/>
            {error.email && 
            <p className="danger">{error.email}</p>
            }
        </div>
        <br />
        <div>
            <label className={Style.textoPassword}>Password:</label>
            <br />
            <input className={error.password && 'danger'} type='password' name="password" onChange={handleChange} value={input.password}/>
            {error.password && 
            <p className="danger">{error.password}</p>
            }
        </div>
        <br />
        <div>
         <button className={Style.register} onClick={handleClick}>Registrarse</button>
        </div>     
        {result===201 && <p className="danger">El mail ya esta asociado a una cuenta</p>}
        {result===200 && <p className="texto">Usuario creado exitosamente</p>}
        <br/>
        </div>
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