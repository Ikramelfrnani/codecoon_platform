import React from 'react';
import HeroSection from '../Components/HeroSection';
import NavFst from '../Components/NavFst';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';
import CardHome from '../Components/CardHome';

function Home() {
  return (
    <div>
      <NavFst />
      <HeroSection />
      <CardHome />
      <div id="tutorial">
        <center>
        <h1 style={{width:'100%', fontSize:'3rem', marginTop:'8%'}}>Learn to code anytime, from anywhere</h1>
        <p style={{width:'70%', fontSize:'2rem'}}>With CodeCoon, you can always choose the experience that suits you best – on your computer or on your phone.</p>
        <video width="50%" height="400" controls autoPlay muted loop playsInline style={{marginTop:'5%', marginBottom:'5%'}}>
          <source src="/videos/tutorial.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video></center>
      </div>
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;
