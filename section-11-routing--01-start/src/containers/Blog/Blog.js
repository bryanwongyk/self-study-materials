import React, { Component } from 'react';

import './Blog.module.css';
import Posts from './Posts/Posts';

import {Route} from 'react-router-dom';

class Blog extends Component {
    render () {
        return (
            <div className='Blog'>
                <header>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/new-post">New Post</a></li>
                    </ul>
                </header>

                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>New Post</h1>} /> */}

                <Route path="/" exact>
                    <Posts />
                </Route>
            </div>
        );
    }
}

export default Blog;