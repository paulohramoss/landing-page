import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function goTo(index: number) {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 })
  };

  const t = testimonials[active];

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

        <div className="testimonial-carousel">
          <div className="testimonial-carousel-track">
            {testimonials.map((testimonial, i) => {
              const offset = i - active;
              const normalizedOffset =
                offset > testimonials.length / 2
                  ? offset - testimonials.length
                  : offset < -testimonials.length / 2
                  ? offset + testimonials.length
                  : offset;

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
              );
            })}
          </div>

          <div className="testimonial-dots" role="tablist" aria-label="Depoimentos">
            {testimonials.map((_, i) => (
              <button
                key={i}
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
