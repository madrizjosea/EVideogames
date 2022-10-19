import Rating from '@mui/material/Rating';

export default function ReviewCards({ reviews }) {

    return (
        <div>
            {reviews?.map((r) =>
                <div key={r.id}>
                    <div>
                        <Rating name="read-only" value={r.rating} readOnly />
                    </div>
                    <div>
                        {r.content}
                    </div>
                </div>
            )}
        </div>
    );
}
