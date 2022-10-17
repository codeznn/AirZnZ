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
                    <div key={spot.id} className="spot-card-outer" style={{ textDecoration: 'none'}}>
                        <NavLink to={`/spots/${spot.id}`} className="link--spot">
                            <SpotCard key={spot.id}spot={spot} />
                        </NavLink>
                    </div>
                )
                )}
            </div>
    )

}


export default SpotsItems;
