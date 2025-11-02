import Footer from './components/Footer';
import Header from './components/Header';
import FloatingChat from './components/FloatingChat';
import CallToAction from './sections/CallToAction';
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
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default App;
