import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Button, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import './App.css';


function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

    </BrowserRouter >
  );
}

export default App;
