import React, { Component } from 'react';

import './Blog.module.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

import {Route, Link, Switch, NavLink, Redirect} from 'react-router-dom';

// This is now only imported when the constant is used somewhere.
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>New Post</h1>} /> */}
                <Switch>            
                    {/* To get access to match, history, location props in Posts */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    {/* <Route path="/new-post" component={NewPost}/> */}
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts" exact/>
                    <Route render={() => <div>404: Not found</div>}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;