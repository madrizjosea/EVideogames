import Rating from '@mui/material/Rating';
import style from './ReviewCards.module.css';

export default function ReviewCards({ reviews }) {
  return (
    <div>
      {reviews?.map(r => (
        <div key={r.id} className={style.review}>
          <div className={style.identifyer}>
            <img
            className={style.reviwerImg}
              src={
                r.userImage
                  ? r.userImage
                  : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'
              }
              alt="userImage"
            />
            <div className={style.reviwerName}>{r.username}</div>
          </div>

          <div className={style.reviewData}>
            <Rating
              name="half-rating-read"
              value={r.rating}
              precision={0.5}
              readOnly
            />
            <div className={style.content}>{r.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Rating Component: https://mui.com/material-ui/react-rating/
