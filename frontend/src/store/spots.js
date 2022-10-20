import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = 'spots/loadallspots';
const LOAD_ONE_SPOT = 'spots/loadonespot';
const REMOVE_SPOT = 'spots/deletespot';
const CREATE_SPOT = 'spots/createspot';
const UPDATE_SPOT = 'spots/updatespot';
const ADD_IMG = 'spots/addimg';
const USER_SPOTS = 'spots/userspots';

export const loadAllSpots = (spots) => {
    return {
        type: LOAD_ALL_SPOTS,
        spots
    }
};

export const userSpots = (spots) => {
    return {
        type: USER_SPOTS,
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
};



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

// getUserSpots thunk
export const getUserSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`)

    if (response.ok) {
        const spots = await response.json();
        //console.log('in getUserSpots thunk++++++', spots)
        dispatch(userSpots(spots));
        return spots
    }
}



// createSpot thunk
export const createSpot = (spot) => async dispatch => {
    const { url } = spot;
    //console.log('in creatOneSpot thunk-spot///////', spot)
    //console.log('in creatOneSpot thunk-imgDate///////', { url, preview })
    try {
        const response = await csrfFetch(`/api/spots`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(spot)
            });

        if (response.ok) {
            const newSpot = await response.json();
            //console.log('in creatOneSpot thunk-newSpot', newSpot)
            dispatch(createOneSpot(newSpot));

            const resAddImg = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url, preview: true })
            });

            //console.log('in addSpot thunk-resAddImg', resAddImg);

            if (resAddImg.ok) {
                const img = await resAddImg.json();
                console.log('in addSpot thunk-img', img);
                dispatch(addImage(img))
                newSpot['spotImage'] = [img];
                console.log('in addSpot thunk-newSpot+img', newSpot)
                return newSpot;
            }
        };
    } catch(error) {
        throw error;
    }
}

// addSpotImage thunk
// export const addSpotImage = (imgData, spotId) => async dispatch => {
//     const {url, preview} = imgData
//     console.log('in addSpotImage thunk-imgDate///////', { url, preview });
//     const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ url, preview})
//     });

//     if (response.ok) {
//         const img = await response.json()
//         console.log('in addSpotImage thunk-img///////', img);
//         dispatch(addImage(img))
//         return img;
//     }
// }

//updateSpot thunk
export const updateSpot = (spot, spotId) => async dispatch => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        });

        const newSpot = await response.json();
        //console.log('in updataSpot thunk-newSpot', newSpot)
        dispatch(updateOneSpot(newSpot));
        return newSpot;
      } catch(error) {
        throw error;
      }
}

// deleteSpot thunk
export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    //console.log('in deleteSpot thunk********', response)

    if (response.ok) {
        dispatch(removeSpot(spotId));
        const successMsg = await response.json();
        return successMsg;
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
            newState.singleSpot= {}
            //console.log("in reducer", newState)
            return newState;
        case LOAD_ONE_SPOT:
            newState = { ...state, singleSpot: {...action.spot} };
            //console.log("in reducer----", newState)
            return newState;
        case REMOVE_SPOT:
            newState = {...state, allSpots:{...state.allSpots}};
            // console.log("in reducer----", newState)
            // const spotArr = newState.allSpots.Spots;
            // console.log("in reducer-spotArr", spotArr)
            // const deleteSpot = spotArr.find(spot => spot.id === +action.spotId);
            // const deleteId = spotArr.indexOf(deleteSpot);
            // console.log("in reducer-deleteId", deleteId)
            delete newState.allSpots[action.spotId]

            //delete newState.allSpots[action.spotId];
            //console.log("in reducer----", newState)
            return newState;
        case CREATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot } };
            //console.log("in reducer----", newState)
            return newState;
        case UPDATE_SPOT:
            //newState = { ...state, allSpots: { ...state.allSpots, [action.spot.id]: action.spot } };
            newState = { ...state, allSpots:{ [action.spot.id]: {...state[action.spot.id]}, ...action.spot} };
            //console.log("in reducer----", newState)
            return newState;
        case ADD_IMG:
            newState = { ...state, singleSpot: { ...state.singleSpot, SpotImages:[action.imgData]}}
            return newState;
        case USER_SPOTS:
            newState = { ...state, allSpots: { ...action.spots } };
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            delete newState.allSpots.Spots;
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
