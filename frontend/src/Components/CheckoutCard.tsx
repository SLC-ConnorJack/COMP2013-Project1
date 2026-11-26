import type { CartItem } from "./ThriftHappens";

interface CheckoutCardProps extends CartItem {
  handleRemoveFromCart: (id: number) => void;
}

export default function CheckoutCard({ // Displays the checkout line: image, name, unit price, quantity and subtotal
  id,
  name,
  image,
  price,
  cartQuantity,
  handleRemoveFromCart,
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <button onClick={() => handleRemoveFromCart(id)}>Remove</button>
      <img src={image} alt={name} width="80px" />
      <p>{name}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Quantity: {cartQuantity}</p>
      <p>Subtotal: ${(cartQuantity * price).toFixed(2)}</p>
    </div>
  );
}
