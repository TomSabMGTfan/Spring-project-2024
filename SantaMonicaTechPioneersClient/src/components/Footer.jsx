import React from 'react'
import './css/Footer.css'


const Footer = () => {
  return (
    <>
      <footer>
        <div className='footerContainer'>
          <div className="copyOne">
            <p>Copyright &copy;2024; Desinged by <span className='designer'>Santa Monica Tech Pioneers</span></p>
          </div>
          <div className='socialIcons'>
            <a href="https://www.facebook.com/" target='_blank'><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/accounts/login/" target='_blank'><i className="fa-brands fa-instagram"></i></a>
            <a href="https://x.com/" target='_blank'><i className="fa-brands fa-twitter"></i></a>
            <a href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1&nlr=1" target='_blank'><i className="fa-brands fa-google-plus"></i></a>
            <a href="https://www.youtube.com/" target='_blank'><i className="fa-brands fa-youtube"></i></a>
          </div>

        </div>
      </footer>
    </>
  )
}

export default Footer;



