import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]

    // Dynamic red styling for invalid classes
    // props.shouldValidate checks if the form element has a validation object. If it doesn't then it has no validation rules, and should not be highlighted red.
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case('input'):
            inputElement = 
                <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />;
            break;
        case('textarea'):
            inputElement = 
                <textarea 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} 
                    onChange={props.changed}
                />;
            break;
        case('select'):
            inputElement = 
                <select 
                    className={inputClasses.join(' ')} 
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))}
                </select>;
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;