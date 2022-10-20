import style from './DashUserCards.module.css';
import { editUser, deleteUser, getUsers } from '../../redux/actions/user';
import { useDispatch } from 'react-redux';

export default function DashUserCards({ users }) {
  const dispatch = useDispatch();

  function roleChangeHandler(e, role, email, name) {
    if (window.confirm(`Do you want to change ${name}'s role?`)) {
      if (e.target.value && e.target.value !== role) {
        dispatch(editUser(email, { role: e.target.value }));
      }
    }
    e.target.value = 'default';
  }

  function clickHandler(e) {
    if (
      window.confirm(`Do you want to permanently delete user ${e.target.name}?`)
    ) {
      dispatch(deleteUser(e.target.value))
    }
  }

  return (
    <div>
      {users.map(u => (
        <div key={u.email}>
          <div className={style.userbody}>
            <button
              className="prev-next"
              name={u.name}
              value={u.email}
              onClick={e => clickHandler(e)}
            >
              X
            </button>
            <img
              className={style.pic}
              referrerPolicy="no-referrer"
              src={
                u.image
                  ? u.image
                  : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'
              }
              alt={'u.img'}
            ></img>
            <div>
              <p className={style.name}>{u.name}</p>
              <p className={style.email}>Email: {u.email}</p>
            </div>
            <div>
              <label>
                <p className={style.role}>Role: {u.role}</p>
                {u.role ? (
                  <select
                  className={style.selec}
                    key={u.email + 0}
                    onChange={e =>
                      roleChangeHandler(e, u.role, u.email, u.name)
                    }
                    defaultValue="default"
                  >
                    <option
                      
                      key={u.email + 1}
                      value="default"
                      disabled="default"
                      hidden
                    >
                      Select role
                    </option>
                    <option key={u.email + 2} value="admin">
                      Admin
                    </option>
                    <option key={u.email + 3} value="user">
                      User
                    </option>
                  </select>
                ) : null}
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
