import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <footer>  
       
      <Container className='MainContainer'>
         
            <Col  className='mr-auto'>
                <p className='question'><a href="#Contact">Do You have any questions?</a></p>
            </Col>
            
            <Col className='text-center py-3'>
                <div className='Icons'><a href="https://lt.linkedin.com/"><i className='fa-brands fa-linkedin'></i></a></div>
                <div className='Icons'><a href="https://www.facebook.com/"><i className='fab fa-facebook-f'></i></a></div>
                <div className='Icons'><a href="https://www.instagram.com/"><i className='fa-brands fa-square-instagram'></i></a></div>
                </Col>      
      </Container>  
    </footer>
  )
}

export default Footer;

{/* <ul className='list-unstyled'>
                <li><a href="https://www.facebook.com/"><i className='fab fa-facebook-f'></i></a></li>
                <li><a href="https://lt.linkedin.com/"><i className='fa-brands fa-linkedin'></i></a></li>
                <li><a href="https://www.instagram.com/"><i className='fa-brands fa-square-instagram'></i></a></li>
                </ul> */}


