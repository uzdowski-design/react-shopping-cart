import { useState } from 'react';
import { useQuery } from 'react-query';

// Components
import Item from './components/Item/Item';
import Cart from './components/Cart/Cart';
// import Drawer from '@material-ui/core/Drawer';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Grid from '@material-ui/core/Grid';
import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// Styles
import { Wrapper, StyledButton } from './App.styles';

// Types
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}

// get products from API
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()


const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acumulator: number, item) => acumulator + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />
  // if (isLoading) return <CircularProgress />
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
