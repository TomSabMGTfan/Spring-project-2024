import React from 'react'
import './css/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>  
         <div className='sb__footer section_padding'>
           <div className='sb__footer-links'>
             <div className='sb__footer-links-div'>
               <p><a href="#Contact">Do You have any questions?</a></p>
             </div>
                <div className='socialmedia'>
                 <a href="https://lt.linkedin.com/"><i className='fa-brands fa-linkedin'></i></a>
                 <a href="https://www.facebook.com/"><i className='fab fa-facebook-f'></i></a>
                 <a href="https://www.instagram.com/"><i className='fa-brands fa-square-instagram'></i></a>
                </div>
           </div>
         </div>
    </footer>
  )
}

export default Footer;



