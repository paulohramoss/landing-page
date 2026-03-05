import { CheckCircle, Ruler, HardHat } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  {
    icon: CheckCircle,
    title: 'Prazo garantido',
    description: 'Planejamento detalhado e cronograma transparente para cada etapa do projeto.'
  },
  {
    icon: Ruler,
    title: 'Medição e projeto 3D',
    description: 'Visitamos o local, realizamos medições precisas e apresentamos pré-visualização digital.'
  },
  {
    icon: HardHat,
    title: 'Equipe própria especializada',
    description: 'Instaladores treinados e certificados seguindo normas ABNT e NR-18.'
  }
];

function Highlights(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section alt" ref={ref}>
      <div className="container">
        <motion.div
          className="highlights"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', staggerChildren: 0.12 }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="highlight-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
            >
              <div className="highlight-card__icon">
                <item.icon size={32} weight="duotone" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Highlights;
