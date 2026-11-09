import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
    <section className="section" aria-labelledby="depoimentos-titulo" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Depoimentos</span>
          <h2 id="depoimentos-titulo">Quem já escolheu a Vidraçaria Ramos recomenda</h2>
          <p>
            Clientes residenciais e empresas que confiam na nossa qualidade e voltam sempre.
          </p>
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
              <div className="testimonial-stars" role="img" aria-label="Nota 5 de 5">
                ★★★★★
              </div>
              <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <figcaption className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {getInitials(testimonial.name)}
                </div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                  <span className="testimonial-project-type">{testimonial.projectType}</span>
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
