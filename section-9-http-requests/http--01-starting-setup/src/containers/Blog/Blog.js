import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import axios from 'axios';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: []
    }

    componentDidMount(){
        /* We cannot just assign a const to the get request, because it occurs asynchronously.
        Meaning that it won't return a result immediately as it needs some time to get the results.
        JavaScript runs code in a synchronous manner, that is it would immediately run the GET request, assign
        to a variable, and continue to the next line of code even if there is no result yet.
        Therefore, axios returns a Promise object, which we can then chain with a .then() handler
        which is further action to be taken after a promise is settled.

        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

        */
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            console.log(response);
            this.setState({posts: response.data})
        });
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title}/>
        });


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;