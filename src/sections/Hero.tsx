import { motion, Variants } from 'framer-motion';
import heroImage from '../assets/hero-showcase.svg';

const heroContainer: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const heroFigure: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

function Hero(): JSX.Element {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <motion.div
          className="hero-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          variants={heroContainer}
        >
          <span className="hero-badge">Desde 2000 transformando ambientes</span>
          <h1>
            Vidros temperados e esquadrias de alumínio sob medida com acabamento impecável.
          </h1>
          <p>
            Projetos residenciais, comerciais e corporativos com atendimento personalizado, prazos
            cumpridos e garantia total na instalação.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#contato">
              Solicitar orçamento
            </a>
            <a className="btn secondary" href="#portfolio">
              Ver portfólio
            </a>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>25+</strong>
              <span>Anos de experiência</span>
            </li>
            <li>
              <strong>800+</strong>
              <span>Projetos entregues</span>
            </li>
            <li>
              <strong>4.9/5</strong>
              <span>Avaliação dos clientes</span>
            </li>
          </ul>
        </motion.div>
        <motion.figure
          className="hero-media"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          variants={heroFigure}
        >
          <img src={heroImage} alt="Ambiente com portas e janelas de vidro" />
          <figcaption>Projetos sob medida para cada ambiente</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default Hero;
