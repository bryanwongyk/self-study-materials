import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.module.css';
import FullPost from '../FullPost/FullPost';
import {Route} from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({pathname: '/' + id});
        // OR the following
        this.props.history.push(this.props.match.url + '/' + id);
    }

    render(){
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link key={post.id} to={'/' + post.id}>
                        <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author} 
                        clicked={this.postSelectedHandler.bind(this, post.id)}/>
                    /* </Link> */
                );
            });
        }
        return(
            <div>
                <section className='Posts'>
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} component={FullPost} exact />
            </div>
        )
    }
}

export default Posts;