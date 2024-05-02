import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../utils/AuthContext';
import { Link } from 'react-router-dom'
import "./css/RegistrationLoginform.css";
import { FaUser, FaLock } from 'react-icons/fa';


function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  // useContext() metodas yra naudojamas, kad pasiekti AuthContext objektą
  // kaip lifte mes paspaudžiame mygtuką ir galime pasiekti, bet kokį aukšta
  const { loginUser } = useContext(AuthContext);
  const [serverError, setServerError] = useState(null);

  const { user, token } = useContext(AuthContext);
  useEffect(() => {
    // If user is logged in then redirect him to home page
    if(token && user){
      navigate("/");
      return;
    }
  }, [token, user, navigate])

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
      // jeigu gauname result ir result turi tokeną, tai nukreipiame vartotoją į dashboard puslapį arba admin-dashboard puslapį
      if (result && result.token) {
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.status === 400){
        const errors = error.response.data.errors;
        for(let i = 0; i < errors.length; i++){
          setError(errors[i].path, {
            type: "manual",
            message: errors[i].msg
          });
        }
      }
      else{
        setServerError(error.message);
      }
    }
  };

  return (
    <>

    <div className='wrapper-body'>
    <div className='wrapper'>
      <div className="from-box login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='loginName'>Login</h1>
          <div className='input-box'>
            <input type="text" placeholder='Username' {...register('login', { required: 'Username/Email is required' })} />
            {errors.login && <p className='input_error'>{errors.login.message}</p>}
            <FaUser className='icon'/>
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' {...register('password', { required: 'Password is required' })} />
            {errors.password && <p className='input_error'>{errors.password.message}</p>}
          <FaLock className='icon' />
          </div>
          <div className='remeber-forgot'>
    <label><input type="checkbox"/>Remeber me</label>
    <a href="signup">Forgot password? </a>
          </div>
          <button type='submit'>Login</button>
          <div className='register-link'>
            <p>Don't have an account? <a href="/signup">Register</a></p>
          </div>
    
        </form>
      </div>
    </div>
    </div>
        {/* <div className='login_img'>
          <img src="https://th.bing.com/th/id/OIP._0uBOMn3IRWsPloTmZqOcwHaJS?w=143&h=180&c=7&r=0&o=5&pid=1.7" alt="login" />
        </div>
        <div className='registration_form'>
        <h1 className='form'>Log in</h1>
        <form className='registration_form_body' onSubmit={handleSubmit(onSubmit)}>
          <p className='input_text' style={{marginTop: "45px"}} >Email address or username</p>
          
            <input className='input_field' {...register('login', { required: 'Username/Email is required' })} />
            {errors.login && <p className='input_error'>{errors.login.message}</p>}
          
          
            <p className='input_text'style={{marginTop: "45px"}} >Password</p>
            <input className='input_field' type="password" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p className='input_error'>{errors.password.message}</p>}
          
          {serverError && <p>{serverError}</p>}
          <p className='input_text'><input type="checkbox" />Remember me</p>
          <p className='input_text'>By continuing you agree to the <u><b>Terms of use</b></u> and <u><b>Privacy Policy.</b></u></p>
          
          <button className='input_field' type="submit">Log in</button>
          <p className='input_text'>   <Link to='/' style={{color: "black", textAlign:"center"}}><u><b>Forgot your password ?</b></u></Link></p>
          <p className='input_text'>Don’t have an account?   <Link to='/signup' style={{color: "black"}}><u><b>Sign up</b></u></Link></p>
    
        </form>
        </div> */}
        </>
  );
}

export default LoginForm;
