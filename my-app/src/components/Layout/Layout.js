import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({
            showSideDrawer: !prevState.showSideDrawer
        }))
    }

    render(){
        console.log(this.state.showSideDrawer);
        return(
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    };
}

export default Layout;