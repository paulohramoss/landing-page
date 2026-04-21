import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion';
import boxBanheiro from '../assets/box-banheiro.jpg';
import fachadaCasa from '../assets/fachada-casa.jpg';
import portaAluminio from '../assets/porta-aluminio.jpg';

type HeroSlide = {
  alt: string;
  caption: string;
  src: string;
  objectFit?: 'cover' | 'contain';
};

const heroSlides: HeroSlide[] = [
  {
    src: boxBanheiro,
    alt: 'Box de banheiro com vidro temperado e perfis em alumínio dourado.',
    caption: 'Box de banheiro com vidro temperado e perfis em alumínio dourado.',
    objectFit: 'contain'
  },
  {
    src: fachadaCasa,
    alt: 'Fachada residencial com amplos painéis de vidro.',
    caption: 'Fachada residencial com esquadrias de alumínio sob medida.'
  },
  {
    src: portaAluminio,
    alt: 'Porta de alumínio com acabamento sofisticado.',
    caption: 'Porta de alumínio de alto padrão para uso comercial e residencial.'
  }
];

const SLIDE_DURATION = 7000;

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

const heroFigureContent: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  }
};

function Hero(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    autoPlayRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      if (autoPlayRef.current !== undefined) {
        window.clearInterval(autoPlayRef.current);
      }
    };
  }, [prefersReducedMotion]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);

    if (prefersReducedMotion) {
      return;
    }

    if (autoPlayRef.current !== undefined) {
      window.clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <motion.section
      className="hero"
      id="inicio"
      initial="hidden"
      animate="visible"
      variants={heroSection}
    >
      <div className="container">
        {/* ── Conteúdo esquerdo ── */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
        >
          <motion.span className="hero-badge" variants={heroItem}>
            Desde 2001 — Vidraçaria de confiança
          </motion.span>
          <motion.h1 variants={heroItem}>
            Vidros temperados e esquadrias de alumínio de alta qualidade: segurança e estilo para o seu espaço.
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
              <strong>5.000+</strong>
              <span>Projetos entregues</span>
            </motion.li>
            <motion.li variants={heroStatsItem}>
              <strong>4.9/5</strong>
              <span>Avaliação dos clientes</span>
            </motion.li>
          </motion.ul>
        </motion.div>
        <motion.figure className="hero-media" variants={heroFigure}>
          <motion.div
            className="hero-media-slides"
            animate=
            {prefersReducedMotion
              ? undefined
              : {
                y: [0, -10, 0],
                rotate: [0, 0.6, -0.6, 0]
              }}
            transition=
            {prefersReducedMotion
              ? undefined
              : {
                duration: 12,
                ease: 'easeInOut',
                repeat: Infinity
              }}
          >
            {prefersReducedMotion ? (
              <img
                className="hero-media-image"
                src={activeSlide.src}
                alt={activeSlide.alt}
                style={{ objectFit: activeSlide.objectFit ?? 'cover' }}
              />
            ) : (
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide.src}
                  className="hero-media-image"
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  style={{ objectFit: activeSlide.objectFit ?? 'cover' }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={heroFigureContent}
                />
              </AnimatePresence>
            )}
          </motion.div>
          <AnimatePresence mode="wait">
            {activeSlide.caption && (
              <motion.figcaption
                key={activeSlide.caption}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                aria-live="polite"
              >
                {activeSlide.caption}
              </motion.figcaption>
            )}
          </AnimatePresence>
          <div className="hero-media-dots" role="tablist" aria-label="Projetos em destaque">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;

              return (
                <button
                  key={slide.caption}
                  type="button"
                  className={`hero-media-dot${isActive ? ' is-active' : ''}`}
                  onClick={() => handleSelectSlide(index)}
                  aria-label={`Mostrar imagem: ${slide.caption}`}
                  aria-pressed={isActive}
                  aria-current={isActive ? 'true' : undefined}
                />
              );
            })}
          </div>
          {!prefersReducedMotion && (
            <div className="hero-media-orbs" aria-hidden="true">
              <motion.span
                className="hero-media-orb hero-media-orb--lg"
                initial={{ opacity: 0, scale: 0.85, y: 0 }}
                animate={{
                  opacity: [0.45, 0.8, 0.45],
                  scale: [0.9, 1.05, 0.9],
                  y: [0, -18, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              />
              <motion.span
                className="hero-media-orb hero-media-orb--sm"
                initial={{ opacity: 0, scale: 0.8, y: 0 }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.85, 1.1, 0.85],
                  y: [0, -12, 0]
                }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
              <motion.span
                className="hero-media-orb hero-media-orb--xs"
                initial={{ opacity: 0, scale: 0.7, y: 0 }}
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.8, 1, 0.8],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              />
            </div>
          )}
        </motion.figure>
      </div>
    </motion.section>
  );
}

export default Hero;
