import { useReducer, createContext, useState } from 'react';
import './App.scss';
import BirthdayForm from './components/BirthdayForm';
import Output from './components/Output';

export const UserContext = createContext();

const initialState = {
  year: null,
  month: null,
  day: null,
  ageYears: '--',
  ageMonths: '--',
  ageDays: '--',
};

function reducer(state, action) {
  switch (action.type) {
    case 'set-day':
      return {
        ...state,
        day: action.payload,
      };
    case 'set-month':
      return {
        ...state,
        month: action.payload,
      };
    case 'set-year':
      return {
        ...state,
        year: action.payload,
      };
    case 'age-year':
      return {
        ...state,
        ageYears: action.payload,
      };
    case 'age-month':
      return {
        ...state,
        ageMonths: action.payload,
      };
    case 'age-day':
      return {
        ...state,
        ageDays: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main>
      <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
        <BirthdayForm />
        <Output />
      </UserContext.Provider>
    </main>
  );
}

export default App;
