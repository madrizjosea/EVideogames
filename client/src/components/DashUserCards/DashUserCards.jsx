import style from './DashUserCards.module.css';
import { editUser , deleteUser } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';

export default function DashUserCards({ users }) {
    
    const dispatch = useDispatch();

    function checkHandler(e) {
        console.log(e.target.value);
       
            dispatch(editUser( e.target.id));
        
    }

    function clickHandler(e) {
        if (window.confirm(`Do you want to permanently delete user ${e.target.name}?`)) dispatch(deleteUser(e.target.value));
    }
    
    return (
        <div >
            {users.map((u) =>
                <div >
                    <div key={u.id} className={style.userbody} >
                        <button name={u.name} value={u.id} onClick={(e)=>clickHandler(e)}>X</button>
                        <img className={style.pic} referrerPolicy="no-referrer" src={u.image ? u.image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt={'u.img'}></img>
                        <div>
                            <p>{u.name}</p>
                            <p>Email: {u.email}</p>
                        </div>
                        <div>
                            <p>Role: {u.role}</p>
                            <label class="switch">
                                <input type="checkbox" id={u.id} value={u.isActive} onChange={(e)=>checkHandler(e)}/>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}