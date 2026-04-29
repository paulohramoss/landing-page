import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, Variants, useInView } from 'framer-motion';
import boxBanheiro from '../assets/box-banheiro.jpg';
import fachadaCasa from '../assets/fachada-casa.jpg';
import portaAluminio from '../assets/porta-aluminio.jpg';

type HeroSlide = {
  alt: string;
  caption: string;
  badge: string;
  src: string;
  objectFit?: 'cover' | 'contain';
};

const heroSlides: HeroSlide[] = [
  {
    src: boxBanheiro,
    alt: 'Box de banheiro com vidro temperado e perfis em alumínio dourado.',
    caption: 'Box de banheiro com vidro temperado e perfis em alumínio dourado.',
    badge: 'Box e Espelhos',
    objectFit: 'contain'
  },
  {
    src: fachadaCasa,
    alt: 'Fachada residencial com amplos painéis de vidro.',
    caption: 'Fachada residencial com esquadrias de alumínio sob medida.',
    badge: 'Fachadas'
  },
  {
    src: portaAluminio,
    alt: 'Porta de alumínio com acabamento sofisticado.',
    caption: 'Porta de alumínio de alto padrão para uso comercial e residencial.',
    badge: 'Esquadrias'
  }
];

const SLIDE_DURATION = 7000;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
};

const mediaVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: 'easeOut', delay: 0.2 }
  }
};

const slideVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function useCountUp(target: number, decimals: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((target * eased).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, decimals, duration]);

  return count;
}

function Hero(): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<number | undefined>(undefined);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' });
  const countersActive = statsInView && !prefersReducedMotion;

  const count25 = useCountUp(25, 0, 1.8, countersActive);
  const count2000 = useCountUp(2000, 0, 2.2, countersActive);
  const count49 = useCountUp(4.9, 1, 1.8, countersActive);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    autoPlayRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      if (autoPlayRef.current !== undefined) window.clearInterval(autoPlayRef.current);
    };
  }, [prefersReducedMotion]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    if (prefersReducedMotion) return;
    if (autoPlayRef.current !== undefined) window.clearInterval(autoPlayRef.current);
    autoPlayRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <section className="hero" id="inicio">
      <div className="container">
        {/* ── Conteúdo esquerdo ── */}
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span className="hero-badge" variants={itemVariants}>
            Desde 2001 — Vidraçaria de confiança
          </motion.span>
          <motion.h1 variants={itemVariants}>
            Vidros temperados e esquadrias de alumínio de alta qualidade: segurança e estilo para o seu espaço.
          </motion.h1>

          <motion.p variants={itemVariants}>
            Do box de banheiro à fachada comercial — projetos entregues com
            prazo, garantia e qualidade comprovada.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <a className="btn primary" href="#contato">
              Solicitar orçamento grátis
            </a>
            <a className="btn secondary" href="#portfolio">
              Ver projetos realizados
            </a>
          </motion.div>

          <motion.ul className="hero-stats" ref={statsRef} variants={itemVariants}>
            <li>
              <strong>{prefersReducedMotion ? '25' : count25}+</strong>
              <span>Anos de experiência</span>
            </li>
            <li>
              <strong>{prefersReducedMotion ? '2.000' : count2000}+</strong>
              <span>Projetos entregues</span>
            </li>
            <li>
              <strong>{prefersReducedMotion ? '4.9' : count49}/5</strong>
              <span>Avaliação dos clientes</span>
            </li>
          </motion.ul>
        </motion.div>

        {/* ── Media direita (sobre o bloco azul) ── */}
        <motion.div
          className="hero-media"
          initial="hidden"
          animate="visible"
          variants={mediaVariants}
        >
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
            {/* Badge flutuante */}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSlide.badge}
                className="hero-media-badge"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {activeSlide.badge}
              </motion.span>
            </AnimatePresence>

            {/* Slide de imagem */}
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
                  variants={slideVariants}
                />
              </AnimatePresence>
            )}

            {/* Caption */}
            <AnimatePresence mode="wait">
              {activeSlide.caption && (
                <motion.figcaption
                  key={activeSlide.caption}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                  aria-live="polite"
                >
                  {activeSlide.caption}
                </motion.figcaption>
              )}
            </AnimatePresence>

            {/* Dots */}
            <div className="hero-media-dots" role="tablist" aria-label="Projetos em destaque">
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <button
                    key={slide.badge}
                    type="button"
                    className={`hero-media-dot${isActive ? ' is-active' : ''}`}
                    onClick={() => handleSelectSlide(index)}
                    aria-label={`Mostrar: ${slide.badge}`}
                    aria-pressed={isActive}
                    aria-current={isActive ? 'true' : undefined}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
