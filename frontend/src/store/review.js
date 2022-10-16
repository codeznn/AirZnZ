import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadreviews';
const REMOVE_REVIEW = 'reviews/deletereviews';
const CREATE_REVIEW = 'reviews/createreview';
const USER_REVIEWS = 'reviews/loaduserreviews';


const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
};

const loadUserReviews = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
};


const createOneReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
};

const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        console.log('in getReviews thunk////', reviews)
        dispatch(loadReviews(reviews));
        return reviews;
    }
}

export const getUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const userReviews = await response.json();
        dispatch(loadUserReviews(userReviews));
        return userReviews;
    }
}

export const createReview = (review, spotId) => async (dispatch) => {

    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review)
        });

        if (!response.ok) {
          let error;
          if (response.status === 404) {
            error = await response.json();
            return error;
          } else {
            let errorJSON;
            error = await response.text();
            console.log('in creatOneSpot thunk-error', error)
            try {
              errorJSON = JSON.parse(error);
              console.log('in creatOneSpot thunk-errorJSON', errorJSON)
            } catch {
              console.log('in creatOneSpot thunk-error', error)
              throw new Error(error);
            }
            console.log('in creatOneSpot thunk-errortitle&message', `${errorJSON.title}: ${errorJSON.message}`)
            throw new Error(`${errorJSON.title}: ${errorJSON.message}`)
          }
        }

        const newReview = await response.json();
        dispatch(createOneReview(newReview));
        return newReview;
    } catch(error) {
        throw error;
    }
};


export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    const review = await response.json();
    dispatch(removeReview(reviewId));
    return review;
}


const initialState = { spot: {}, user: {} }

export default function reviewsReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            let allReviews = [];
            console.log('in reducer -aciton reviews', action.reviews.Reviews)
            allReviews = action.reviews.Reviews.reduce((acc, review) => {
                console.log('reviews reducer', review)

                // allReviews[review.id] = review
                return [ ...acc, review ]
            }, []);
            return { ...state, spot: [...allReviews]};

        case CREATE_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        case USER_REVIEWS:
            newState = { ...state, user: { ...state.user } }
            action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
            });
            return newState;
        default:
            return state;

    }
}
