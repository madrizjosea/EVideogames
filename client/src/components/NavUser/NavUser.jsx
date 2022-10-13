// import { BiUser } from "react-icons/bi";
// import { IconContext } from "react-icons";
// import Style from "./navUser.module.css"
// import { useDispatch ,useSelector} from "react-redux";
// // // import { Logout } from "../../redux/actions";
// // // import { useAuth } from "../../context/authContext";

// // function NavUser() {
// //   //login Google
// //   const { logout, user } = useAuth();
// //   const user2 = useSelector((state) => state.user_login);

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       dispatch(Logout());
// //     } catch (error) {
// //       console.error(error.message);
// //     }
// //   };




// //   // login email
// //   const dispatch = useDispatch()

// //   // function OnLogout() {

// //   // }


//   return (
//     <div className={Style.navbar}>
//       <div className={Style.dropdown}>

//         <button className={Style.dropbtn} >
//           <IconContext.Provider value={{ color: 'white', size: '25px' }}>
//             <BiUser />
//           </IconContext.Provider>
//           <i className={Style.fa_fa_caret_down}></i>
//         </button>
//         <div className={Style.dropdown_content}>
//           <a href="#" onClick={handleLogout}>Login</a>
//           <a href="/profile">Profile</a>
//           {user2.id!=undefined && user2.id!=false &&
//           user2.isAdmin!=undefined && user2.isAdmin==true &&
//           <div>
//           <a href="/gestionProducts">Administracion Productos</a>
//           <a href="/usersAdmin">Administracion Usuarios</a>
//           <a href="/orders">Administracion Ventas</a>
//           </div>
//           }
//           {/*<a href="#">Link 2</a>
//           <a href="#">Link 3</a>*/}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavUser;