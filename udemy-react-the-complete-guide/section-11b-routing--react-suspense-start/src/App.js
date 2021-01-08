import React, { Component, Suspense } from 'react';
// import { BrowserRouter, Route, NavLink } from 'react-router-dom';
// import Welcome from './containers/Welcome';
import User from './containers/User';

const Posts = React.lazy(() => import('./containers/Posts'));
// const User = React.lazy(() => import('./containers/User'));

class App extends Component {
  state = {showPosts: false};

  modeHandler = () => {
    this.setState(prevState => {
      return {showPosts: !prevState.showPosts};
    })
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.showPosts ? 
        (<Suspense fallback={<div>Loading...</div>}><Posts/></Suspense>) 
        : <User />}
      </React.Fragment>
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     {/* Fallback is shown while the route is loading. It can be any JSX code e.g. spinner, text etc.  */}

      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
