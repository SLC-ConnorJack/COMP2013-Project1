import type { ClothingProduct } from "../data/data";
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
}: ClothingProduct) {
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
    </div>
  );
}