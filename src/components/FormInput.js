import { useState, useContext, useRef } from 'react';
import { UserContext } from '../App';

function FormInput({ header, name, placeholder, clear, ...props }) {
  const user = useContext(UserContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  if (clear) {
    inputRef.current.value = null;
  }

  function handleError(e) {
    const now = new Date();
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case 'day':
        if (inputValue === '') {
          setError(true);
          setMessage('Field is required');
        } else if (inputValue > 31 || inputValue < 1) {
          setError(true);
          setMessage('Day must be between 1 - 31');
        } else {
          setError(false);
          setMessage('');
        }
        break;
      case 'month':
        if (inputValue === '') {
          setError(true);
          setMessage('Field is required');
        } else if (inputValue > 12 || inputValue < 1) {
          setError(true);
          setMessage('Month must be between 1 -12');
        } else {
          setError(false);
          setMessage('');
        }
        break;
      case 'year':
        if (inputValue === '') {
          setError(true);
          setMessage('Field is required');
        } else if (inputValue > now.getUTCFullYear()) {
          setError(true);
          setMessage('Cannot use future date');
        } else {
          setError(false);
          setMessage('');
        }
        break;
      default:
        setError(false);
        setMessage('');
    }
  }

  return (
    <div className='group'>
      <label htmlFor={name} className={error ? 'error' : ''}>
        {header}
      </label>
      <input type='number' name={name} placeholder={placeholder} onBlurCapture={handleError} onChange={(e) => user.userDispatch({ type: `set-${name}`, payload: e.target.value })} ref={inputRef} />
      {error && <p className='error'>{message}</p>}
    </div>
  );
}

export default FormInput;
