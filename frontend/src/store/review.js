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

        console.log('in creatReview thunk -response', response)

        // if (!response.ok) {
        //   let error;
        //   if (response.status === 404) {
        //     error = await response.json();
        //     return error;
        //   } else {
        //     let errorJSON;
        //     error = await response.text();
        //     console.log('in creatReview thunk-error', error)
        //     try {
        //       errorJSON = JSON.parse(error);
        //       console.log('in creatReview thunk-errorJSON', errorJSON)
        //     } catch {
        //       console.log('in creatReview thunk-error', error)
        //       throw new Error(error);
        //     }
        //     console.log('in creatReview thunk-errortitle&message', `${errorJSON.title}: ${errorJSON.message}`)
        //     throw new Error(`${errorJSON.title}: ${errorJSON.message}`)
        //   }
        // }

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
    if (response.ok) {
        const review = await response.json();
        console.log("22222")
        console.log('in deleteReviews thunk////', review)
        dispatch(removeReview(reviewId));
        return review;
    }

}


const initialState = { spot: {}, user: {} }

export default function reviewsReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            let spot = {};
            newState = { ...state };
            action.reviews.Reviews.forEach(review => {
                spot[review.id] = review
            });
            newState.spot = spot
            return newState

        case CREATE_REVIEW:
            newState = {spot: {...state.spot}, user: {...state.user}}
            newState.spot[action.review.id] = action.review

            return newState;
        case REMOVE_REVIEW:
            newState = { ...state, user: {...state.user} };
            // console.log("33333")
            // console.log("reducer-beforedelete", newState)
            // console.log("reducer-reviewId", action.reviewId)
            delete newState.user[action.reviewId];
            // console.log("reducer-afterdelete", newState)
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
