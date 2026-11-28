import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";
import { type ClothingProduct } from "../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  cartQuantity: number;
}

function ThriftHappens() {
  //States
const [productList, setProductList] = useState<ClothingProduct[]>([]);
const [cartList, setCartList] = useState<CartItem[]>([]);
const [error, setError] = useState<string>("");

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get<ClothingProduct[]>("http://localhost:3000/data");
            setProductList(response.data);
        }
        catch (err) {
            console.error(err);
            setError("Could not load products. server might not be running");
        }
    };

    fetchProducts();
}, []);
  //Handlers
  const handleIncreaseQuantity = (id: number) => { // Raises a product's selected quantity by 1, but never above its available stock
    setProductList((prevList) =>
      prevList.map((entry) =>
        entry.id === id && entry.itemQuantity < entry.quantity
          ? { ...entry, itemQuantity: entry.itemQuantity + 1 }
          : { ...entry },
      ),
    );
  };
  const handleDecreaseQuantity = (id: number) => { // Lowers a product's selected quantity by 1, but never below 0
    setProductList((prevList) =>
      prevList.map((entry) =>
        entry.id === id && entry.itemQuantity > 0
          ? { ...entry, itemQuantity: entry.itemQuantity - 1 }
          : { ...entry },
      ),
    );
  };
  const handleAddToCart = (id: number) => { // Adds the selected quantity of a product to the checkout
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

  const handleRemoveFromCart = (id: number) => { // Removes one product from the checkout and returns it to the stock
    const removedItem = cartList.find((item) => item.id === id);
    if (!removedItem) return;

    setCartList((prevCart) => prevCart.filter((item) => item.id !== id));

    setProductList((prevList) =>
      prevList.map((entry) =>
        entry.id === id
          ? { ...entry, quantity: entry.quantity + removedItem.cartQuantity }
          : entry,
      ),
    );
  };

  const handleEmptyCart = () => { // Empties the checkout and returns every item to its stock
    setProductList((prevList) =>
      prevList.map((entry) => {
        const cartLine = cartList.find((item) => item.id === entry.id);
        return cartLine
          ? { ...entry, quantity: entry.quantity + cartLine.cartQuantity }
          : entry;
      }),
    );
    setCartList([]);
  };
  return (
    <>
        <NavBar />
        <CheckoutContainer
            cartItems={cartList}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
        />

        {error ? (
            <p>{error}</p>
        ) : productList.length === 0 ? (
            <p>No products available.</p>
        ) : (
            <ItemsContainer
                products={productList}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleAddToCart={handleAddToCart}
            />
        )}
    </>
);
}

export default ThriftHappens;