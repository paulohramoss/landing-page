import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Highlights from './sections/Highlights';
import Portfolio from './sections/Portfolio';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import CallToAction from './sections/CallToAction';
import Process from './sections/Process';
import GeminiChat from './components/GeminiChat';

function App(): JSX.Element {
  const fadeIn = useMemo(
    () => ({
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    }),
    []
  );

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero animation={fadeIn} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
          <Services />
        </motion.div>
        <Highlights />
        <Portfolio />
        <Process />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <GeminiChat />
    </div>
  );
}

export default App;
