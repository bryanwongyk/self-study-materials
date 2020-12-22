import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        // purchaseable is true when there is at least one ingredient selected
        purchaseable: false
    }

    // Disables or enables order button depending on if any ingredients have been added ornot
    updatePurchaseState(){
        const ingredients = {
            ...this.state.ingredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }) //map returns an array of the number of each ingredient
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            // disabledInfo becomes {key: true or false}
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Fragment>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    added={this.addIngredientHandler} 
                    removed={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}/>
            </Fragment>
        );
    }
}

export default BurgerBuilder;