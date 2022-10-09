import React /* { useEffect } */ from "react";
import style from "./profileClient.module.css";
//import ProfileClient from "./ProfileClient.jsx";
//import { useDispatch, useSelector } from "react-redux";
//import { deleteUsers, getAllUsers } from "../../redux/actions";

export default function Profile () {

    /* const dispatch = useDispatch();
   // const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConected = users.find(user => user.id === user_login.id)
     */
    
        return (
 
            <div className={style.mainContainer}>
                <h1>Profile</h1>
                {/* {userConected ? (
                    <div className={style.containCarry}>
                        <div>
                            <ProfileClient
                                email={userConected.email}
                                name={userConected.name}
                                lastName={userConected.lastName}
                                image={userConected.image}
                                address={userConected.address}
                                isAdmin={userConected.isAdmin}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="cards">
                        <p>
                            <b>{"No found Profile"}</b>
                        </p>
                    </div>
                )
                } */}
            </div>
        )
    };
