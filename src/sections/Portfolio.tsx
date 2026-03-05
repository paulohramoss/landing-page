import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import casaVidro from '../assets/portfolio/casa-vidro.jpeg';
import duasRodas from '../assets/portfolio/duas-rodas.jpeg';
import container from '../assets/portfolio/container.jpeg';

const projects = [
  {
    image: casaVidro,
    badge: 'Residencial',
    title: 'Residência contemporânea',
    description:
      'Residência térrea de alto padrão com volumes geométricos, esquadrias amplas e acabamento em tons neutros.'
  },
  {
    image: duasRodas,
    badge: 'Comercial',
    title: 'Concessionária Duas Rodas',
    description:
      'Fachada comercial com marquise, grande pano de vidro e exposição de veículos em ambiente iluminado.'
  },
  {
    image: container,
    badge: 'Modular',
    title: 'Módulo multiuso em container',
    description:
      'Unidade modular com aberturas em venezianas garantindo ventilação e privacidade para diferentes usos.'
  }
];

function Portfolio(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Projetos em destaque</span>
          <h2>Ambientes sofisticados e funcionais que encantam seus clientes</h2>
          <p>
            Veja algumas obras recentes entregues pela equipe: residenciais, comerciais e soluções modulares
            que evidenciam a versatilidade do nosso trabalho.
          </p>
        </motion.div>
        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className="portfolio-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
            >
              <div className="portfolio-card__image-wrap">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="portfolio-card__content">
                <span className="portfolio-badge">{project.badge}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
