import Navigation from '../Navigation/Navigation';
import styles from './PageHeader.module.css';

export default function PageHeader() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}
