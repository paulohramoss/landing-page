import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '1',
    title: 'Consultoria especializada',
    description: 'Entendemos o objetivo do projeto, indicamos materiais e apresentamos referências.'
  },
  {
    number: '2',
    title: 'Medição e projeto técnico',
    description: 'Nossa equipe realiza medições precisas e desenvolve projeto detalhado para aprovação.'
  },
  {
    number: '3',
    title: 'Fabricação e instalação',
    description: 'Produção própria com prazos ágeis e instalação limpa, seguindo todas as normas de segurança.'
  },
  {
    number: '4',
    title: 'Pós-obra e garantia',
    description: 'Entrega assistida, orientações de manutenção e garantia contra defeitos de fabricação.'
  }
];

function Process(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
          <h2>Processo transparente do primeiro contato à entrega final</h2>
        </motion.div>
        <div className="process-grid">
          {steps.map((step, i) => (
            <motion.article
              key={step.number}
              className="process-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div className="process-step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
