import CartItem from '../CartItem/CartItem';
// types
import { CartItemType } from '../../App';
// styles
import { Wrapper } from './Cart.styles'
import Item from '../Item/Item';

type Props = {
  cartItems: CartItemType[],
  addToCart: (clickedItem: CartItemType) => void,
  removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotals = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0)

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: £{calculateTotals(cartItems).toFixed(2)}</h2>
    </Wrapper>
  )
}

export default Cart;