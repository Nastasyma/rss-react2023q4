import Button from '../Button/Button';
import styles from './FormWrapper.module.scss';

export interface FormWrapperProps {
  title: string;
  buttonText: string;
  children: React.ReactNode;
  disableBtn?: boolean;
}

function FormWrapper({
  title,
  buttonText,
  children,
  disableBtn = false,
}: FormWrapperProps): JSX.Element {
  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.line} />

      {children}

      <Button type="submit" height="48px" width="80%" disabled={disableBtn}>
        {buttonText}
      </Button>
    </div>
  );
}

export { FormWrapper };
