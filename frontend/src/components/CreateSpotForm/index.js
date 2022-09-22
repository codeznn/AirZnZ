import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot, addSpotImage } from '../../store/spots';
import './CreateSpotForm.css'

const CreateSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()

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
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = { address, city, state, country, lat, lng, name, description, price,}
        console.log(payload)

        dispatch(createSpot(payload)).then(async (res) => {
            console.log("res", res)
            // const message = await res.json();

            // console.log('in CreatSpotForm-message', message)
            if (res && res.errors) {
                setErrors(res.errors);
                console.log('in CreatSpotForm-errors', res.errors)
            } else {
                console.log("res.id", res.id)
                const imgData = { url, preview }
                console.log('imgData', imgData)
                dispatch(addSpotImage(imgData, res.id))}
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

        });
    }

    const handleCancelClick = () => {
        return history.push('/');
    };



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
