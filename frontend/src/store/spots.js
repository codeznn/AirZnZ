import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/loadallspots';
const LOAD_ONE_SPOT = 'spots/loadonespot';
const REMOVE_SPOT = 'spots/deletespot';
const CREATE_SPOT = 'spots/createspot';
const UPDATE_SPOT = 'spots/updatespot';
const ADD_IMG = 'spots/addimg';

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

export const addImage = (imgData) => {
    return {
        type: ADD_IMG,
        imgData
    }
}

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

// createSpot thunk
export const createSpot = (spot) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(spot)
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

        const newSpot = await response.json();
        console.log('in creatOneSpot thunk-newSpot', newSpot)
        dispatch(createOneSpot(newSpot));
        return newSpot;
      } catch(error) {
        throw error;
      }
};

// addSpotImage thunk
export const addSpotImage = (imgData, spotId) => async dispatch => {
    const { url, preview } = imgData;
    console.log('in addSpotImage thunk-imgDate///////', imgData);
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, preview})
    });

    if (response.ok) {
        const img = await response.json()
        console.log('in addSpotImage thunk-img///////', img);
        dispatch(addImage(img))
        return img;
    }
}

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
            //console.log("in reducer----", newState)
            return newState;
        // case UPDATE_SPOT:
        //     newState = { ...state, allSpots:{ [action.spot.id]: {...state[action.spot.id]}, ...action.spot} };
        //     return newState;
        case ADD_IMG:
            newState = { ...state, singleSpot: { ...state.singleSpot, SpotImages:[action.imgData]}}
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
