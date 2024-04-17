import { useState } from 'react'
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from "./components/RegisterForm"
import {Home} from './components/homepage'
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from "./routes/privateRoutes";
import { AuthContext } from "./utils/AuthContext";


import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import './App.css'

function App() {
  
  const { user: authUser, logoutUser } = useContext(AuthContext);

  return (
    <>
     <Header />
    <Router>
      <Routes>
      <Route path="/login" element={<LoginForm />} />
        <Route path='/Signup' element={<RegistrationForm />} />
        <Route path='/' element={<Home />} />
        <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["user"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
     
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App
