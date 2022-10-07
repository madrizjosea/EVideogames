import style from './DashUserCards.module.css'

export default function DashUserCards({ users }) {
    return (
        <div >
            {users.map((u) =>
                <div >
                    <div key={u.id} className={style.userbody} >
                        <img className={style.pic} src={u.image ? u.image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt={'u.img'}></img>
                        <div>
                            <p>{u.name}</p>
                            <p>Email: {u.email}</p>
                        </div>
                        <div>
                            <p>Role: {u.role}</p>
                            <label class="switch">
                                <input type="checkbox" />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}