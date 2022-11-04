import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/review';

const SpotReviewForm = ({ spot }) => {
    const history = useHistory();
    const reviews = useSelector((state) => state.reviews.spot);
    const reviewsArr = Object.values(reviews)
    const spotId = spot.id

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);


    if (!reviewsArr.length) return <h2>waiting for reviews</h2>;

    return (
        <>
        <div id="inside-spot-reviews">
            <div className="single-spot-avgStarRating">
                <i className="fa-solid fa-star"></i>
                <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
            </div>
            <div>
                <span id='dots'>•</span>
            </div>
            <div className="single-spot-numReviews">{spot.numReviews} reviews</div>
        </div>
        <div className="spotdetails-review-wrap">
            {reviewsArr.map( review => (
                <div key={review} className="spotdetails-review-details">
                    <div className="spotdetails-review-creators">
                        {review.User?.firstName}
                    </div>
                    <div className="spotdetails-review-date">
                        {new Date(review.createdAt).toString().slice(3, -42)}
                    </div>
                    <div className="spotdetails-review-contents">
                        {review.review}
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}


export default SpotReviewForm;
