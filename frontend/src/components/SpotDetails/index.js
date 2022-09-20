import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spots";
import './SpotDetails.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    //console.log(+spotId)
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot)
    const img = spot.SpotImages.map(img => img.url)
    console.log('in spotdetails+++++', img)

    useEffect(() => {
        dispatch(getOneSpot(+spotId))
    }, [dispatch, spotId])

    if (!spot) return null;

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
                {/* {spot.spotImages.map(img => (
                    <img  src={img.url} alt={img.url} className='spot-details--img'/>
                )
                )} */}
                <img src={img}/>
            </div>
            <div className="single-spot-description">
                {spot.description}
            </div>

        </div>
    )

}

export default SpotDetails
