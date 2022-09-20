import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import './SpotsItems.css'

const SpotsItems = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => (Object.values(state.spots.allSpots)))
    console.log("in SpotsItems", spots)


    useEffect(() => {
        dispatch(getAllSpots)
    }, [dispatch])

    if (!spots) return null;

    return (
            <div className="spots-wrapper">
                { spots.map(spot => (
                    <div key={spot.id} className="spot-card">
                        <SpotCard spor={spot} />
                    </div>
                )
                )}
            </div>
    )

}


export default SpotsItems;
