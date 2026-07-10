import './index.css'
import App from './App.jsx'
import LoginPage from './pages/loginPage.jsx';
import HomePage from './pages/homePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ui/ProtectedRoute';

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/homepage' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
