import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from "./components/RegisterForm"

import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Signup' element={<RegistrationForm />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
