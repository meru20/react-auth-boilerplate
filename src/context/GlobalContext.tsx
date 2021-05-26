import React, { createContext, useReducer } from 'react';
import instance from '../api/apiConfig';

const initialState = {
  users: [],
  user: undefined,
  alert: false,
  saveUser: () => {},
  getUsers: () => {},
};

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SAVE_USER':
      return { ...state, alert: false };
    case 'GET_USERS':
      return {...state, users: action.payload}  
    case 'ALERT':
      return { ...state, alert: true };
    default:
      return state;
  }
};

export const GlobalContext = createContext<InitialStateType>(initialState);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const saveUser = async (user: User) => {
    console.log(user);
    try {
      let { data } = await instance.post('/user', user);
      console.log('this is my data', data);
      dispatch({ type: 'SAVE_USER' });
    } catch (e) {
      console.log(e);
    }
  };
  const getUsers = async () => {
    try {
        let {data} = await instance.get('/user');
        // console.log('data ', response)
        dispatch({ type: 'GET_USERS', payload: data });
      } catch (e) {
        console.log(e);
      }
}

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        alert: state.alert,
        users: state.users,
        saveUser,
        getUsers,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
