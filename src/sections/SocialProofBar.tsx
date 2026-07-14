import { SealCheck, ShieldCheck, MapPin } from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const trustItems = [
  { icon: SealCheck, label: 'Materiais certificados INMETRO' },
  { icon: ShieldCheck, label: 'Garantia na instalação' },
  { icon: MapPin, label: 'São Miguel do Oeste/SC e região' }
];

function SocialProofBar(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section className="social-proof-bar" ref={ref} aria-label="Selos de confiança">
      <motion.div
        className="container social-proof-bar__inner"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ul className="social-proof-bar__items">
          {trustItems.map((item) => (
            <li key={item.label}>
              <item.icon size={20} weight="duotone" />
              {item.label}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export default SocialProofBar;
