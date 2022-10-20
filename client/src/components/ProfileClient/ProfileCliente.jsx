import React, {useContext} from "react";
import jwtDecode from "jwt-decode";
import Style from "./profileClient.module.css";
import Newsletter from "../Newsletter/Newsletter";
// import { UserContext } from "../../Context/UserContext";
//import ProfileClient from "./ProfileClient.jsx";
//import { useDispatch, useSelector } from "react-redux";
//import { deleteUsers, getAllUsers } from "../../redux/actions";
import { UserContext } from '../../Context/UserContext';
import { useLocalStorage } from '../../customhooks/useLocalStorage';


export default function Profile () {

    const { value, setValue, setCart } = useContext(UserContext);
    const [token, setToken] = useLocalStorage('logged', '');

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
    console.log(decodedtoken)}

    function handleSignout() {
        document.cookie = 'token=';
        setToken(false);
        setValue(false);
        setCart([]);
      }
    
        return (
 
            <div className={Style.userbody}>
                <div className={Style.photoContainer}>
                <img className ={Style.img}src={decodedtoken.image || decodedtoken.picture} alt="No hay imagen" />
                </div>
                <div>
                <p className= {Style.name}><b>Name:</b> {decodedtoken.name}</p>
                <p className= {Style.email}><b>Email: </b>{decodedtoken.email}</p>
                <Newsletter/>
                <button className ={Style.buttonsigout} onClick={handleSignout}>Sign Out</button>
                </div>
            </div>
        )
    };


    
    /* const dispatch = useDispatch();
   // const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConected = users.find(user => user.id === user_login.id)
     */