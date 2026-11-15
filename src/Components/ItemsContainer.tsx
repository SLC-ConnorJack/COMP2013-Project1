import ItemCard from "./ItemCard";
import type { ClothingProduct } from "../data/data";

interface ItemsContainerProps {
  products: ClothingProduct[];
  handleIncreaseQuantity: (id: number) => void;
  handleDecreaseQuantity: (id: number) => void;
  handleAddToCart: (id: number) => void;
}
export default function ItemsContainer({
  products,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleAddToCart,
}: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      {products.map((product) => (
        <ItemCard
          key={product.id}
          {...product}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
