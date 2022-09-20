import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/loadallspots';
const LOAD_ONE_SPOT = 'spots/loadonespot';
const REMOVE_SPOT = 'spots/deletespot';
const CREATE_SPOT = 'spots/createspot';
const UPDATE_SPOT = 'spots/updatespot';

export const loadAllSpots = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
};

export const loadOneSpot = (spot) => {
    return {
        type: LOAD_ONE_SPOT,
        spot
    }
};

export const createOneSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
};

export const updateOneSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
};

export const removeSpot = (spotId) => {
    return {
        type: REMOVE_SPOT,
        spotId
    }
}


// getAllSpots thunk
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const data = await response.json();
        //console.log('in getAllSpots thunk++++++', data)
        dispatch(loadAllSpots(data.Spots))
        return data
    }
}

// getOneSpot thunk
export const getOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    //console.log('in reducer',spotId)
    if (response.ok) {
        const spot = await response.json();
        //console.log('in getOneSpot thunk------', spot)
        dispatch(loadOneSpot(spot))
        return spot
    }
};

// deleteSpot thunk
export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    console.log('in deleteSpot thunk********', response)

    if (response.ok) {
        dispatch(removeSpot(spotId))
    } else {
        console.log("errors in removeSpot thunk")
    }
}

// createSpot thunk
export const createSpot = (spot) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        });

        console.log('in createSpot thunk********', response)
        if (!response.ok) {
            let error;
            let errorJSON
            error = await response.text();
            try {
                // Check if the error is JSON, i.e., from the Pokemon server. If so,
                // don't throw error yet or it will be caught by the following catch
                errorJSON = JSON.parse(error);
            } catch {
                // Case if server could not be reached
                throw new Error(error);
            }
            throw new Error(error);

          }

            const newSpot = await response.json();
            console.log('in createSpot thunk=======', newSpot);
            dispatch(createOneSpot(newSpot))
            return newSpot

    } catch (error) {
        let errorJSON = await error.json()
        throw errorJSON
    }
};

//updateSpot thunk
export const updateSpot = (data) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const updated = await response.json();
        console.log('in createSpot thunk///////', updated);
        dispatch(updateOneSpot(updated));
        return updated;
    } else {
        console.log("errors in updateSpot thunk")
    }
}



const initialState = {
    allSpots: {},
    singleSpot: {},
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            newState = { ...state, allSpots: { ...action.spots } };
            //console.log("in reducer", newState)
            return newState;
        case LOAD_ONE_SPOT:
            newState = { ...state, singleSpot: {...action.spot} };
            //console.log("in reducer----", newState)
            return newState;
        // case REMOVE_SPOT:
        //     newState = {...state};
        //     delete newState.allSpots[action.spotId];
        //     return newState;
        case CREATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot } };
            console.log("in reducer----", newState)
            return newState;
        // case UPDATE_SPOT:
        //     newState = { ...state, allSpots:{ [action.spot.id]: {...state[action.spot.id]}, ...action.spot} };
        //     return newState;
        default:
            return state;
    }
}

export default spotsReducer;
