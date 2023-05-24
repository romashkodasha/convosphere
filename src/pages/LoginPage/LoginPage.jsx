

import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTokenAction } from '../../store/actions/token';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataObject = {
            username: formData.username,
            password: formData.password,
        };
        dispatch(createTokenAction(formDataObject))
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    };


    return (
        <div>
            <nav>
                <div id="logo">
                    <Link to="/" className='link'>
                        convosphere
                    </Link>
                </div>
                <Button component={Link} to="/" variant="contained" color="inherit" id="home-button">
                    Вернуться на главную страницу
                </Button>
            </nav>
            <div id="reg-form">
                <Typography variant="h5">С возвращением в convosphere!</Typography>
                <form onSubmit={handleSubmit} >
                    <TextField
                        label="Логин"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <TextField
                        label="Пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: '32px',
                            backgroundColor: 'rgba(142, 29, 255, 0.38)',
                            borderRadius: '4px',
                            width: '333px'

                        }}

                    >
                        Войти
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;