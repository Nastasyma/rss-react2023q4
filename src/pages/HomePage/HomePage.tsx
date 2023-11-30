import styles from './HomePage.module.scss';
import { AppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBorderStyle } from '../../store/form/formSlice';

function HomePage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const formDataList = useAppSelector((state) => state.form.formDataList);

  useEffect(() => {
    const lastIndex = formDataList.length - 1;

    const timeoutId = setTimeout(() => {
      dispatch(setBorderStyle({ index: lastIndex, borderStyle: '' }));
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [formDataList, dispatch]);

  return (
    <div className={styles.homePage}>
      {formDataList.length > 0 && (
        <div className={styles.formData}>
          {formDataList.map((formData, index) => (
            <div
              className={styles.reactHookFormInfo}
              key={index}
              style={{ border: formData.borderStyle }}
            >
              <div>
                <p>
                  <b>Name:</b> <span>{formData.name}</span>
                </p>
                <p>
                  <b>Age:</b> <span>{formData.age}</span>
                </p>
                <p>
                  <b>Email:</b> <span>{formData.email}</span>
                </p>
                <p>
                  <b>Password:</b> <span>{formData.password}</span>
                </p>
                <p>
                  <b>Password confirmation:</b> <span>{formData.confirmPassword}</span>
                </p>
                <p>
                  <b>Gender:</b> <span>{formData.gender}</span>
                </p>
                <p>
                  <b>Country:</b> <span>{formData.country}</span>
                </p>
                <p>
                  <b>Accept:</b> <span>{formData.accept ? 'Yes' : 'No'}</span>
                </p>
              </div>
              <img
                src={formData.picture ? formData.picture : '../../src/assets/images/smile.png'}
                alt="react hook form image"
                className={styles.reactHookFormImg}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
