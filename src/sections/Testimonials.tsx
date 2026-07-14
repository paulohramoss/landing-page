import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

type Testimonial = {
  name: string;
  role: string;
  projectType: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Fernanda Mota',
    role: 'Arquiteta — Studio FM',
    projectType: 'Fachada comercial em vidro',
    quote:
      'A Vidraçaria Ramos virou parceira nos projetos corporativos pela agilidade e cuidado com os detalhes. Entregam exatamente o que foi aprovado com nossos clientes.'
  },
  {
    name: 'Ricardo Alves',
    role: 'Síndico — Condomínio Horizon',
    projectType: 'Fechamento de varandas',
    quote:
      'Fechamos todas as varandas do edifício com o sistema retrátil. Prazos cumpridos, equipe organizada e suporte pós-obra quando precisamos.'
  },
  {
    name: 'Juliana Martins',
    role: 'Empresária — Café Solar',
    projectType: 'Fachada em pele de vidro',
    quote:
      'A fachada transformou completamente a apresentação do nosso negócio. Recebemos elogios diários dos clientes e as vendas aumentaram.'
  }
];

const AUTOPLAY_INTERVAL = 6000;

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
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  function goTo(index: number) {
    setActive(index);
  }

  return (
    <section className="section" aria-labelledby="depoimentos-titulo" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow" id="depoimentos-titulo">Depoimentos</span>
          <h2>Quem já escolheu a Vidraçaria Ramos recomenda</h2>
          <p>
            Clientes residenciais e empresas que confiam na nossa qualidade e voltam sempre.
          </p>
        </motion.div>

        <div className="testimonial-carousel">
          <div className="testimonial-carousel-track">
            {testimonials.map((testimonial, i) => {
              const offset = i - active;
              let normalizedOffset = offset;
              if (offset > testimonials.length / 2) {
                normalizedOffset -= testimonials.length;
              } else if (offset < -testimonials.length / 2) {
                normalizedOffset += testimonials.length;
              }

              const isActive = normalizedOffset === 0;
              const isPrev = normalizedOffset === -1;
              const isNext = normalizedOffset === 1;
              const isVisible = isActive || isPrev || isNext;

              if (!isVisible) return null;

              return (
                <motion.figure
                  key={testimonial.name}
                  className="testimonial-card testimonial-card--peek"
                  animate={{
                    x: `calc(${normalizedOffset * 100}% + ${normalizedOffset * 16}px)`,
                    scale: isActive ? 1 : 0.88,
                    opacity: isActive ? 1 : 0.45,
                    zIndex: isActive ? 2 : 1,
                    filter: isActive ? 'none' : 'blur(1px)'
                  }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  onClick={() => !isActive && goTo(i)}
                  style={{ cursor: isActive ? 'default' : 'pointer' }}
                >
                  <div className="testimonial-stars" aria-label="5 estrelas">★★★★★</div>
                  <blockquote>&quot;{testimonial.quote}&quot;</blockquote>
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
              );
            })}
          </div>

          <div className="testimonial-dots" role="tablist" aria-label="Depoimentos">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                role="tab"
                aria-selected={i === active}
                aria-label={`Depoimento ${i + 1}`}
                className={`testimonial-dot${i === active ? ' testimonial-dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
