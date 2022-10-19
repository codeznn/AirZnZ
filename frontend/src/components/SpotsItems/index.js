import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import SpotCard from "../SpotCard";
import './SpotsItems.css'

const SpotsItems = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => (state.spots.allSpots))
    //console.log("in SpotsItems------", spotsObj)
    const spots = Object.values(spotsObj);


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!spots) return null;

    return (
            <div className="spots-wrapper">
                { spots.map(spot => (
                    <div key={spot.id} className="spot-card-container" style={{ textDecoration: 'none'}}>
                        <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none'}}>
                            <div className="spotcard">
                                <div className="spot-img-div">
                                    <img src={spot.previewImages} alt={spot.name} className='spot-img'/>
                                </div>
                                <div className="spotcard-info">
                                    <div className="spotcard-info-top">
                                        <span className="spotcard-location">
                                            {spot.city}{`, `}{spot.state}
                                        </span>

                                        <div className="spotcard-avgRating">
                                            <i className="fa-solid fa-star"></i>
                                            <span>{!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                                        </div>
                                    </div>

                                    <div className="spotcard-price">
                                        <span>{`$${spot.price} `}{" "}night</span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                )
                )}
            </div>
    )

}


export default SpotsItems;
