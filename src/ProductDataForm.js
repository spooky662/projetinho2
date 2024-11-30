import React, { useState } from "react";
import axios from 'axios';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    //criar um obj para busca de produtos por id

    //tratar evento change dos campos do form
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //tratar o save de dados
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            console.log('Salvando produto');
            const response = await axios.post('http://localhost:8080/products/newProduct', formData,{
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if (response.status === 200) {
                setResponseMessage('Produto criado com suscesso!');
            }
            else {
                setResponseMessage('Erro ao criar produto.');
            }
        } catch (error) {
            console.error(error);
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    //limpar tela
    const handleClear = () => {
        setFormData({
            product: '',
            description: '',
            price: '',
            stock: '',
        });
        setResponseMessage('');
    };

    const handleSearch = async () => {
        if (!formData.id) {
            setResponseMessage("Por favor, informe o ID do produto.");
            return;
        }
    
        try {
            console.log("Buscando produto com ID:", formData.id);
            const response = await axios.get(`http://localhost:8080/products/${formData.id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200 && response.data) {
                const product = response.data;
    
                // Atualizar o formulário com os dados do produto encontrado
                setFormData({
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    stock: product.stock,
                });
    
                setResponseMessage("Produto encontrado com sucesso!");
            } else {
                setResponseMessage("Produto não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
            setResponseMessage("Falha ao conectar ao servidor.");
        }
    };

    return (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
                <h5 className="card-title">Cadastro de produtos</h5>
                <div className="user-account-form">
                    <form>
                        <div className="form-group">
                            <label>Produto: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label>Descrição: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                            <label>Preço: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <label>Estoque: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button type="button" className="btn btn-primary btn-block mt-3" onClick={handleSave}>Cadastrar</button>
                            <button type="button" className="btn btn-secondary btn-block mt-3" onClick={handleClear}>Limpar</button>
                        </div>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div>
            </div>
        </div>
    );

};

export default ProductDataForm;
