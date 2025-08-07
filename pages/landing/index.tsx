import React from 'react';
import { useRouter } from 'next/router';
import styles from './landing.module.css';

const Landing: React.FC = () => {
  const router = useRouter();

  const handleRoute = () => {
      // Navigate to input
      router.push('/input');
    };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>Jobhelp</a>
      </header>
    
      <div className={styles.content}>        
        <h1 className={styles.title}>
          It's time to get the job you want.
          <br />
          Let us <em className={styles.emphasis}>help you</em>.
        </h1>
        
        <button className={styles.button} onClick={handleRoute}>
          I'd love that.
        </button>
      </div>
    </div>
  );
};

export default Landing;