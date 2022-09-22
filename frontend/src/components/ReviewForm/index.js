import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from "../../store/review";
import { getAllSpots, getOneSpot } from "../../store/spots";

const CreateReviewForm = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(5);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    // useEffect(() => {
    //     dispatch(getOneSpot(spotId))
    // }, [dispatch, spotId]);

    // useEffect(() => {
    //     dispatch(getAllSpots())
    // }, [dispatch]);


    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const starNum = +stars
        const newReview = {
            review,
            stars: starNum
        };
        console.log(spotId)
        console.log('in createReviewForm-newReview', newReview)

        await dispatch(createReview(newReview, spotId)).then(spotId => history.push(`/spots/${spotId}`))
        .catch(async (res) => {
          const message = await res.json();
          console.log("createReviewForm - res.message:", message)
          if (message && message.errors) setErrors(message.errors);
         });
    }

    const handleCancelClick = () => {
        return history.push(`/spots/${spotId}`);
    };


    return (
        <>
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

                    <select id="stars" onChange={(e) => setStars(e.target.value)}>
                        <option
                            value={5}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★★★</option>

                        <option
                            value={4}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★★</option>

                        <option
                            value={3}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★</option>

                        <option
                            value={2}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★</option>

                        <option
                            value={1}
                            onClick={(e) => setStars(e.target.value)}
                            required>★</option>
                    </select>
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
