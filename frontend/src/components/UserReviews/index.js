import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews } from "../../store/review";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteReview } from "../../store/review";

const UserReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const reviewsObj = useSelector(state => (state.reviews.user));
    const reviewsArr = Object.values(reviewsObj);
    console.log('in UserReviews////', reviewsArr);


    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    const handleDelete = async (reviewId) => {
        await dispatch(deleteReview(reviewId))
    };

    if (!reviewsArr) return (<div className="user-none-reviews">
        <h2>Sorry, you have not created any review yet, please click add a review </h2>
    </div>)

    return (
        <div className="user-review-div">
            <div className='user-review-title'>
                <h2 className="review-title">
                    My reviews
                </h2>
            </div>
            <div className="review-Lists">
                {reviewsArr.map(review => (
                    <div className="review-details" key={review.id}>
                        <div className="review-spot" >
                            <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img>
                        </div>
                        <div className="review-spot-title">
                            {review.Spot?.name === null ? "" : `Review for ${review.Spot?.name}`}
                        </div>
                        <div className="review-contents">
                            {review.review}
                        </div>
                        <div className='review-star'>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <span>{review.stars}</span>
                        </div>
                        <div className="deleteReview-div">
                            <button className="deleteReview-button" onClick={() => handleDelete(review.id)}>Delete Review</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )



};

export default UserReviews;
