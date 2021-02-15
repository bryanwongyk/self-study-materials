import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

// The synchronous action behaviour that should follow after the asynchronous initIngredients.
// This should dispatch after the async code in initIngredients is done.
const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

const initIngredients = () => {
    // this dispatch return is made available to us because of redux-thunk
    return dispatch => {
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        })
    };
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
}

export {
    addIngredient,
    removeIngredient,
    initIngredients,
}