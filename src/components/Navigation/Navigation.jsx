import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" className={styles.NavLink}>
            home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={styles.NavLink}>
            movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
