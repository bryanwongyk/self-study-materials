import * as actionTypes from './actionTypes';

const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
};

const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
};

export {
    addIngredient,
    removeIngredient,
}