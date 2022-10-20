import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from "../../store/review";
import { getOneSpot } from "../../store/spots";
import './ReviewForm.css'

const CreateReviewForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    //console.log('in createReviewForm-spotId', spotId)

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const starNum = +stars
        const newReview = {
            review,
            stars: starNum
        };
        //console.log('in createReviewForm-newReview', newReview)

        await dispatch(createReview(newReview, spotId)).then(spotId => history.push(`/spots/${spotId}`))
        .catch(async (res) => {
          const message = await res.json();
          console.log("createReviewForm - message:", message)
          let messageErrors = [];
          if (message) messageErrors.push(message.message)
          setErrors(messageErrors);
          console.log("createReviewForm - errors:", errors)
         });
    }

    const handleCancelClick = () => {
        return history.push(`/spots/${spotId}`);
    };


    return (
        <>
            <div className='create-review-container'>
                <div className='createreview-title'>Create Review for {spot?.name}</div>
                <div>
                    <ul className='createreview-errors'>
                        {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className='createreview-form-container'>
                    <form className="create-review-form" onSubmit={onSubmit}>
                        <div className='createreview-div'>
                            <label className='review-label'>
                                Review
                            </label>
                            <br></br>
                                <textarea
                                    className='review-content'
                                    type="text"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Amazing place..."
                                    required
                                />
                        </div>
                        <div className='stars-div'>
                            <label className='stars-label'>
                                Stars
                            </label>
                            <br></br>
                                <input
                                    className='review-star'
                                    type='number'
                                    min='1'
                                    max='5'
                                    value={stars}
                                    onChange={e => setStars(e.target.value)}
                                />
                        </div>
                        <div className='button-div'>
                            <button className='create-review-button' type="submit">Create</button>
                            <button type="button" onClick={handleCancelClick} className='create-review-button'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateReviewForm;
