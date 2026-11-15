import type { ClothingProduct } from "../data/data";
export interface ItemCardProps extends ClothingProduct {
  handleIncreaseQuantity: (id: number) => void;
  handleDecreaseQuantity: (id: number) => void;
  handleAddToCart: (id: number) => void;
}
export default function ItemCard({
  image,
  name,
  fit,
  category,
  color,
  description,
  size,
  price,
  quantity,
  id,
  itemQuantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleAddToCart,
  
}: ItemCardProps) {
  return (
    <div className="ItemCard">
      <img src={image} alt={name} width="140px" />
      <p className="name">{name}</p>
      <p className="fit">fit: {fit}</p>
      <p className="category">category: {category}</p>
      <p className="color">colour: {color}</p>
      <p className="description">description: {description}</p>
      <p className="size">size: {size}</p>
      <p className="price">${price.toFixed(2)}</p>
      <p className="quantity">stock: {quantity}</p>
      <p className="stock-status">{ quantity > 0 ? "In Stock" : "Out of Stock"}</p>
      <button disabled={ quantity === 0 } onClick={() => handleDecreaseQuantity(id)}>-</button>
      <span>{itemQuantity}</span>
      <button disabled={ quantity === 0 } onClick={() => handleIncreaseQuantity(id)}>+</button>
      <button disabled={ quantity === 0 } onClick={() => handleAddToCart(id)}>Add to Cart</button>
    </div>
  );
}
