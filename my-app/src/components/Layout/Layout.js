import React, {Fragment} from 'react';
import classes from './Layout.module.css';

const layout = (props) => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Fragment>
)

export default layout;