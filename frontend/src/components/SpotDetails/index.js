import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { getReviews } from "../../store/review";
import './SpotDetails.css';


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
    console.log('in spotDetails-reviews', reviewsArr)


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
                <div className="single-spot-numReviews">{spot.numReviews} reviews</div>
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
                        <img src={spot?.SpotImages[0]?.url} alt={spot?.SpotImages[0]?.url} />

                    </div>
                    <div className='spot-imgs-small'>
                        <img src={spot.SpotImages[1] ? spot.SpotImages[1].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="samll-img1" />
                        <img src={spot.SpotImages[2] ? spot.SpotImages[2].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img2" />
                        <img src={spot.SpotImages[3] ? spot.SpotImages[3].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img3" />
                        <img src={spot.SpotImages[4] ? spot.SpotImages[4].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img4" />

                    </div>
            </div>

            <div className='price-review-side-div'>
                    <div className="price-side-div">
                        <span className='s-number'>{`$${spot.price}`}</span>
                        <span className='s-night'> night</span>
                    </div>

                    <div className='review-side-div'>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                        <span className='dots'> • </span>
                        <span className='numReviews'>{spot.numReviews} reviews
                        </span>
                    </div>
            </div>

            <div className="host-div">
                Entire home hosted by {spot.Owner?.firstName}
            </div>

            <div className="aircover">
                <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"></img>
                <div className="cover-info">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
            <div className="single-spot-description">
                {spot.description}
            </div>

            <div className="spot-reviews">
                <div className="review-div">
                    <div className="spot-avgRating">
                        <i className="fa-solid fa-star"></i>
                        <span>{!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                        <span id='dots'> • </span>
                        <span>{spot.numReviews} review(s)</span>
                    </div>

                    <div className="review-wrap">
                        {reviewsArr.map( review => (
                        <div key={review} className="review-details">
                            <div className="review-creators">
                            {review.User?.firstName}
                            </div>
                            <div className="review-date">
                            {new Date(review.createdAt).toString().slice(3, -42)}
                            </div>
                            <div className="review-contents">
                            {review.review}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="review-button">
                {sessionUser && currentOwner !== sessionUser?.id
                ?
                <Link to={`/spots/${spotId}/new-review`}>
                    <button>Create Review</button>
                </Link>
                : null
            }
            {/* <Link to={`/spots/${spotId}/add-image`}>
                Add SpotImages
            </Link> */}
            </div>
            {/* <br></br>
            <div>
                {currentOwner === sessionUser
                ?
                <Link to={`/spots/${spotId}/edit`}>
                <button>Edit Spot</button>
                </Link>
                : null
                }
            </div>
            <div>
                {currentOwner === sessionUser
                ?
                <button onClick={spothandleClick}>Delete Spot</button>
                : null
                }
            </div>
            <br></br> */}
        </div>
    )

}

export default SpotDetails
