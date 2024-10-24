import React, { useState } from "react";
import axios from 'axios';

const UserLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // Handle form input change 
    const handleChange = (e) => {
        console.log('Entrou aqui')
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submisssion
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Salvando dados');
            const response = await axios.post('https://api.example.com/create-account', formData);
            if(response.statis === 200){
                setResponseMessage('Conta logada com suscesso!');
            }
            else{
                setResponseMessage('Erro ao logar na conta de usuario.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    const [responseMessage, setResponseMessage] = useState('');

    return (
        < div className = "user-login-form" >
            <h3>Entre em conta de usuario</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                    type="email"
                    name="email"
                    values={formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                    type="password"
                    name="password"
                    values={formData.password}
                    onChange={handleChange}
                    required
                    />
            </div>
            <button type="submit">Entrar</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div >
    );
}

export default UserLoginForm;
