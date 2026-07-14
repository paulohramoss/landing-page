import Footer from './components/Footer';
import Header from './components/Header';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import CallToAction from './sections/CallToAction';
import Contact from './sections/Contact';
import FAQ from './sections/FAQ';
import Hero from './sections/Hero';
import SocialProofBar from './sections/SocialProofBar';
import Highlights from './sections/Highlights';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';

function App(): JSX.Element {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <SocialProofBar />
        <Highlights />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <CallToAction />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
