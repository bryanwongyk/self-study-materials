const initialState = {
    persons: []
};

const reducer = (state=initialState, action) => {
    //TO DO: dispatch actions here
    switch (action.type){
        case 'ADD':
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.payload.personName,
                age: action.payload.personAge
            }
            return {
                ...state,
                persons: state.persons.concat(newPerson)
            }
        case 'DELETE':
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.personId)
            }
        default:
            break;
    }
    return state;
}

export default reducer;