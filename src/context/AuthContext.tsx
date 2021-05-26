import React, { createContext, useReducer } from 'react';
import instance from '../api/apiConfig';

const initialState = {
  alert: '',
  loading: false,
  error: '',
  userLogin: () => {},
  userRegister: () => {},
};

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ALERT':
      return { ...state, alert: action.payload };
    case 'LOGIN':
      return { ...state, loading: false, error: '' };
    case 'REGISTER': 
      return {...state, alert:action.payload,loading: false, error:''};
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
   
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthStateType>(initialState);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const userLogin = async (creds: Creds) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let { data } = await instance.post('/auth/login', creds);
      localStorage.setItem('token', data.token);

      dispatch({ type: 'LOGIN' });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR', payload: 'Email or password is incorrect!' });
    }
  };

  const userRegister = async (register: User) => {
    try {
      let {data} = await instance.post('/auth/register', register);
      console.log('register', data)
      dispatch({ type: 'REGISTER' })
      dispatch({type:'ALERT', payload:'You have successfully been registered, you can login to get started!'})

    }
    catch (err){
      console.log(err);
      console.log('error',err.response.data.message)
      // let {message} = await instance.post('/auth/register')
      dispatch({ type: 'ERROR', payload:err });
    }
  }

  // Function for userRegistration

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        alert: state.alert,
        loading: state.loading,
        userLogin,
        userRegister,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
