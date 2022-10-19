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
    const [errors, setErrors] = useState([]);

    useEffect(() => {

        // const errors = [];

        // if (!address.length) errors.push('Address is required');
        // if (!city.length) errors.push('City is required');
        // if (!state.length) errors.push('State is required')
        // if (!country.length) errors.push('Country is required');
        // if (!name.length) errors.push('Name is required');
        // if (!description.length) errors.push('Description is required');
        // if(!lat.length) errors.push('Latitude is required');
        // if(typeof +lat !== 'number') errors.push('Lat must be a number');
        // if (lat < -90 || lat > 90) errors.push('Latitude must be a value in the range of -90 and 90');
        // if(!lng.length) errors.push('Longitute is required');
        // if(typeof +lng !== 'number') errors.push('Lng must be a number');
        // if (lng < -180 || lng > 180) errors.push('Longitude must be a value in the range of -180 and 180');
        // if(!price) errors.push('Price is required');
        // if(typeof +price !== 'number') errors.push('Price must be a number');
        // if (price < 0) validationErrors.push('Price must be greater than 0');
        // if (!url.includes('https://')) errors.push('url is not valid');

        // setValidationErrors(errors)
    }, [name, address, city, state, country, description, lat, lng, price, url])

    if (!sessionUser) {
        alert("You need to be logged in first!");
        return history.push('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setSubmitted(true)

        // console.log('in CreatSpotForm-Validation', validationErrors);
        // const newSpot = { name, address, city, state, country, lat, lng, description, price, url, preview }
        // const createdSpot = await dispatch(createSpot(newSpot))

        // if(createdSpot) {
        //     setValidationErrors([]);
        //     console.log('in CreatSpotForm-setValidationErrors', setValidationErrors)
        //     history.push(`/spots/${createdSpot.id}`)
        // }

        const payload = { name, address, city, state, country, lat, lng, description, price, url, preview }

        await dispatch(createSpot(payload)).then(newSpot => history.push(`/spots/${newSpot.id}`))
        .catch(async (res) => {
            const message = await res.json();
            console.log('in CreatSpotForm-message', message)
            if (message.errors) {
                setErrors(message.errors);
                console.log('in CreatSpotForm-errors', message.errors)
            }});
    }

    const handleCancelClick = () => {
        return history.push('/');
    };



    return (
        <>
            <div className='createspot-wrapper'>

            <div className='createspot-title'>Create A New Spot </div>

                <form className='createspot-form' onSubmit={handleSubmit}>
                    <div className='createspot-content'>
                    <div className='createspot-errors'>
                            <ul>
                                {errors && errors.map((err) => (
                                    <li key={err}>{err}</li>
                                ))}
                            </ul>
                    </div>
                    <div className='createspot-container-outer'>


                    <div className='createspot-container'>
                        <label className='create-label'>
                            Address
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            City
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            State
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={state}
                                required
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            Country
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            Lat
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={lat}
                                required
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            Lng
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={lng}
                                required
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            Name
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            Description
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='createspot-container'>
                        <label className='create-label'>
                            Price
                            <br></br>
                            <input className='create-input'
                                type="text"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className = 'createspot-container-last'>
                        <label className='create-label'>
                            ImageUrl
                            <br></br>
                            <input className='create-input-last'
                                type="text"
                                value={url}
                                required
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </label>
                        {/* <label>Preview Image:</label>
                            <select onChange={e => setPreview(e.target.value)} value={preview}>
                                <option key='true'>true</option>
                                <option key='false'>false</option>
                            </select> */}
                    </div>

                    <div className='creatspot-button-container'>
                        <button id='createspot-button-create' type='submit'>Create</button>
                        <button id='createspot-button-cancel' type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                    </div>
                    </div>
                </form>

            </div>
        </>
    )

}

export default CreateSpot;
