import { useState } from 'react'
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from "./components/RegisterForm"
import { Home } from './components/homepage'
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/userDashboard/UserDashboard";
import PrivateRoute from "./routes/privateRoutes";
import { AuthContext } from "./utils/AuthContext";


import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import './App.css'
import { ProjectPage } from './components/ProjectPage/ProjectPage';




function App() {

  const { user: authUser, logoutUser } = useContext(AuthContext);

  return (
    <>
      <Router>
        
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path='/Signup' element={<RegistrationForm />} />
          <Route path='/' element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route path='projects/:id' element={
            <PrivateRoute>
              <ProjectPage />
            </PrivateRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
