import React, {Component} from 'react';
import './Posts.module.css';

class Posts extends Component {
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
        axios.get('/posts/')
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Bryan'
                }
            })
            this.setState({posts: updatedPosts})
        })
        .catch(error => {
            console.log(error)
            this.setState({error: true})
        });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render(){
        let posts = <p style={{textAlign:'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={() => this.postSelectedHandler(post.id)}/>
            });
        }

        return(
            <section className="Posts">
                {posts}
            </section>
        )
    }
}