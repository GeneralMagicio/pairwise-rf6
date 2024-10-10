import styles from '../styles/Spinner.module.css';

const Spinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;
