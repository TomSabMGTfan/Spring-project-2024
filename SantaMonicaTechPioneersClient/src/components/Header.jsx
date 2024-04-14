import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import './css/Header.css'

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant='primary' data-bs-theme="dark" collapseOnSelect>
        <Container className="header">
          <Navbar.Brand href="/"><h1>SantaMonicaTechPioneersClient</h1></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="./Login"> <i className='fas fa-user'></i>Log in</Nav.Link>
            <Nav.Link href="#features"><i className='fas fa-address-book'></i>Contact</Nav.Link>
            <Nav.Link href="#pricing"><i className='fas fa-dollar-sign'></i> Pricing</Nav.Link>
            <Nav.Link href="/signup"><i className='fas fa-play'></i> Get started</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
