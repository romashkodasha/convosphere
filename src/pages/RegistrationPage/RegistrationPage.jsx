
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './RegistrationPage.css';
import { createUserAction } from '../../store/actions/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTokenAction } from '../../store/actions/token';

function RegistrationPage() {
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      const formDataObject = {
        username: formData.username,
        password: formData.password,
      };
      try {
      await dispatch(createUserAction(formDataObject));
      await dispatch(createTokenAction(formDataObject));

      navigate('/');
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  
  const isFormValid = formData.password === formData.confirmPassword;

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
        <Typography variant="h5">Добро пожаловать в convosphere!</Typography>
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
          <TextField
            label="Подтверждение пароля"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            margin="normal"
            required
            fullWidth
            error={!isFormValid}
            helperText={!isFormValid && 'Пароль не совпадает с подтверждением'}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            style={{
              marginTop: '32px',
              backgroundColor: 'rgba(142, 29, 255, 0.38)',
              borderRadius: '4px',

            }}

          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;