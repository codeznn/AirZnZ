import { useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, updateSpot } from '../../store/spots';
import './EditSpotForm.css'


const UpdateSpotForm = () => {
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

        const payload = { address, city, state, country, name, lat, lng, description, price,}
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
            <div className='eidtspot-wrapper'>
                <div className='editspot-title'>Edit {spot?.name} </div>
                <form className='editspot-form' onSubmit={handleSubmit}>
                <div className='editspot-content'>
                    <div className='editspot-errors'>
                        <ul>
                            {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>

                    <div className='editspot-container-outer'>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                Address
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={address}
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                City
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={city}
                                    required
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                State
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={state}
                                    required
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                Country
                                <br></br>
                                <input  className='edit-input'
                                    type="text"
                                    value={country}
                                    required
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                Lat
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={lat}
                                    required
                                    onChange={(e) => setLat(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                Lng
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={lng}
                                    required
                                    onChange={(e) => setLng(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                Name
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container'>
                            <label className='edit-label'>
                                Description
                                <br></br>
                                <input className='edit-input'
                                    type="text"
                                    value={description}
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='editspot-container-last'>
                            <label className='edit-label'>
                                Price
                                <br></br>
                                <input className='edit-input-last'
                                    type="text"
                                    value={price}
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='editspot-button-container'>
                        <button id='editbutton-submit' type='submit'>Submit</button>
                        <button id='editbutton-cancel' type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>

                </div>
                </form>

            </div>
        </>
    )

}

export default UpdateSpotForm;
