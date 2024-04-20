import React from 'react'
import './css/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>  
         <div className='sb__footer section_padding'>
           <div className='sb__footer-links'>
             <div className='sb__footer-links-div'>
               <p><a className="footer_text"href="#Contact">Do You have any questions?</a></p>
               </div>
                <div className='socialmedia'>
                 <a href="#call"><i className="fa fa-phone"></i></a>
                 <a href="#email"><i className="fa fa-at"></i></a>
                 <a href="#comment section"><i className="fa fa-comments-o"></i></a>
                </div>
           </div>
         </div>
    </footer>
  )
}

export default Footer;



