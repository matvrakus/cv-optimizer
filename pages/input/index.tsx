import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './input.module.css';

const Input: React.FC = () => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Validera att användaren har fyllt i båda fälten
    if (!cvText.trim() || !jobDescription.trim()) {
      alert('Vänligen fyll i både CV och jobbbeskrivning');
      return;
    }

    // Spara input-data till sessionStorage
    sessionStorage.setItem('inputCv', cvText);
    sessionStorage.setItem('inputJobDescription', jobDescription);
    
    // Gå till loading-sidan där API-anropet kommer att ske
    router.push('/loading');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>Jobhelp</a>
      </header>
      
      <div className={styles.content}>
        <h2 className={styles.title}>
          Let's go! First, we need some <em className={styles.emphasis}>input</em>.
        </h2>
        
        <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <textarea
              className={styles.textarea}
              placeholder="CV text..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              rows={12}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <textarea
              className={styles.textarea}
              placeholder="Job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
            />
          </div>
        </div>
        
        <button className={styles.button} onClick={handleSubmit}>
          Work your magic
        </button>
      </div>
    </div>
  );
};

export default Input;