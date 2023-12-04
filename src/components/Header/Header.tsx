import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.headerNav}>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/uncontrolled-form">
            <li>Uncontrolled Form</li>
          </NavLink>
          <NavLink to="/react-hook-form">
            <li>React Hook Form</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
