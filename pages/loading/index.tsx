import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './loading.module.css';

const Loading: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const processCV = async () => {
      try {
        // Hämta input-data från sessionStorage
        const cvText = sessionStorage.getItem('inputCv');
        const jobDescription = sessionStorage.getItem('inputJobDescription');

        if (!cvText || !jobDescription) {
          console.error('Ingen input-data hittades');
          router.push('/');
          return;
        }

        console.log('Skickar API-anrop till n8n...');

        const response = await fetch('https://matvrakus.app.n8n.cloud/webhook/cv-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cv: cvText, jd: jobDescription }),
        });

        const result = await response.json();
        console.log('Response from n8n:', result);

        let cvToStore = '';
        
        if (Array.isArray(result)) {
          const firstItem = result[0];
          if (firstItem) {
            cvToStore = firstItem.optimizedCv || firstItem.output || firstItem.cv || '';
          }
        } else if (typeof result === 'object' && result !== null) {
          cvToStore = result.optimizedCv || result.output || result.cv || '';
        } else if (typeof result === 'string') {
          cvToStore = result;
        }

        if (!cvToStore) {
          console.error('Kunde inte extrahera CV från svaret:', result);
          setError('Kunde inte extrahera CV från svaret. Försök igen.');
          return;
        }

        // Ta bort eventuella citattecken som wrappar hela texten
        let cleanedCv = cvToStore;
        if ((cleanedCv.startsWith('"') && cleanedCv.endsWith('"')) || 
            (cleanedCv.startsWith("'") && cleanedCv.endsWith("'"))) {
          cleanedCv = cleanedCv.slice(1, -1);
        }
        // Ta bort escaped citattecken
        cleanedCv = cleanedCv.replace(/\\"/g, '"').replace(/\\'/g, "'");

        // Spara det optimerade CV:t
        sessionStorage.setItem('cv', cleanedCv);
        
        // Rensa input-data eftersom vi inte behöver den längre
        sessionStorage.removeItem('inputCv');
        sessionStorage.removeItem('inputJobDescription');

        console.log('CV optimerat och sparat, redirectar till output...');
        
        // Gå till output-sidan
        router.push('/output');

      } catch (error) {
        console.error('Fel vid API-anrop:', error);
        setError('Ett fel uppstod vid optimering av CV:t. Försök igen.');
      }
    };

    processCV();
  }, [router]);

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.error}>
            <h2>Fel uppstod</h2>
            <p>{error}</p>
            <button onClick={() => router.push('/')} className={styles.button}>
              Tillbaka till start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>Jobhelp</a>
      </header>
      
      <div className={styles.content}>
        <h2 className={styles.title}>
          It's time to get the job you want.
          <br />
          We're <em className={styles.emphasis}>helping you</em>...
        </h2>
        
        <div className={styles.spinner}>
          <div className={styles.spinnerInner}></div>
        </div>
        
        <div className={styles.formula}>
          <span className={styles.formulaText}>Your CV</span>
          <span className={styles.plus}>+</span>
          <span className={styles.formulaText}>
            Jobhelp
            <br />
            <span className={styles.small}>customization</span>
          </span>
          <span className={styles.equals}>=</span>
          <span className={styles.formulaText}>Your new job!</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;