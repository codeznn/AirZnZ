import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews } from "../../store/review";
import { deleteReview } from "../../store/review";
import './userReviews.css'

const UserReviews = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const reviewsObj = useSelector(state => (state.reviews.user));
    const reviewsArr = Object.values(reviewsObj);
    //console.log('in UserReviewsbefore-obj', reviewsObj);
    //console.log('in UserReviewsbefore-Arr', reviewsArr);


    useEffect(() => {
        dispatch(getUserReviews())
    }, [dispatch])

    const handleDelete = async (reviewId) => {
        //console.log("11111")
        //console.log('delete-reviewObj', reviewsObj)
        //console.log('delete-reviewArr', reviewsArr)
        await dispatch(deleteReview(reviewId));
        history.push(`/my-reviews`);
    };

    if (!reviewsArr.length) return (<div className="user-none-reviews">
        <h2>Sorry, you don't have any review! </h2>
    </div>)

    return (
        <div className="myreview-div">
            <div className='myreview-title'>
                My Reviews
            </div>
            <div className="myreview-content">
                {reviewsArr.map(review => (
                    <div className="myreview-details" key={review.id}>
                        {/* <div className="review-spot" >
                            <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img>
                        </div> */}
                        <div className="myreview-spot-title">
                            {review.Spot?.name === null ? "" : `Review for ${review.Spot?.name}`}
                        </div>
                        <div className='myreview-star'>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <span>{review.stars}</span>
                        <div className="myreview-review">
                            {review.review}
                        </div>
                        </div>
                        <div className="myreview-button-container">
                            <button className="myreview-button" disabled={true}>Edit</button>
                            <button className="myreview-button" onClick={() => handleDelete(review.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )



};

export default UserReviews;
