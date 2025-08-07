// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/components.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
