import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../utils/AuthContext';
import { Link } from 'react-router-dom'
import "./css/RegistrationLoginform.css"

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
        if (result.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
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
    <div className='registration_form'>
    <h1 >Log in</h1>
    <form className='registration_form_body' onSubmit={handleSubmit(onSubmit)}>
      <p className='input_text'>Email address or user name</p>
      
        <input className='input_field' {...register('login', { required: 'Username/Email is required' })} />
        {errors.login && <p className='input_error'>{errors.login.message}</p>}
      
      
        <p className='input_text'>Password</p>
        <input className='input_field' type="password" {...register('password', { required: 'Password is required' })} />
        {errors.password && <p className='input_error'>{errors.password.message}</p>}
      
      {serverError && <p>{serverError}</p>}
      <p className='input_text'><input type="checkbox" name="Re" id="" />Remember me</p>
      <p className='input_text'>By continuing you agree to the <u><b>Terms of use</b></u> and <u><b>Privacy Policy.</b></u></p>
      
      <button className='input_field' type="submit">Log in</button>
      <p className='input_text'>   <Link to='/' style={{color: "black", textAlign:"center"}}><u><b>Forgot your password ?</b></u></Link></p>
      <p className='input_text'>Don’t have an account?   <Link to='/signup' style={{color: "black"}}><u><b>Sign up</b></u></Link></p>

    </form>
    </div>
  );
}

export default LoginForm;
