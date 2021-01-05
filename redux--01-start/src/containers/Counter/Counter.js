import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

// connect is a function that returns a function. It is not a HOC.
import {connect} from 'react-redux';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
            </div>
        );
    }
}

// declare const after class to declare how the state managed in redux maps to the props in this component
//state.counter here refers to the global stored state. This is then stored in the prop named 'ctr', which can then be used in our
// Component code above.
const mapStateToProps = state => {
    return{
        ctr: state.counter
    }
}

// return a JS object that will hold a reference to a function which should eventually get executed
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD', value: 5}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', value: 5})
    };
};

// If we ever have a container that needs to dispatch but never needs to take in the state, we can just do connect(null, mapDispatchToProps)
export default connect(mapStateToProps, mapDispatchToProps)(Counter);