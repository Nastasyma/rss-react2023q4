import styles from './HomePage.module.scss';
import { useAppSelector } from '../../store/store';

function HomePage(): JSX.Element {
  const { name, age, email, password, confirmPassword, gender, country, accept, picture } =
    useAppSelector((state) => state.reactHookForm);

  return (
    <div className={styles.homePage}>
      <div className={styles.formData}>
        <h2>React Hook Form Data </h2>
        <div className={styles.reactHookFormInfo}>
          <div>
            <p>
              <b>Name:</b> <span>{name}</span>
            </p>
            <p>
              <b>Age:</b> <span>{age}</span>
            </p>
            <p>
              <b>Email:</b> <span>{email}</span>
            </p>
            <p>
              <b>Password:</b> <span>{password}</span>
            </p>
            <p>
              <b>Password confirmation:</b> <span>{confirmPassword}</span>
            </p>
            <p>
              <b>Gender:</b> <span>{gender}</span>
            </p>
            <p>
              <b>Country:</b> <span>{country}</span>
            </p>
            <p>
              <b>Accept:</b> <span>{accept ? 'Yes' : 'No'}</span>
            </p>
          </div>
          <img
            src={picture ? picture : '../../src/assets/images/smile.png'}
            alt="react hook form image"
            className={styles.reactHookFormImg}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
