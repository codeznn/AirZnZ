import { useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import { Link } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import './SpotDetails.css';


const SpotDetails = () => {
    const { spotId } = useParams();
    //console.log(+spotId)
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUser = useSelector((state) => state.session.user.id);
    // const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId)
    const spot = useSelector(state => state.spots.singleSpot)
    //console.log('in spotdetails+++++', spot)

    useEffect(() => {
        dispatch(getOneSpot(+spotId))
    }, [dispatch, spotId])


    if (!Object.keys(spot).length) return null;



    const handleClick= async() => {
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
            <Link to={`/spots/${spotId}/add-image`}>
                Add SpotImages
            </Link>
            <br></br>
            <Link to={`/spots/${spotId}/edit`}>
                Update Spot
            </Link>
            <br></br>

            <button onClick={handleClick}>Delete Spot</button>




        </div>
    )

}

export default SpotDetails
