import { useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { MagnifyingGlass } from '@phosphor-icons/react';
import casaVidro from '../assets/portfolio/casa-vidro.jpeg';
import duasRodas from '../assets/portfolio/duas-rodas.jpeg';
import container from '../assets/portfolio/container.jpeg';
import gambatoo from '../assets/portfolio/gambatoo.jpeg';
import PortfolioLightbox from '../components/PortfolioLightbox';

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
  },
  {
    image: gambatoo,
    badge: 'Comercial',
    title: 'Fachada Gambatto',
    description:
      'Fachada comercial moderna com grandes painéis de vidro que valorizam a visibilidade e iluminação natural do ambiente.'
  }
];

function Portfolio(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + projects.length) % projects.length : 0));
  const nextImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % projects.length : 0));

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
            que evidenciam a versatilidade do nosso trabalho. Clique para ampliar.
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
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalhes: ${project.title}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
            >
              <div className="portfolio-card__image-wrap">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-card__zoom" aria-hidden="true">
                  <MagnifyingGlass size={28} weight="bold" />
                </div>
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

      <AnimatePresence>
        {lightboxIndex !== null && (
          <PortfolioLightbox
            images={projects.map((p) => ({
              src: p.image,
              title: p.title,
              description: p.description,
              badge: p.badge
            }))}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
