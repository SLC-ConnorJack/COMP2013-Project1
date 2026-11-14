import ItemCard from "./ItemCard";
import type { ClothingProduct } from "../data/data";

interface ItemsContainerProps {
  products: ClothingProduct[];
}
export default function ItemsContainer({ products }: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      {products.map((product) => (
        <ItemCard key={product.id} {...product} />
      ))}
    </div>
  );
}