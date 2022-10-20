import React from "react";
import emailjs from "emailjs-com"
import jwtDecode from "jwt-decode";
import { useState } from "react";

export default function Newsletter(){

    const [confirm, setConfirm] = useState(false)
    const [success, setsuccess] = useState(false)

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
    let decodedtoken = ''
    if (cookie){
    decodedtoken = jwtDecode(cookie)
    }

    console.log(decodedtoken)

    const handleClick = (e) => {
        e.preventDefault()
        confirm ?
        setConfirm(false) : setConfirm(true)
    }

    function sendMail(e){
        e.preventDefault();
        emailjs.sendForm('service_ecommerce', process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_PUBLIC_ID)
          .then((result) => {
                setsuccess(true)
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
    }
    console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID)
    return(
        <div>{!success ?
            <div>
                <button onClick={handleClick}>Receive our Newsletter</button>
                {confirm ?
                <form onSubmit={sendMail}>
                    <input hidden type="text" placeholder="name" name='name' value={decodedtoken.name}/>
                    <input hidden type="email" placeholder="email" name='email' value={decodedtoken.email}/>
                    <input hidden type="text" placeholder="subject" name="subject" value='Newsletter'/>
                    <textarea hidden name="message" id="" cols="30" rows="8" value='Subscribe to newsletter'></textarea>
                    <div>
                    <label>Are you sure?</label>
                    <input type="submit" value="Yes"/> 
                    </div>
                    </form>
                    :
                    <div></div>
                    }

            </div>
            : <p>Thank you, check your email!</p>}
        </div>
    )
}