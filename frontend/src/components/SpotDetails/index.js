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
                <span className="single-spot-avgStarRating">
                <i className="fa-solid fa-star"></i>
                    {spot.avgStarRating}</span>
                <span className="single-spot-numReviews">{spot.numReviews} reviews</span>
                <span className="single-spot-address">{spot.city}, {spot.state}, {spot.country}</span>
            </div>
            <div className="single-spot-imgs">
                {spot.SpotImages.map(img => (
                    <img key={img.url} src={img.url} alt={img.name}/>
                ))}
            </div>
            <div>Entire home hosted by {spot.Owner?.firstName}</div>
            <div>
                <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"></img>
                <div>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
            <div className="single-spot-description">
                {spot.description}
            </div>
            <section>
                <div>
                    <div>
                        <i className="fa-solid fa-star"></i>
                        <span>{!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                        <span id='dots'> • </span>
                        <span>{spot.numReviews} review(s)</span>
                    </div>
                    {reviewsArr.map( review => (
                    <div key={review}>
                        <div>
                        {review.User?.firstName}
                        </div>
                        <div>
                        {new Date(review.createdAt).toString().slice(3, -42)}
                        </div>
                        <div>
                        {review.review}
                        </div>

                    </div>
                    ))}
                </div>
            </section>
            <div>
                {currentOwner !== sessionUser?.id
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
