import React from 'react';
import classes from './Spinner.module.css'

const spinner = () => (
    // The Loading... text is a fallback in case the CSS fails
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;