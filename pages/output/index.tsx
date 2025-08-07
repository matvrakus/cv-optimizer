import React, { useEffect, useState } from 'react';
import styles from './output.module.css';
import { useRouter } from 'next/router';

const Output: React.FC = () => {
  const [optimizedCv, setOptimizedCv] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Lägg till en liten delay för att säkerställa att sessionStorage är tillgängligt
    const timer = setTimeout(() => {
      try {
        const storedCv = sessionStorage.getItem('cv');
        console.log('Stored CV from sessionStorage:', storedCv);
        
        if (storedCv && storedCv.trim() && storedCv !== 'null') {
          // Ta bort eventuella citattecken som wrappar hela texten
          let cleanedCv = storedCv;
          if ((cleanedCv.startsWith('"') && cleanedCv.endsWith('"')) || 
              (cleanedCv.startsWith("'") && cleanedCv.endsWith("'"))) {
            cleanedCv = cleanedCv.slice(1, -1);
          }
          // Ta bort escaped citattecken
          cleanedCv = cleanedCv.replace(/\\"/g, '"').replace(/\\'/g, "'");
          
          setOptimizedCv(cleanedCv);
        } else {
          console.error('Inget CV hittades i sessionStorage');
          router.push('/');
        }
      } catch (error) {
        console.error('Fel vid hämtning från sessionStorage:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timer);
  }, [router]);

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
  };

  const handleDoMore = () => {
    // Rensa sessionStorage när användaren vill göra ett nytt CV
    sessionStorage.removeItem('cv');
    router.push('/input');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div>Laddar optimerat CV...</div>
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
          Success. <em className={styles.emphasis}>Check it out!</em>
        </h2>

        <div className={styles.cvContainer}>
          <h3 className={styles.cvLabel}>CV</h3>
          <div className={styles.cvPreview}>
            <div className={styles.cvContent}>
              {optimizedCv ? (
                <pre className={styles.cvText}>{optimizedCv}</pre>
              ) : (
                <div className={styles.cvPlaceholder}>
                  Your customized CV will appear here...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleDownloadPDF}>
            Download CV (pdf)
          </button>
          <button className={styles.button} onClick={handleDoMore}>
            Let's do one more...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Output;