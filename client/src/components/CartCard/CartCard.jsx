import style from './CartCard.module.css'


export default function CartCard ({id, name, image, rating, price, onClose}) {
    return (
        <div >
        <div key={id} className={style.userbody} >
            <img className={style.pic} src={image ? image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt={'u.img'}></img>
            <div>
                <p>{name}</p>
                <p>Rating: {rating}</p>
            </div>
            <div>
                <p>Price: {price}</p>
            </div>
            <button onClick={onClose} className="btn btn-sm btn-danger">X</button>
        </div>
    </div>
    );
};
