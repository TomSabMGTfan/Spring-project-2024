import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from "./components/RegisterForm"
import {Home} from './components/homepage'

import './App.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Signup' element={<RegistrationForm />} />
        <Route path='/Home' element={<Home />} />
        {/* <Route path='*' element={<Home/>}/> */}
     
      </Routes>
    </Router>
      
    </>
  )
}

export default App
