import React, {useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Transaction = ({ cart }) => {
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="card mx-auto" style={{ maxWidth: '400px' }}>
      <div className="card-body">
      <h5 className="card-title">Finalizar Compra</h5>
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
            <button type="submit" className="btn btn-primary btn-block mt-3">Finalizar Compra</button>
            <Link to="/">
              <button type="submit" className="btn btn-secondary btn-block mt-3">Cancelar</button>
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Transaction;
