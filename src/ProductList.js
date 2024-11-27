import React, { useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
  const [responseMessage, setResponseMessage] = useState("");

  // Carregar os produtos ao montar o componente
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:8080/products/allProducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setResponseMessage("Falha ao carregar produtos.");
      }
    };

    fetchProducts();
  }, []);

  // Adicionar produto ao carrinho
  const handleAddToCart = async (product) => {
    setSelectedProduct(product);

    try {
      const response = await axios.post("https://localhost:8080/cart/add", { productId: product.id }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

      if (response.status === 200) {
        setResponseMessage(`${product.name} foi adicionado ao carrinho com sucesso!`);
      } else {
        setResponseMessage("Erro ao adicionar produto ao carrinho.");
      }
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
      setResponseMessage("Falha ao conectar ao servidor.");
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">Catálogo de Produtos</h5>
        <div className="product-list">
          {products.length === 0 ? (
            <p>Carregando produtos...</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="mb-2">
                  {product.name} - R$ {product.price.toFixed(2)}
                  <button
                    className="btn btn-primary btn-sm ms-2" onClick={() => handleAddToCart(product)}>
                    Adicionar</button>
                </li>
              ))}
            </ul>
          )}
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
