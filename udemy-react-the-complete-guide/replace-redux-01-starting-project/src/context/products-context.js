import React, {useState} from 'react';

// create context listened to by all other children components
export const ProductsContext = React.createContext({products: [],
toggleFav: () => {}
})

  export default props => {
      const [productsList, setProductsList] = useState([    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false
    }])

    const toggleFavorite = productId => {
        setProductsList(currentProdList => {
                  const prodIndex = products.findIndex(
                p => p.id === productId
            );
            const newFavStatus = !products[prodIndex].isFavorite;
            const updatedProducts = [...products];
            updatedProducts[prodIndex] = {
                ...products[prodIndex],
                isFavorite: newFavStatus
            };
            return updatedProducts;
        })
    }

      return (
          <ProductsContext.Provider value={
              {products: productsList, toggleFav: toggleFavorite}

          }>
              props.children;
          </ProductsContext.Provider>
      );
  }