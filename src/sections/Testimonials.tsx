import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

const testimonials = [
  {
    name: 'Fernanda Mota',
    role: 'Arquiteta - Studio FM',
    quote:
      'A Vidraçaria Ramos virou parceira nos projetos corporativos pela agilidade e cuidado com os detalhes. Entregam exatamente o que foi aprovado com nossos clientes.'
  },
  {
    name: 'Ricardo Alves',
    role: 'Síndico - Condomínio Horizon',
    quote:
      'Fechamos todas as varandas do edifício com o sistema retrátil. Prazos cumpridos, equipe organizada e suporte pós-obra quando precisamos.'
  },
  {
    name: 'Juliana Martins',
    role: 'Empresária - Café Solar',
    quote:
      'A fachada em pele de vidro transformou a apresentação do nosso negócio. Recebemos elogios diários dos clientes.'
  }
];

const AUTOPLAY_INTERVAL = 5000;

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');
}

function Testimonials(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef<number | undefined>(undefined);

  const startAutoPlay = () => {
    autoPlayRef.current = window.setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
  };

  useEffect(() => {
    startAutoPlay();
    return () => window.clearInterval(autoPlayRef.current);
  }, []);

  const goTo = (index: number, dir?: number) => {
    setDirection(dir !== undefined ? dir : index > current ? 1 : -1);
    setCurrent(index);
    window.clearInterval(autoPlayRef.current);
    startAutoPlay();
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -80 : 80 })
  };

  const testimonial = testimonials[current];

  return (
    <section className="section" aria-labelledby="depoimentos" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow" id="depoimentos">
            Depoimentos
          </span>
          <h2>Quem já escolheu a Vidraçaria Ramos recomenda</h2>
        </motion.div>

        <motion.div
          className="testimonial-carousel"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={current}
              className="testimonial-card testimonial-card--featured"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              <div className="testimonial-stars" aria-label="5 estrelas">★★★★★</div>
              <blockquote>"{testimonial.quote}"</blockquote>
              <figcaption className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="testimonial-controls">
            <button
              className="testimonial-nav"
              onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length, -1)}
              aria-label="Depoimento anterior"
            >
              <ArrowLeft size={18} weight="bold" />
            </button>
            <div className="testimonial-dots" role="tablist" aria-label="Depoimentos">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  className={`testimonial-dot${i === current ? ' is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para depoimento de ${t.name}`}
                  aria-pressed={i === current}
                />
              ))}
            </div>
            <button
              className="testimonial-nav"
              onClick={() => goTo((current + 1) % testimonials.length, 1)}
              aria-label="Próximo depoimento"
            >
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
