import React from 'react';

// Let webpack know we are using an image file by importing it, webpack will then handle where the image is
import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;