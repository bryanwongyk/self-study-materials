import React, { Component } from 'react';

import './Blog.module.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import {Route, Link, Switch, NavLink} from 'react-router-dom';

class Blog extends Component {
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
                    <Route path="/new-post">
                        <NewPost />
                    </Route>
                    <Route path="/posts" component={Posts}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;