import * as actionTypes from './actionTypes';

const increment = () => {
    return {
        type: actionTypes.INCREMENT
    };
};

const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    };
};

const add = (value) => {
    return {
        type: actionTypes.ADD,
        val: value,
    };
};

const subtract= (value) => {
    return {
        type: actionTypes.SUBTRACT,
        val: value,
    };
};

export {
    increment,
    decrement,
    add,
    subtract,
}