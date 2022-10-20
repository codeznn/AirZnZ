import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteSpot } from "../../store/spots";
import './userSpots.css'

const UserSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const spotsObj = useSelector(state => state.spots.allSpots);
    //console.log("in UserSpots--spotsObj", spotsObj)

    const spotsArr = Object.values(spotsObj)
    //console.log("in UserSpots--spotsArr", spotsArr)

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch]);

    if (!spotsArr.length) return (
        <div className="no-spots">
           Sorry, you are not hosting any Spots!
       </div>
    )
    const spothandleClick= async(spotId) => {
        await dispatch(deleteSpot(spotId))
        history.push('/my-spots')
    }

return (
    <>
        <div className='user-myspots'>
            <h1>My Spots</h1>
        </div>
        <div className="myspot-outer-container">
            {spotsArr.map(spot => (
                <div key={spot.id} className="spot-card-outer">
                    <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none'}} className="link--spot">
                        <div className="myspot-img-div">
                            <img src={spot.previewImages} alt={spot.name} className='myspot-img'/>
                        </div>

                        <div className="myspot-info">
                                    <div className="myspot-info-top">
                                        <span className="myspot-location">
                                            {spot.city}{`, `}{spot.state}
                                        </span>

                                        <div className="myspot-avgRating">
                                            <i className="fa-solid fa-star"></i>{' '}
                                            <span>{!Number(spot.avgRating) ? "New" : Number(spot.avgRating).toFixed(1)}</span>
                                        </div>
                                    </div>

                            <div className="myspot-price-container">
                                <div>
                                    <span className="myspot-price-span">{`$${spot.price}`}</span>{' '}
                                    night
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    <div className="myspot-button-container">
                        <Link to={`/spots/${spot.id}/edit`} spots={spotsObj}>
                            <button className="myspot-button">Edit Spot</button>
                        </Link>
                        <button onClick={() => spothandleClick(spot.id)} className="myspot-button">Delete Spot</button>
                    </div>

                </div>
            ))}

        </div>
    </>
)
};

export default UserSpots;
