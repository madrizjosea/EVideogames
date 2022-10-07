
export default function DashUserCards({ users }) {
    return (
        <div>
            {users.map((u) =>
                <div>
                    <div key={u.id}>
                        <img src={u.image} alt={'u.img'}></img>
                        <div>
                            <p>{u.name}</p>
                            <p>Role: {u.role}</p>
                            <p>Email: {u.email}</p>
                            <label class="switch">
                                <input type="checkbox"/>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}