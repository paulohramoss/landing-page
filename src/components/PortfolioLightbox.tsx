import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from '@phosphor-icons/react';

type LightboxImage = {
  src: string;
  srcWebp: string;
  title: string;
  description: string;
  badge: string;
};

type PortfolioLightboxProps = {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function PortfolioLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext
}: PortfolioLightboxProps): JSX.Element {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizar projeto"
    >
      <motion.div
        className="lightbox-content"
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-image-wrap">
          <AnimatePresence mode="wait">
            <picture key={current.src}>
              <source srcSet={current.srcWebp} type="image/webp" />
              <motion.img
                src={current.src}
                alt={current.title}
                className="lightbox-image"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
              />
            </picture>
          </AnimatePresence>

          <button className="lightbox-close" onClick={onClose} aria-label="Fechar">
            <X size={20} weight="bold" />
          </button>

          <button
            className="lightbox-nav lightbox-nav--prev"
            onClick={onPrev}
            aria-label="Projeto anterior"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <button
            className="lightbox-nav lightbox-nav--next"
            onClick={onNext}
            aria-label="Próximo projeto"
          >
            <ArrowRight size={20} weight="bold" />
          </button>

          <div className="lightbox-dots" aria-hidden="true">
            {images.map((_, i) => (
              <span
                key={i}
                className={`lightbox-dot${i === currentIndex ? ' is-active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="lightbox-info">
          <span className="portfolio-badge">{current.badge}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PortfolioLightbox;
