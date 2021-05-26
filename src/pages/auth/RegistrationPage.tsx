import { useState, useEffect, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { GlobalContext } from '../../context/GlobalContext';

const RegistrationPage = () => {
  const { error, loading, userRegister,alert } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
 
  const [register , setRegister] = useState<User>({
    email: '',
    password:'',
    firstName:'',
    lastName: '',
});
  const clearForm = () => {
    setRegister({
      email: '',
      password:'',
      firstName:'',
      lastName: '',
      
  })
  setTimeout(() => {
    setShowAlert(false);
    
  },2500);

  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    userRegister(register);
    setShowAlert(true)
    clearForm();
  };

  return (
    <div id='home'>
      <div className='row my-5 text-center'>
        <div className='col'>
          <h1>Register Now to Join our App!</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {/* <div id='hideAlert'>  */}
          {showAlert? (
            <div id='hideMe' className='text-center alert alert-success  mt-3' >{alert}</div>

          ): null}
          
          {/* {/* </div> */}
        
          <form action=''>
            <div className='form-group my-3'>
              <input
                type='text'
                className='form-control'
                placeholder='First Name'
                value={register.firstName}
                onChange={event => {
                  setRegister({...register, firstName:event.target.value})
                }}
              />
            </div>
            <div className='form-group my-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Last Name'
                value={register.lastName}
                onChange={event => {
                  setRegister({...register, lastName:event.target.value})
                }}
              />
            </div>
            <div className='form-group my-3'>
              <input 
              type='text' 
              className='form-control' 
              placeholder='Email'
              value={register.email}
              onChange={event => {
                setRegister({...register, email:event.target.value})
              }}
               />
            </div>
            <div className='form-group my-3'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={register.password}
                onChange={event => {
                  setRegister({...register, password:event.target.value})
                }}
              />
            </div>
            <div className='d-grid'>
              <button
                className='btn btn-primary btn-block'
                disabled={loading}
                onClick={handleSubmit}>
                  {loading ? (
                  <div
                    className='spinner-border spinner-border-sm'
                    role='status'>
                    <span className='visually-hidden'>Loading</span>
                  </div>
                ) : (
                'Send'
                )}
              </button>
            </div>
          </form>
          <div className='text-center text-danger mt-3'>{error}</div>
        </div>
      </div>
      <div className='row my-3 text-center'>
        <div className='col-sm-12 col-md-6 offset-md-3'>
          <div>
            Already registered?{' '}
            <Link to='/auth/login'>Click here to Login!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
