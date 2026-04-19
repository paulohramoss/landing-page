import { useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { MagnifyingGlass } from '@phosphor-icons/react';
import casaVidro from '../assets/portfolio/casa-vidro.jpeg';
import duasRodas from '../assets/portfolio/duas-rodas.jpeg';
import container from '../assets/portfolio/container.jpeg';
import gambatoo from '../assets/portfolio/gambatoo.jpeg';
import PortfolioLightbox from '../components/PortfolioLightbox';

type Category = 'residencial' | 'comercial';

type Project = {
  image: string;
  category: Category;
  badge: string;
  title: string;
  description: string;
};

const projects: Project[] = [
  {
    image: casaVidro,
    category: 'residencial',
    badge: 'Residencial',
    title: 'Residência contemporânea',
    description:
      'Residência de alto padrão com esquadrias amplas, volumes geométricos e acabamento em tons neutros.'
  },
  {
    image: duasRodas,
    category: 'comercial',
    badge: 'Comercial',
    title: 'Concessionária Duas Rodas',
    description:
      'Fachada comercial com grande pano de vidro e exposição de veículos em ambiente iluminado.'
  },
  {
    image: container,
    category: 'comercial',
    badge: 'Comercial',
    title: 'Módulo multiuso em container',
    description:
      'Unidade modular com esquadrias sob medida, garantindo ventilação e privacidade para diferentes usos.'
  },
  {
    image: gambatoo,
    category: 'comercial',
    badge: 'Comercial',
    title: 'Fachada Gambatto',
    description:
      'Fachada moderna com grandes painéis de vidro que valorizam a visibilidade e a iluminação natural.'
  }
];

function Portfolio(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox  = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + projects.length) % projects.length : 0));
  const nextImage = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % projects.length : 0));

  return (
    <section className="section alt" id="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Projetos em destaque</span>
          <h2>Obras que falam por si mesmas</h2>
          <p>
            Residenciais e comerciais entregues com precisão e qualidade. Clique em qualquer
            projeto para ver os detalhes.
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
                <span className={`portfolio-badge portfolio-badge--${project.category}`}>
                  {project.badge}
                </span>
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
