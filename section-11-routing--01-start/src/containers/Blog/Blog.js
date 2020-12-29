import React, { Component } from 'react';

import './Blog.module.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import {Route, Link, Switch} from 'react-router-dom';

class Blog extends Component {
    render () {
        return (
            <div className='Blog'>
                <header>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/new-post">New Post</Link></li>
                    </ul>
                </header>

                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>New Post</h1>} /> */}
                <Switch>
                    <Route path="/new-post">
                        <NewPost />
                    </Route>

                    <Route path="/">
                        <Posts />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Blog;