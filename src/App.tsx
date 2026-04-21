import Footer from './components/Footer';
import Header from './components/Header';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
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
        <Highlights />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
