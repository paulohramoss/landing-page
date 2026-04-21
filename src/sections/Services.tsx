import { Shower, FrameCorners, Door, Buildings, FlipHorizontal, Umbrella, ArrowRight } from '@phosphor-icons/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: Shower,
    title: 'Box de Banheiro',
    description: 'Modelos de abrir, correr ou cantoneira com ferragens premium e instalação segura.',
    detail: 'Vidro temperado 8mm com certificação INMETRO. Perfis em alumínio, preto fosco ou inox.'
  },
  {
    icon: FrameCorners,
    title: 'Janelas de Alumínio',
    description: 'Janelas sob medida em todos os modelos — correr, basculante, maxim-ar e pivotante.',
    detail: 'Alumínio anodizado ou pintado. Vidro simples, duplo ou refletivo conforme o projeto.'
  },
  {
    icon: Door,
    title: 'Portas & Divisórias',
    description: 'Portas de vidro temperado e divisórias internas para ambientes modernos e funcionais.',
    detail: 'Temperado 10mm ou laminado. Ideal para escritórios, lojas e residências.'
  },
  {
    icon: Buildings,
    title: 'Fachadas Comerciais',
    description: 'Estruturas elegantes que valorizam o ponto comercial com isolamento e design personalizado.',
    detail: 'Projetos que transformam a identidade visual do negócio com vidro e alumínio de alto padrão.'
  },
  {
    icon: FlipHorizontal,
    title: 'Espelhos',
    description: 'Espelhos de todos os formatos e tamanhos para banheiros, academias e ambientes de decoração.',
    detail: 'Bisotê, lapidado ou liso. Instalação com fixação segura e acabamento impecável.'
  },
  {
    icon: Umbrella,
    title: 'Coberturas & Guarda-corpos',
    description: 'Coberturas de vidro e guarda-corpos para varandas, escadas e áreas de lazer.',
    detail: 'Vidro laminado com película de segurança. Estrutura em alumínio ou aço inox.'
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
          <h2>Soluções completas em vidro e alumínio</h2>
          <p>
            Do projeto residencial ao comercial — atendemos com equipe própria especializada,
            materiais certificados e garantia total de serviço.
          </p>
        </motion.div>

        <div className="service-grid">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
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
