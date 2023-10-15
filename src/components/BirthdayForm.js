import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import FormInput from './FormInput';

function BirthdayForm() {
  const user = useContext(UserContext);
  const [error, setError] = useState('');
  const [clear, setClear] = useState(false);

  function solve(e) {
    e.preventDefault();
    const today = new Date();
    const birthday = new Date(`${user.userState.year}-${user.userState.month}-${user.userState.day}`);
    const age = new Date(today.getTime() - birthday.getTime());

    if (birthday <= today && birthday) {
      setError('');
      setClear(true);
      user.userDispatch({ type: 'set-year', payload: null });
      user.userDispatch({ type: 'set-month', payload: null });
      user.userDispatch({ type: 'set-day', payload: null });
      user.userDispatch({ type: 'age-year', payload: age.getUTCFullYear() - 1970 });
      user.userDispatch({ type: 'age-month', payload: age.getUTCMonth() });
      user.userDispatch({ type: 'age-day', payload: age.getUTCDate() - 1 });
    } else {
      setError('Please enter a valid birthday');
      user.userDispatch({ type: 'age-year', payload: '--' });
      user.userDispatch({ type: 'age-month', payload: '--' });
      user.userDispatch({ type: 'age-day', payload: '--' });
      setClear(true);
      return;
    }
  }

  useEffect(() => setClear(false), [clear]);

  return (
    <section className='birthday-form'>
      <form onSubmit={solve}>
        <FormInput name='day' placeholder='DD' header='Day' clear={clear} />
        <FormInput name='month' placeholder='MM' header='Month' clear={clear} />
        <FormInput name='year' placeholder='YYYY' header='Year' clear={clear} />
        <button type='submit'>
          <svg xmlns='http://www.w3.org/2000/svg' width='46' height='44' viewBox='0 0 46 44'>
            <g fill='none' stroke='#FFF' stroke-width='2'>
              <path d='M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44' />
            </g>
          </svg>
        </button>
      </form>
      <p className='error'>{error}</p>
      <hr />
    </section>
  );
}

export default BirthdayForm;
