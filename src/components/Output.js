import { useContext } from 'react';
import { UserContext } from '../App';

function Output() {
  const user = useContext(UserContext);

  return (
    <section className='output'>
      <p>
        <span>{user.userState.ageYears}</span>Years
      </p>
      <p>
        <span>{user.userState.ageMonths}</span>Months
      </p>
      <p>
        <span>{user.userState.ageDays}</span>Days
      </p>
    </section>
  );
}

export default Output;
