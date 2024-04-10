import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <main className='py-3'>
    <Container>
    <h1>Welcome to SantaMonicaTechPioneersClient</h1>
    </Container>
    </main>
    <Footer />
    </>
  )
}

export default App
