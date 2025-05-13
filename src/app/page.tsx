import Header from '../components/Header';
import Footer from '../components/Footer';
import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense } from 'react';

const Main= lazy(() => import('../components/Main'));

export default function Home() {

  return (
    <>
      <Header/>
        <Suspense fallback={<div className="loader">Loading content...</div>}>
          <Main />
        </Suspense>
      <Footer/>
      <Analytics />
    </>
  )
}
