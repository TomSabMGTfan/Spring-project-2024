import React from 'react'
import './css/About.css'
import firstPicrure from '../assets/about/AM.png'
import firstPicrure1 from '../assets/about/JuliusStrioga.jpg'
import firstPicrure2 from '../assets/about/TomasSabalauskas.jpg'
import firstPicrure3 from '../assets/about/ZygintasCernius.jpg'
import firstPicrure4 from '../assets/about/SimonasVaznevicius.jpg'
import firstPicrure5 from '../assets/about/KarinaGaidele.jpg'
import firstPicrure6 from '../assets/about/ErnestDombrovski.jpg'
import firstPicrure7 from '../assets/about/DanieliusVlasenko.jpg'
import firstPicrure8 from '../assets/about/DaliaNikouls.jpg'

const About = () => {
  return (
    <>
      <div className='aboutBody'>
        <div className='about'>
          <h1>About</h1>
          <p>Writing code is not the only factor in success in the dynamic<br></br>
            field of software development. It's a delicate ballet that requires<br></br>
            a gifted group of people, perfect timing, and immaculate performance.<br></br>
            Every component is essential to composing a successful symphony<br></br>
            that advances projects and guarantees client delight.</p>
        </div>
        <div className='AllPage'>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure8} alt="AM" />
              </div>
            </div>
            <p>Dalia Nikouls</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure7} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Danielius Vlasenko</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure2} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Tomas Sabaliauskas</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure6} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Ernest Dombrovski</p>
          </div>
        </div>

        <div className='AllPage2'>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure5} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Karina Gaidelė</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Andrius Malikenas</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure4} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Simonas Važnevičius</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure3} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Žygintas Černius</p>
          </div>
          <div className='circleBoxContainer1'>
            <div className='circleBox1'>
              <div className='circleImg1'>
                <img src={firstPicrure1} alt="AM" />
              </div>
              <div>
              </div>
            </div>
            <p>Julius Strioga</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
