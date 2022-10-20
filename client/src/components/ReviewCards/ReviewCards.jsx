import Rating from '@mui/material/Rating';

export default function ReviewCards({ reviews }) {
  return (
    <div>
      {reviews?.map(r => (
        <div key={r.id}>
          <div>
            <Rating
              name="half-rating-read"
              value={r.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div>{r.content}</div>
          <div>
            <img
              width="25"
              height="25"
              src={
                r.userImage
                  ? r.userImage
                  : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'
              }
              alt="userImage"
            />
            <p>{r.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Rating Component: https://mui.com/material-ui/react-rating/
