import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";
import { products, type ClothingProduct } from "../data/data";
import { useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  cartQuantity: number;
}

function ThriftHappens() {
  //States
  const [productList, setProductList] = useState<ClothingProduct[]>(products);
  const [cartList, setCartList] = useState<CartItem[]>([]);
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
  const handleAddToCart = (id: number) => {
    const selectedProduct = productList.find((entry) => entry.id === id);

    if (!selectedProduct || selectedProduct.itemQuantity === 0) {
      alert("Please select a quantity before adding to cart.");
      return;
    }
    setCartList((prevCart) =>
      prevCart.some((item) => item.id === id)
        ? prevCart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  cartQuantity:
                    item.cartQuantity + selectedProduct.itemQuantity,
                }
              : item,
          )
        : [
            ...prevCart,
            {
              id: selectedProduct.id,
              name: selectedProduct.name,
              image: selectedProduct.image,
              price: selectedProduct.price,
              cartQuantity: selectedProduct.itemQuantity,
            },
          ],
    );

    setProductList((prevList) =>
      prevList.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              quantity: entry.quantity - entry.itemQuantity,
              itemQuantity: 0,
            }
          : entry,
      ),
    );
  };
  return (
    <>
      <header className="header">
        <h1>Thrift Happens</h1>
      </header>
      <CheckoutContainer cartItems={cartList} />
      <ItemsContainer
        products={productList}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
}

export default ThriftHappens;
