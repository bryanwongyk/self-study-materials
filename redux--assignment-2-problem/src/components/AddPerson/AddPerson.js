import React, {useState} from 'react';

import './AddPerson.css';

const addPerson = (props) => {
    const [nameState, setNameState] = useState({
        name: ''
    })
    const [ageState, setAgeState] = useState({
        age: ''
    })

    const nameChangedHandler = (event) => {
        setNameState({name: event.target.value});
    }

    const ageChangedHandler = (event) => {
        setAgeState({age: event.target.value});
    }

    return (
        <div className="AddPerson">
            <input type="text" placeholder="Name" onChange={nameChangedHandler} value={nameState.name}/>
            <input type="text" placeholder="Age" onChange={ageChangedHandler} value={ageState.age}/>
            <button onClick={() => props.personAdded(nameState.name, ageState.age)}>Add Person</button>
        </div>
    )
};

export default addPerson;