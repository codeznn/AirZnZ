import { useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
//import SpotReviews from "../SpotReview";
import { getReviews } from "../../store/review";
import { deleteReview } from "../../store/review";
import CreateReviewForm from "../ReviewForm";
import './SpotDetails.css';


const SpotDetails = () => {
    const { spotId } = useParams();
    //console.log(+spotId)
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user.id || true);
    const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId || false)
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    // const review = reviews.map(ele => {
    //     if (ele.userId === sessionUser) {
    //         return ele
    //     }
    // })
    // const reviewId = review.id
    let reviewId


    // reviews.map(ele => {
    //     console.log('ele', ele.User.id)
    // })
    // console.log('in spotdetails+++++', spot)
    console.log('in spotdetails+++++reviewId', reviews)
    console.log('in spotdetails+++++sessionUser', sessionUser)
    // console.log('in spotdetails+++++', reviews)
    // console.log('in spotdetails+++++', currentOwner)

    useEffect(() => {
        dispatch(getOneSpot(+spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);


    if (!Object.keys(spot).length) return null;


    const reviewhandleClick= async() => {

        await dispatch(deleteReview(+reviewId))
        history.replace('/')
    }
    const spothandleClick= async() => {
        // if (!sessionUser) {
        //     alert("You need to logged in first!");
        //     return <Redirect to="/" />;
        // }
        // if (currentOwner !== sessionUser) {
        //     alert("You are not the owner!");
        //     return <Redirect to="/" />;
        // }
        await dispatch(deleteSpot(spotId))
        history.replace('/')
    }

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
                {currentOwner !== sessionUser
                ?
                <Link to={`/spots/${spotId}/new-review`}>
                    <button>Create Review</button>
                </Link>
                : null
                }
            </div>
            <div>
                {currentOwner !== sessionUser
                ?
                <button onClick={reviewhandleClick}>Delete Review</button>
                : null
                }
            </div>
            <br></br>
            <div>
                {currentOwner === sessionUser
                ?
                <Link to={`/spots/${spotId}/edit`}>
                <button>Update Spot</button>
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
            <br></br>
        </div>
    )

}

export default SpotDetails
