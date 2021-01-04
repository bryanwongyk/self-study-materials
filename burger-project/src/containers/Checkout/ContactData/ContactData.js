import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: false
            }
        },
        // loading allows us to load a spinner if we want to
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});

        const formData = {};

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        axios.post('/orders.json', formData)
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

    checkValidity(value, rules) {
        // && isValid deals with the flaw of if the first rule is False, but the last rule is True, then it will return isValid is True even if one of the rules is broken.
        let isValid = true;
        if (rules.required) {
            // required means that there is a value inside. trim() removes any white spaces.
            isValid = (value.trim() !== '') && isValid;
        }
        if (rules.minLength) {
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // Just taking this.state.orderForm creates a shallow clone of object pointers, since it stores more objects. 
        // So we need to directly reference the inputIdentifier. 
        // We also need to make a copy of the updatedOrderForm for our setState
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        // This will make a shallow copy of the given form element
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        // Update the form element value
        updatedFormElement.value = event.target.value;
        // Update 'valid' property
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // Update 'touched' property
        updatedFormElement.touched = true;

        // Update the form element in the orderForm with our updated form element
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // setState with updated order form
        this.setState({orderForm: updatedOrderForm});
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = null;
        if (this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    {
                        formElementsArray.map(formElement => (
                            <Input 
                                key={formElement.id} 
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig} 
                                value={formElement.config.value} 
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                            />
                        ))
                    }
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