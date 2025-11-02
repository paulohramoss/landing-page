import { motion, Variants } from 'framer-motion';
import heroImage from '../assets/hero-showcase.svg';

const heroSection: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1
    }
  }
};

const heroContainer: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const heroStats: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.12
    }
  }
};

const heroStatsItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

const heroFigure: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut'
    }
  }
};

function Hero(): JSX.Element {
  return (
    <motion.section
      className="hero"
      id="inicio"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={heroSection}
    >
      <div className="container">
        <motion.div className="hero-content" variants={heroContainer}>
          <motion.span className="hero-badge" variants={heroItem}>
            Desde 2000 transformando ambientes
          </motion.span>
          <motion.h1 variants={heroItem}>
            Vidros temperados e esquadrias de alumínio sob medida com acabamento impecável.
          </motion.h1>
          <motion.p variants={heroItem}>
            Projetos residenciais, comerciais e corporativos com atendimento personalizado, prazos
            cumpridos e garantia total na instalação.
          </motion.p>
          <motion.div className="hero-actions" variants={heroItem}>
            <a className="btn primary" href="#contato">
              Solicitar orçamento
            </a>
            <a className="btn secondary" href="#portfolio">
              Ver portfólio
            </a>
          </motion.div>
          <motion.ul className="hero-stats" variants={heroStats}>
            <motion.li variants={heroStatsItem}>
              <strong>25+</strong>
              <span>Anos de experiência</span>
            </motion.li>
            <motion.li variants={heroStatsItem}>
              <strong>800+</strong>
              <span>Projetos entregues</span>
            </motion.li>
            <motion.li variants={heroStatsItem}>
              <strong>4.9/5</strong>
              <span>Avaliação dos clientes</span>
            </motion.li>
          </motion.ul>
        </motion.div>
        <motion.figure
          className="hero-media"
          variants={heroFigure}
        >
          <img src={heroImage} alt="Ambiente com portas e janelas de vidro" />
          <figcaption>Projetos sob medida para cada ambiente</figcaption>
        </motion.figure>
      </div>
    </motion.section>
  );
}

export default Hero;
