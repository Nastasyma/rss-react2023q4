import { useState } from 'react';
import style from './ErrorButton.module.scss';

interface ErrorButtonProps {
  title: string;
}
function ErrorButton({ title }: ErrorButtonProps): JSX.Element {
  const [hasError, setHasError] = useState(false);

  const handleClick = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Too much caffeine injected into the system!');
  }

  return (
    <button title="Click to throw error" className={style.errorButton} onClick={handleClick}>
      {title}
    </button>
  );
}

export default ErrorButton;
