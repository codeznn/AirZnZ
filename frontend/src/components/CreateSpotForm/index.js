import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOneSpot } from '../../store/spots';
import './CreateSpotForm.css'

export const CreateSpot = () => {
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
            createdSpot = await dispatch(createdSpot(payload))
        } catch (error) {
            if (error instanceof ValidationError) setError(error.errors);
            // If error is not a ValidationError, add slice at the end to remove extra
            // "Error: "
            else setError({ overall: error.toString().slice(7) })
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

                <div className='create-spot-errors'>
                    {errors.length > 0 && (
                        <ul className='create-spot-errorlist' key={errors}>
                            {errors.map(error => (
                                <li className='create-spot-error' key={error}>{error}</li>
                            ))}

                        </ul>
                    )}
                </div>

                <form className='create-spot-form' onSubmit={handleSubmit}>

                    <label>
                        Address
                        <input
                            id='address'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>

                </form>

            </div>
        </>
    )

}
