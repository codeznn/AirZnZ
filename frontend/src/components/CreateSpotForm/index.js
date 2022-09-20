import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOneSpot } from '../../store/spots';
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
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }

        let createdSpot;
        try {
            createdSpot = await dispatch(createOneSpot(payload))
        } catch (error) {
            console.log(error)
            if (error) setErrors(error.errors);
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            else setErrors({ overall: error.toString().slice(7) })
        }

        if (createdSpot) {
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setLat('')
            setLng('')
            setName('')
            setDescription('')
            setPrice('')
            setErrors([])
            history.push(`/`)
        }
    }

    return (
        <>
            <div className='create-spot-wrapper'>

                <h1>Create A New Spot</h1>

                <div className='create-spot-errors'>
                    {/* {errors.length > 0 && (
                        <ul className='create-spot-errorlist' key={errors}>
                            {errors.map(error => (
                                <li className='create-spot-error' key={error}>{error}</li>
                            ))}
                        </ul>
                    )} */}
                </div>

                <form className='create-spot-form' onSubmit={handleSubmit}>
                    <div className='address'>
                        <label>
                            Address:
                            <input
                                type="text"
                                value={address}
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
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className='country'>
                        <label>
                            Country:
                            <input
                                id='country'
                                type="text"
                                value={country}
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

export default CreateSpot;
