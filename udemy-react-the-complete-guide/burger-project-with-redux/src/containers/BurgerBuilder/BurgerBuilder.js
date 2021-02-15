import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        // purchaseable is true when there is at least one ingredient selected
        // purchaseable: false,
        purchasing: false,
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }


    // Disables or enables order button depending on if any ingredients have been added ornot
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }) //map returns an array of the number of each ingredient
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition=INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     if (oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction=INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => { 
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        /*Method 1. String concatenation */
        // let query = '';
        // const ingredients = {...this.props.ingredients};
        // for (const [ingredient, amount] of Object.entries(ingredients)) {
        //     if (query === '') {
        //         query += '?'
        //     } else {
        //         query += '&'
        //     }
        //     query += ingredient + '=' + amount;
        // }
        // this.props.history.push('/checkout' + query);

        /* Method 2. Max's solution 
        const queryParams = [];
        // its ok to iterate over state objects, as long as we are not mutating them (in which case we should use a spread operator to create a copy).
        for (let ingredient in this.props.ingredients) {
            //ingredient is the key names
            // encodeURIComponent is given by JS to allow us to encode our elements to be able to be used in a URL. It is needed so that the
            // browser can interpret special characters like '?', '&' properly.
            queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.ingredients[ingredient]));
        }

        queryParams.push('price=' + this.props.totalPrice);

        const queryString = queryParams.join('&');
        */

        this.props.history.push({
            pathname: '/checkout'
        });


        //alert('You continue!');
        // this.setState({loading: true});

        // // Dummy data
        // const order = {
        //     ingredients: this.props.ingredients,
        //     price: this.props.totalPrice,
        //     customer: {
        //         name: 'Bryan Wong',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '41351',
        //             country: 'Australia'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'express'
        // }

        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading: false, purchasing: false});
        //     console.log(response);
        // })
        // .catch(error => {
        //     this.setState({loading: false, purchasing: false});
        //     console.log(error)
        // });
    }

    render(){
        // The remove build control where the ingredient has an amount of <= 0 should be disabled.
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            // disabledInfo becomes {key: true or false}
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded.</p>:<Spinner/>;

        console.log(this.props.ingredients);

        if (this.props.ingredients) {
            burger = 
                <Fragment>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls 
                        added={this.props.onIngredientAdded} 
                        removed={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}/>
                </Fragment>
            // if (!this.state.loading){
            orderSummary = 
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    purchaseCancelled={this.purchaseCancelHandler} 
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice}>
                </OrderSummary>
            // }
        }


        return(
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));