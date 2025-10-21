import { motion, Variants } from 'framer-motion';
import heroImage from '../assets/hero-showcase.svg';

type HeroProps = {
  animation: Variants;
};

function Hero({ animation }: HeroProps): JSX.Element {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <motion.div className="hero-content" initial="hidden" animate="visible" variants={animation}>
          <span className="hero-badge">Desde 1998 transformando ambientes</span>
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img src={heroImage} alt="Ambiente com portas e janelas de vidro" />
          <figcaption>Projetos sob medida para cada ambiente</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

export default Hero;
