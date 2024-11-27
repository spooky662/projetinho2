import React, {useState} from "react";
import axios from 'axios';

const ProductList = ({ products, addToCart }) => {
    return (
      <div>
        <h2>Produtos</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - R$ {product.price.toFixed(2)}
              <button onClick={() => addToCart(product)}>Adicionar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ProductList;
