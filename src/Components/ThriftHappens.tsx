import ItemsContainer from "./ItemsContainer";
import { products, type ClothingProduct } from "../data/data";
import { useState } from "react";

function ThriftHappens() {
  //States
  const [productList, setProductList] = useState<ClothingProduct[]>(products);
  //Handlers
  const handleIncreaseQuantity = (id: number) => {
    setProductList((prevList) =>
      prevList.map((entry) =>
        entry.id === id && entry.itemQuantity < entry.quantity
          ? { ...entry, itemQuantity: entry.itemQuantity + 1 }
          : { ...entry },
      ),
    );
  };
  const handleDecreaseQuantity = (id: number) => {
    setProductList((prevList) =>
      prevList.map((entry) =>
        entry.id === id && entry.itemQuantity > 0
          ? { ...entry, itemQuantity: entry.itemQuantity - 1 }
          : { ...entry },
      ),
    );
  };
  return (
    <>
      <header className="header">
        <h1>Thrift Happens</h1>
      </header>
      <ItemsContainer
        products={productList}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
      />
    </>
  );
}

export default ThriftHappens;
