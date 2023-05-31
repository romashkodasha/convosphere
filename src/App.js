import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import MessagePage from './pages/MessagePage/MessagePage';
import './App.css';


function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:id" element={<MessagePage/>}/>
      </Routes>

    </BrowserRouter >
  );
}

export default App;
