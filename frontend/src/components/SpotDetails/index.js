import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
//import { deleteSpot } from "../../store/spots";
//import SpotReviews from "../SpotReview";
import { getReviews } from "../../store/review";
import './SpotDetails.css';


const SpotDetails = () => {
    const { spotId } = useParams();
    //console.log(+spotId)
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId)
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)


    useEffect(() => {
        dispatch(getOneSpot(+spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);


    if (!Object.keys(spot).length) return null;


    // const spothandleClick= async() => {
    //     await dispatch(deleteSpot(spotId))
    //     history.push('/')
    // }

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
            <div className="single-spot-description">
                {spot.description}
            </div>
            <section> Reviews:
                <br></br>
                <div>
                    {reviews.map( ele => (
                    <div key={ele}>
                        <div>
                        <i className="fa-solid fa-star"></i>{ele.stars}
                        {ele.User.firstName}
                        </div>
                        <div>
                        {ele.createdAt.slice(0,10)}
                        </div>
                        <div>
                        {ele.review}
                        </div>

                    </div>
                    ))}
                </div>
            </section>
            {/* <Link to={`/spots/${spotId}/add-image`}>
                Add SpotImages
            </Link> */}
            <div>
                {currentOwner !== sessionUser?.id
                ?
                <Link to={`/spots/${spotId}/new-review`}>
                    <button>Create Review</button>
                </Link>
                : null
                }
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
