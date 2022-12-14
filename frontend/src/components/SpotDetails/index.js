import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { getReviews } from "../../store/review";
import './SpotDetails.css';
import aircover from './aircover.png';
import SpotReviewFormModal from "../SpotReviewForm";


const SpotDetails = () => {
    const { spotId } = useParams();
    //console.log(+spotId)
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    //console.log('in spotDetails--sessionUser', sessionUser)
    const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId)
    const spot = useSelector(state => state.spots.singleSpot)
    const reviewsObj = useSelector(state => state.reviews.spot)
    const reviewsArr = Object.values(reviewsObj)
    //console.log('in spotDetails-reviews', reviewsArr)


    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);


    if (!Object.keys(spot).length) return null;
    if (!reviewsArr) return null;


    return (
        <div className="single-spot-wrapper">
             <h1 className="spot-name">{spot.name}</h1>

            <div className="single-spot-content">
                <div className="single-spot-avgStarRating">
                    <i className="fa-solid fa-star"></i>
                    <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                </div>
                <div>
                    <span id='dots'>•</span>
                </div>
                {/* <div className="single-spot-numReviews">{spot.numReviews} reviews</div> */}
                <div className="single-spot-numReviews">
                    <SpotReviewFormModal spot={spot} />
                </div>
                <div>
                        <span id='dots'>•</span>
                </div>
                <div className="single-spot-address">
                    {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>

            <div className='spot-images'>
                    <div className='spot-imgs-prview'>
                        {/* {spot.SpotImages.map(img => ( */}
                        <img className="preview-img" src={spot?.SpotImages[0]?.url} alt={spot?.SpotImages[0]?.url} />

                    </div>
                    <div className='spot-imgs-continer'>
                        <img src={spot.SpotImages[1] ? spot.SpotImages[1].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img" />
                        <img src={spot.SpotImages[2] ? spot.SpotImages[2].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img" />
                        <img src={spot.SpotImages[3] ? spot.SpotImages[3].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img" />
                        <img src={spot.SpotImages[4] ? spot.SpotImages[4].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img" />

                    </div>
            </div>

            <div className='spot-details-scroll'>
                <div className="one-spot-details">
                    <div className="host-div">
                        Entire home hosted by {spot.Owner?.firstName}
                    </div>
                    <div className='descriptionbreak'></div>
                    <div className="aircover">
                        <img src={aircover} alt={aircover.png}></img>
                        <div className="cover-info">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                    </div>
                    <div className='descriptionbreak'></div>
                    <div className="single-spot-description">
                        {spot.description}
                    </div>
                </div>
                <div className="price-review-side-div-container">
                    <div className="price-review-side-div">
                        <div className="price-side-div">
                            <span className='border-number'>{`$${spot.price}`}</span>
                            <span className='border-night'> night</span>
                        </div>

                        <div className='review-side-div'>
                            <i className="fa-sharp fa-solid fa-star"></i>
                            <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                            <span className='dots'> • </span>
                            <span className='numReviews'><SpotReviewFormModal spot={spot} />
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div className='descriptionbreak'></div>


            <div className="spotdetails-reviews">
                <div className="spotdetails-review-div">
                    <div className="spotdetails-avgRating">
                        <i className="fa-solid fa-star"></i> {' '}
                        <span>{!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                        <span id='dots'> • </span>
                        <span>{spot.numReviews} review(s)</span>
                    </div>
                </div>
                <div>
                    {sessionUser && currentOwner !== sessionUser?.id
                    ?
                    <Link to={`/spots/${spotId}/new-review`}>
                        <button className="spotdetails-review-button">Review this spot</button>
                    </Link>
                    : null
                }
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
            </div>

        </div>
    )

}

export default SpotDetails
