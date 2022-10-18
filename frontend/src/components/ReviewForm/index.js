import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from "../../store/review";
import { getOneSpot } from "../../store/spots";

const CreateReviewForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    console.log('in createReviewForm-spotId', spotId)
    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const starNum = +stars
        const newReview = {
            review,
            stars: starNum
        };
        console.log('in createReviewForm-newReview', newReview)

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
            <div>Create Review for {spot.name}</div>
            <div>
                <ul>
                    {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
            <form id="create-review-form" onSubmit={onSubmit}>
                <label>
                    Review
                    </label>
                    <textarea
                        id="review"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />


                <label id="stars-selector">
                    Stars
                    <input
                        className='review-star'
                        type='number'
                        min='1'
                        max='5'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                    />
                </label>
                <div>
                    <button id="submit-review" type="submit">Submit</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </>
    )
}

export default CreateReviewForm;
