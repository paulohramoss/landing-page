import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
        <div className="testimonial-grid">
          {testimonials.map((testimonial, i) => (
            <motion.figure
              key={testimonial.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
