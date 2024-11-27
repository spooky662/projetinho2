import React, {useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Transaction = ({ cart }) => {
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Finalizar Compra</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio. Adicione itens para continuar.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - R$ {item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <div>
            <button style={styles.finalizar}>Finalizar Compra</button>
            <Link to="/">
              <button style={styles.cancelar}>Cancelar</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  finalizar: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelar: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  },
};

export default Transaction;
