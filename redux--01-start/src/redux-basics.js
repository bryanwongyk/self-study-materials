// require is node.js syntax for importing a package
// import/export is ES6
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}


// Reducer
// Needs to be created first before the store.
// ES6 allows us to assign a default value (e.g. like in Python!) if state is undefined
const rootReducer = (state = initialState, action) => {
    return state;
}

// Store
const store = createStore(rootReducer);
// Command to get the state from the central store
console.log(store.getState())

// Dispatching Action


// Subscription