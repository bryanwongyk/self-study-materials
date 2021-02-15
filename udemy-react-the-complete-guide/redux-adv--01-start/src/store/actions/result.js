import * as actionTypes from './actionTypes';

// Synchronous action behaviour
// We need to split this out, because we do not want to dispatch storeResult
// within storeResult, which will create an infinite loop.
const saveResult = ( res ) => {
    return {
        type: actionTypes.STORE_RESULT,
        result: res,
    }; 
}

const storeResult = (res) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(saveResult(res))
        }, 2000)
    }
};

const deleteResult = (resultElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resultElId,
    };
};

export {
    storeResult,
    deleteResult,
}