const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const STORE_RESULT = 'STORE_RESULT';
const DELETE_RESULT = 'DELETE_RESULT';

const increment = () => {
    return {
        type: INCREMENT
    };
};

const decrement = () => {
    return {
        type: DECREMENT
    };
};

const add = (value) => {
    return {
        type: ADD,
        val: value,
    };
};

const subtract= (value) => {
    return {
        type: SUBTRACT,
        val: value,
    };
};

const storeResult = (result) => {
    return {
        type: STORE_RESULT,
        result: result,
    };
};

const deleteResult = (resultElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resultElId,
    };
};

export {
    INCREMENT,
    DECREMENT,
    ADD,
    SUBTRACT,
    STORE_RESULT,
    DELETE_RESULT,
    increment,
    decrement,
    add,
    subtract,
    storeResult,
    deleteResult,
}