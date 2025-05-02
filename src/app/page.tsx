import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <>
      <Header/>
      <Main />
      <Footer/>
      <Analytics />
    </>
  )
}
