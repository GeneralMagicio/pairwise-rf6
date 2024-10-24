import styles from '../styles/Spinner.module.css';

const Loading = () => (
  <div className="flex w-full items-center justify-center">
    <div className={styles.loading} />
  </div>
);

export default Loading;
