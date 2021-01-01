import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render(){
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
          <Checkout/>
        </Layout>
      </div>
    );
  }
}

export default App;
