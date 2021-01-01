import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import {withRouter} from 'react-router-dom';

const burger = (props) => {
    // Convert object into array of the keys
    // The values are not inclulded 
    // e.g. [salad, bacon, cheese, meat...]
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            // return array with each element appearing 'value' number of times
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        })
        // Executes a reducer function (that you provide) on each element of the array, resulting in single output value.
        // arr = accumulator which accumulates callback's return values. latest callback of initial value
        // e = current value 
        // [] = initial value
        // concatenate each element (which are now BurgerIngredient components) to the array to flatten an array of arrays
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    

    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);