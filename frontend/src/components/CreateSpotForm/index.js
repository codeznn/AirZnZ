import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';
import './CreateSpotForm.css'

const CreateSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [preview, setPreview] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {

        const errors = [];

        if (!address.length) errors.push('Address is required');
        if (!city.length) errors.push('City is required');
        if (!state.length) errors.push('State is required')
        if (!country.length) errors.push('Country is required');
        if (!name.length) errors.push('Name is required');
        if (!description.length) errors.push('Description is required');
        if(!lat.length) errors.push('Latitude is required');
        if(typeof +lat !== 'number') errors.push('Lat must be a number');
        if (lat < -90 || lat > 90) errors.push('Latitude must be a value in the range of -90 and 90');
        if(!lng.length) errors.push('Longitute is required');
        if(typeof +lng !== 'number') errors.push('Lng must be a number');
        if (lng < -180 || lng > 180) errors.push('Longitude must be a value in the range of -180 and 180');
        if(!price) errors.push('Price is required');
        if(typeof +price !== 'number') errors.push('Price must be a number');
        if (price < 0) validationErrors.push('Price must be greater than 0');
        if (!url.includes('https://')) errors.push('url is not valid');

        setValidationErrors(errors)
    }, [name, address, city, state, country, description, lat, lng, price, url, validationErrors])

    if (!sessionUser) {
        alert("You need to be logged in first!");
        return history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitted(true)

        console.log('in CreatSpotForm-Validation', validationErrors);
        const newSpot = { name, address, city, state, country, lat, lng, description, price, url, preview }
        const createdSpot = await dispatch(createSpot(newSpot))

        if(createdSpot) {
            setValidationErrors([]);
            console.log('in CreatSpotForm-setValidationErrors', setValidationErrors)
            history.push(`/spots/${createdSpot.id}`)
        }




        // dispatch(createSpot(payload)).then(async (res) => {
        //     console.log("res", res)
        //     const message = await res.json();

        //     console.log('in CreatSpotForm-message', message)
        //     if (message && message.errors) {
        //         setErrors(message.errors);
        //         console.log('in CreatSpotForm-errors', message.errors)
        //     } else {
        //         console.log("res.id", res.id)
        //         const imgData = { url, preview }
        //         console.log('imgData', imgData)
        //         dispatch(addSpotImage(imgData, res.id))}
                //return history.push(`/spots/${res.id}`);
                //.then(async(res) => {
                //     const data =  res.json();
                //     console.log("in create-spotImage", data)
                //     if (data && data.errors) {
                //         setErrors(data.errors)
                //     } else {
                //         return history.push('/');
                //     }
                //}))

        // });
    }

    const handleCancelClick = () => {
        return history.push('/');
    };



    return (
        <>
            <div className='create-spot-wrapper'>

                <h1>Create A New Spot</h1>

                <div className='create-spot-errors'>
                    {validationErrors.length > 0 && submitted && (
                        <ul className='errors'> errors:
                            {validationErrors.map((err) => (
                                <li key={err}>{err}</li>
                            ))}
                        </ul>
                    )}

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
                    <div className = 'url'>
                        <label>
                            Image:
                            <input
                                type="text"
                                value={url}
                                required
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </label>
                        <label>Preview Image:</label>
                            <select onChange={e => setPreview(e.target.value)} value={preview}>
                                <option key='true'>true</option>
                                <option key='false'>false</option>
                            </select>
                    </div>

                    <div className='creat-spot-wrapper'>
                        <button id='create-spot-button' type='submit'>Submit</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>

                </form>

            </div>
        </>
    )

}

export default CreateSpot;
