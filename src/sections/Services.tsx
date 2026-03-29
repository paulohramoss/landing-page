import { Buildings, Door, Shower, SquaresFour, ArrowRight } from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: Door,
    title: 'Esquadrias de alumínio',
    description: 'Portas, janelas e fachadas com alta durabilidade, vedação perfeita e pintura eletrostática.',
    detail: 'Ideal para residências e comércios que buscam elegância e eficiência energética.'
  },
  {
    icon: Shower,
    title: 'Boxes de vidro temperado',
    description: 'Modelos de abrir, correr ou cantoneira com ferragens premium e instalação segura.',
    detail: 'Vidro temperado 8mm com tratamento antichoque e certificação INMETRO.'
  },
  {
    icon: Buildings,
    title: 'Fachadas comerciais',
    description: 'Estruturas elegantes que valorizam o ponto comercial com isolamento acústico e térmico.',
    detail: 'Projetos personalizados que transformam a identidade visual do seu negócio.'
  },
  {
    icon: SquaresFour,
    title: 'Coberturas e guarda-corpos',
    description: 'Projetos personalizados para áreas externas com vidro laminado e alumínio reforçado.',
    detail: 'Soluções seguras para varandas, escadas e áreas de lazer.'
  }
];

function Services(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="servicos" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">O que fazemos</span>
          <h2>Portfólio completo em vidro temperado e alumínio sob medida</h2>
          <p>
            Atuamos do projeto à instalação com equipe própria especializada, materiais certificados e
            garantia total de serviço.
          </p>
        </motion.div>
        <div className="service-grid">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div className="service-card__icon">
                <service.icon size={32} weight="duotone" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p className="service-card__detail">{service.detail}</p>
              <a href="#contato" className="service-card__cta">
                Solicitar orçamento <ArrowRight size={14} weight="bold" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
