import Rating from '@mui/material/Rating';

export default function ReviewCards({ reviews }) {

    return (
        <div>
            {reviews?.map((r) =>
                <div key={r.id}>
                    <div>
                        <Rating name="half-rating-read" value={r.rating} precision={0.5} readOnly />
                    </div>
                    <div>
                        {r.content}
                    </div>
                </div>
            )}
        </div>
    );
}

// Rating Component: https://mui.com/material-ui/react-rating/ 
