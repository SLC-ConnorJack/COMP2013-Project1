import CheckoutCard from "./CheckoutCard";
import type { CartItem } from "./ThriftHappens";

interface CheckoutContainerProps {
  cartItems: CartItem[];
}

export default function CheckoutContainer({ cartItems }: CheckoutContainerProps) {
  
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.cartQuantity * item.price,
    0,
  );

  return (
    <div className="CheckoutContainer">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        cartItems.map((item) => (
          <CheckoutCard key={item.id} {...item} />
        ))
      )}
      <p>Total: ${grandTotal.toFixed(2)}</p>
    </div>
  );
}