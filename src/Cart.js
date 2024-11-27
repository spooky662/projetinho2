import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

const Cart = ({ cart, removeFromCart }) => {
    const navigate = useNavigate();

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  
    return (
        <div>
          <h2>Carrinho</h2>
          {cart.length === 0 ? (
            <p>O carrinho está vazio.</p>
          ) : (
            <div>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
                    <button onClick={() => removeFromCart(item.id)}>Remover</button>
                  </li>
                ))}
              </ul>
              <h3>Total: R$ {total.toFixed(2)}</h3>
              <button
                style={styles.finalizar}
                onClick={() => navigate("/transaction")}
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      );
    };
  
  export default Cart;
