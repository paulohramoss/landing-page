import Footer from './components/Footer';
import Header from './components/Header';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import CallToAction from './sections/CallToAction';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Highlights from './sections/Highlights';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import useTheme from './hooks/useTheme';

function App(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <Header theme={theme} onToggleTheme={toggleTheme} />
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
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
