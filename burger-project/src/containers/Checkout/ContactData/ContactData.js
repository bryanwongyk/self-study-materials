import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        // loading allows us to load a spinner if we want to
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});

        // Dummy data
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Bryan Wong',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Australia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'express'
        }

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
            console.log(response);
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error)
        });
    }

    render(){
        console.log(this.props);
        let form = null;
        if (this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form>
                    <input type="text" name="name" placeholder="Your name"></input>
                    <input type="email" name="email" placeholder="Your email"></input>
                    <input type="text" name="street" placeholder="Street"></input>
                    <input type="text" name="postalCode" placeholder="Postal Code"></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            )
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData);