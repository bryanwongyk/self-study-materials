// require is node.js syntax for importing a package
// import/export is ES6
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}


/*Reducer
Needs to be created first before the store.
ES6 allows us to assign a default value (e.g. like in Python!) if state is undefined
It also initially takes the value of initialState defined above by default.

We can also use the spread operator to update our objects. When the result of spreading our
key-value pairs contains props with the same name, the one defined last will be used.
e.g. under INC_COUNTER action, we are making a shallow copy of our state, but then replacing
the counter of that copy.

*/
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    // We only return the same state if the action does not apply.
    return state;
}

// Store - attach reducer to store
const store = createStore(rootReducer);
// Command to get the state from the central store
// console.log(store.getState())

// Subscription
// Should be set up right after the store is created, so that code that is run synchronously after can be triggered.
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// Store dispatches an Action with a 'type' property
// Increment counter
store.dispatch({type: 'INC_COUNTER'});
// Add an integer to the counter. You can name this anything e.g. value, payload etc. A payload usually indicates an object of data.
store.dispatch({type: 'ADD_COUNTER', value: 10});