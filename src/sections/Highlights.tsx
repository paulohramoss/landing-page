import { Trophy, Ruler, SealCheck, Headset } from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  {
    icon: Trophy,
    title: '25 anos de experiência',
    description: 'Milhares de projetos entregues em toda a região com qualidade reconhecida e clientes que retornam.'
  },
  {
    icon: Ruler,
    title: 'Sob medida de verdade',
    description: 'Cada projeto é único — visitamos o local, medimos com precisão e executamos com nossa própria equipe.'
  },
  {
    icon: SealCheck,
    title: 'Prazo e garantia',
    description: 'Contrato com prazo definido, materiais certificados INMETRO e garantia total na instalação.'
  },
  {
    icon: Headset,
    title: 'Atendimento próximo',
    description: 'Do orçamento à entrega, você fala direto com quem executa — sem intermediários, sem surpresas.'
  }
];

function Highlights(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="section alt" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Por que nos escolher</span>
          <h2>Qualidade e compromisso em cada projeto</h2>
          <p>
            Atendemos residências, construtoras e empresas com o mesmo cuidado — do orçamento
            até a instalação finalizada.
          </p>
        </motion.div>

        <div className="highlights">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="highlight-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div className="highlight-card__icon">
                <item.icon size={26} weight="duotone" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
