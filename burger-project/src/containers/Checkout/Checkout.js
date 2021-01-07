import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout = props =>  {
    /* Removed due to implementation of Redux
    const initState = () => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            //example of param: ['salad', '1']
            // + is a unary operator that is one way of converting a String to an integer (https://stackoverflow.com/questions/1133770/how-to-convert-a-string-to-an-integer-in-javascript)
            // this adds to our ingredients object
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        return ({ingredients: ingredients, totalPrice: price})
    }

    const [state] = useState(initState());
    */

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    return (
        <div>
            <CheckoutSummary 
                ingredients={props.ingredients}
                onCheckoutCancelled={checkoutCancelledHandler}
                onCheckoutContinued={checkoutContinuedHandler}
            />
            <Route path={props.match.url + '/contact-data'} component={ContactData}/>
            
        </div>

    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);