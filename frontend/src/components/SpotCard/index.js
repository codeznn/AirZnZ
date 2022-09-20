import './SpotCard.css'
import { Link } from 'react-router-dom'

export default function SpotCard ({spot}) {
    return (
        <div className='spot-link'>
            
        <Link to={`/spots/${spot.id}`} >

            <img src={spot.previewImage} className='spotcard-img'/>

            <div className="spotcard-info">

                <div className="spotcard-location">
                    {spot.city},{spot.state}
                </div>

                <div className="spotcard-avgRating">
                    <i className="fa-solid fa-star"></i>
                    {spot.avgRating}
                </div>

                <div className="spotcard-price">
                    {`$${spot.price} `}
                    <span>/night</span>
                </div>

            </div>
        </Link>


    </div>
    )
}
