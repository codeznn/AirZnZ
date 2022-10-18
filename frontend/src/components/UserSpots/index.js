import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteSpot } from "../../store/spots";

const UserSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const spotsObj = useSelector(state => state.spots.allSpots);
    console.log("in UserSpots--spotsObj", spotsObj)

    const spotsArr = Object.values(spotsObj)
    console.log("in UserSpots--spotsArr", spotsArr)

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch]);

    if (!spotsArr) return (
        <div >
           <h2>Sorry, you are not hosting any Spots </h2>
       </div>
    )
    const spothandleClick= async(spotId) => {
        await dispatch(deleteSpot(spotId))
        history.push('/my-spots')
    }

return (
    <div className='user-spots'>
        <h2>My Spots</h2>
        <div className="spots-wrapper">
                {spotsArr.map(spot => (
                    <div key={spot.id} className="spot-card">
                        <NavLink to={`/spots/${spot.id}`} className="link--spot">
                            <div className="spotCard">
                                <img src={spot.previewImages} alt={spot.name} className='spotcard-img'/>

                                <div className="spotcard-info">

                                    <div className="spotcard-location">
                                        {spot.city}, {spot.state}
                                    </div>

                                    <div className="spotcard-avgRating">
                                        <i className="fa-solid fa-star"></i>
                                        {spot.avgRating}
                                    </div>

                                    <div className="spotcard-price">
                                        {`$${spot.price} `}
                                        <span>night</span>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                        <div>
                            <Link to={`/spots/${spot.id}/edit`} spots={spotsObj}>
                                <button>Edit Spot</button>
                            </Link>
                        </div>
                        <div>
                            <button onClick={() => spothandleClick(spot.id)}>Delete Spot</button>
                        </div>
                    </div>
                ))}
        </div>



    </div>
)


};

export default UserSpots;
