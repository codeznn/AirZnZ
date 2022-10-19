import { useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, updateSpot } from '../../store/spots';


const UpdateSpotForm = (spots) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams();
    console.log('in editform-spotId', spotId)
    // const sessionUser = useSelector((state) => state.session.user.id);
    // const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId)
    const spot = useSelector((state) => state.spots.allSpots[spotId])

    // console.log('in editform-spotsObj', spotsObj)
    // const spot = spotsObj[spotId]
    console.log('in editform-spot', spot)

    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [country, setCountry] = useState(spot?.country)
    const [lat, setLat] = useState(spot?.lat)
    const [lng, setLng] = useState(spot?.lng)
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState([])

    // if (!sessionUser) {
    //     alert("You need to logged in first!");
    //     return <Redirect to="/" />;
    // }
    // if (currentOwner !== sessionUser) {
    //     alert("You are not the owner!");
    //     return <Redirect to="/" />;
    // }
    useEffect(() => {
        dispatch(getAllSpots())
    }, []);

    // useEffect(() => {
    //     setAddress(spot?.address);
    //     setCity(spot?.city);
    //     setState(spot?.state);
    //     setCountry(spot?.country);
    //     setLat(spot?.lat);
    //     setLng(spot?.lng);
    //     setName(spot?.name);
    //     setDescription(spot?.description);
    //     setPrice(spot?.price);
    // }, [spot])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = { address, city, state, country, lat, lng, name, description, price,}
        console.log(payload)
        await dispatch(updateSpot(payload, spotId)).then(spotId => history.push('/my-spots'))
        .catch(async (res) => {
            const message = await res.json();
            console.log('in updateSpotForm-message', message.errors)
            const backendErrors = message.errors;
            if (backendErrors.length) {
                setErrors(backendErrors);
                console.log('success')
            }

            console.log('in updateSpotForm-errors', errors)
        });


    }

    const handleCancelClick = () => {
        return history.push('/my-spots');
    };

    return (
        <>
            <div className='create-spot-wrapper'>

                <h1>Update Spot</h1>

                <div className='create-spot-errors'>
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>

                <form className='create-spot-form' onSubmit={handleSubmit}>
                    <div className='address'>
                        <label>
                            Address:
                            <input
                                type="text"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='city'>
                        <label>
                            City:
                            <input
                                type="text"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='state'>
                        <label>
                            State:
                            <input
                                type="text"
                                value={state}
                                required
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='country'>
                        <label>
                            Country:
                            <input
                                type="text"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='lat'>
                        <label>
                            Lat:
                            <input
                                type="text"
                                value={lat}
                                required
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='lng'>
                        <label>
                            Lng:
                            <input
                                type="text"
                                value={lng}
                                required
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='name'>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='description'>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='price'>
                        <label>
                            Price:
                            <input
                                type="text"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='update-spot-wrapper'>
                        <button id='update-spot-button' type='submit'>Submit</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>

                </form>

            </div>
        </>
    )

}

export default UpdateSpotForm;