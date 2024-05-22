import React from 'react'
import './css/Contacts.css'
import { FaUser, FaLock } from 'react-icons/fa';

const Contacts = () => {
    return (
        <> 

  <div className='wrapper-body2'> 
  <div className='wrapper2'>
  <div className="from-box2 login2">
  <form>
  <h1 className='loginName2'>Quatation</h1>

  
              <div className='input-box2'>
                <input type="text" placeholder='Name'/>
                
                <FaUser className='icon2' />
              </div>
              <div className='input-box2'>
                <input type="password" placeholder='Email'/>
                
                <FaLock className='icon2' />
              </div>

              <div className='input-text-erea'>
              <textarea name='message' id='message' cols={5} rows={5} placeholder='Message'></textarea>

              </div>
              

              <div>
              <button type='submit'>Submit your request</button>
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