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
            const response = await axios.post('https://api.example.com/login', formData);
            if (response.statis === 200) {
                setResponseMessage('Conta logada com suscesso!');
            }
            else {
                setResponseMessage('Erro ao logar na conta de usuario.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar ao servidor.');
        }
    };

    const [responseMessage, setResponseMessage] = useState('');

    return (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body">
                <h5 className="card-title">Entre em conta de usuario</h5>
                < div className="user-login-form" >
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input
                                className="form-control"
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
                                className="form-control"
                                type="password"
                                name="password"
                                values={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">Entrar</button>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div >
            </div >
        </div >
    );
}

export default UserLoginForm;
