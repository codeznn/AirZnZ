import './SpotCard.css'

export default function SpotCard ({spot}) {
    return (

        <>

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
        </>





    )
}
