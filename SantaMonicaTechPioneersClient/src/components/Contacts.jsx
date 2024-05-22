import React from 'react'
import './css/Contacts.css'
import { FaUser, FaEnvelope} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Contacts = () => {
    return (
        <> 

  <div className='wrapper-body2'> 
  <div className='wrapper-contacts'>
                    <h1 className="anim">Reach us here</h1>
                    <p className="anim">On top of that, 90% of all emails that get a reply <br></br> get it within 2 days
                    </p>
  </div>
  <div className='wrapper2'>
  <div className="from-box2 login2">
  <form>
  <h1 className='loginName2'>
Question</h1>

  
              <div className='input-box2'>
                <input type="text" placeholder='Name'/>
                
                <FaUser className='icon2' />
              </div>
              <div className='input-box2'>
                <input type="email" placeholder='Email' />
                
                <FaEnvelope className='icon2' />
              </div>

              <div className='input-text-erea'>
              <textarea  name='message' id='message' cols={5} rows={5} placeholder='Message'></textarea>

              </div>
              

              <div>
              <Link to="/about" ><button type='submit'>Submit your request</button></Link>
              </div>
              {/* <div className='remeber-forgot'>
                <label><input type="checkbox" />Remeber me</label>
                <Link to="/signup">Forgot password? </Link>
              </div>
              <button type='submit'>Login</button>
              <div className='register-link'>
                <p>Don't have an account? <Link to="/signup">Register</Link></p>
              </div> */}

    </form>
  </div>
  </div>
 </div>

    </>
    );
}

export default Contacts;