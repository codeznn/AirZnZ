import { useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addSpotImage } from '../../store/spots';
import { getOneSpot } from '../../store/spots';

const AddSpotImageForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const sessionUser = useSelector((state) => state.session.user.id);
    const currentOwner = useSelector((state) => state.spots.singleSpot.ownerId)
    //console.log('in AddSpotImageForm-sessionUser', sessionUser)

    const [url, setUrl] = useState('');
    const [preview, setPreview] = useState(true);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId]);

    if (!sessionUser) {
        alert("You need to logged in first!");
        return <Redirect to="/" />;
    }
    if (currentOwner !== sessionUser) {
        alert("You are not the owner!");
        return <Redirect to="/" />;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newImg = { url, preview };

        dispatch(addSpotImage(newImg, spotId)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        });

        //return history.push(`/spots/${spotId}`)
    }

    return (
        <div className="img-outer-container" onSubmit={handleSubmit}>
          <ul>
            {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <form className="img-form">

            <label>Url:</label>
            <input
              type="text"
              required
              value={url}
              onChange={e => setUrl(e.target.value)} />

            <label>Preview Image:</label>
            <select onChange={e => setPreview(e.target.value)} value={preview}>
                <option key='true'>true</option>
                <option key='false'>false</option>
            </select>

            <button type="submit">Submit</button>

          </form>
        </div>
      )

}

export default AddSpotImageForm;
