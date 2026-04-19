import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '1',
    title: 'Contato & Medição',
    description: 'Você entra em contato, agendamos uma visita e medimos o local com precisão.'
  },
  {
    number: '2',
    title: 'Orçamento em 24h',
    description: 'Enviamos um orçamento detalhado em até 24 horas, sem compromisso e sem surpresas.'
  },
  {
    number: '3',
    title: 'Fabricação sob medida',
    description: 'Produção própria com materiais certificados e controle de qualidade em cada etapa.'
  },
  {
    number: '4',
    title: 'Instalação com garantia',
    description: 'Nossa equipe instala com segurança e limpeza. Você recebe garantia total por escrito.'
  }
];

function Process(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section alt" id="processo" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Como trabalhamos</span>
          <h2>Do primeiro contato à entrega final</h2>
          <p>
            Um processo simples, transparente e sem complicação — para que você foque no resultado,
            não na burocracia.
          </p>
        </motion.div>

        <div className="process-steps">
          {/* Linha conectora animada */}
          {!prefersReducedMotion && (
            <div className="process-line-track" aria-hidden="true">
              <motion.div
                className="process-line-fill"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              />
            </div>
          )}

          <div className="process-grid">
            {steps.map((step, i) => (
              <motion.article
                key={step.number}
                className="process-card"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.15 }}
              >
                <div className="process-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
