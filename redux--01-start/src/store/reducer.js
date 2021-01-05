const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            }
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            }
        case 'STORE_RESULT':
            return {
                ...state,
                results: state.results.concat({id: new Date(),value: state.counter})
            }
        case 'DELETE_RESULT':
            // const id = 2;
            // const newArray = [...state.results]
            // newArray.splice(id, 1);

            // filter creates a new array with all elements that pass the test implemented by the provided function
            // arguments: current value, index (optional), array (optional), thisArg (optional)
            // this example below creates new array with elements that are not the given ID we want to delete
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
        default:
            break;
    }
    return state;
}

export default reducer;