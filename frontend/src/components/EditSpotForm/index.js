import { useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots';
import { getOneSpot } from '../../store/spots';
import { getAllSpots } from '../../store/spots';


const UpdateSpotForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state.session.user.id);
    const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!sessionUser) {
        alert("You need to logged in first!");
        return <Redirect to="/" />;
    }
    if (currentOwner !== sessionUser) {
        alert("You are not the owner!");
        return <Redirect to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = { address, city, state, country, lat, lng, name, description, price,}
        console.log(payload)
        dispatch(updateSpot(payload, spotId)).catch(async (res) => {
            const message = await res.json();
            console.log('in updateSpotForm-message', message)
            if (message && message.errors) setErrors(message.errors);
            console.log('in updateSpotForm-errors', errors)
        });

        //return history.push('/');


    }

    return (
        <>
            <div className='create-spot-wrapper'>

                <h1>Create A New Spot</h1>

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

                    <div className='creat-spot-wrapper'>
                        <button id='create-spot-button' type='submit'>Submit</button>
                    </div>

                </form>

            </div>
        </>
    )

}

export default UpdateSpotForm;
