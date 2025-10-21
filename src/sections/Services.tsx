import { Buildings, Door, Shower, SquaresFour } from '@phosphor-icons/react';

const services = [
  {
    icon: Door,
    title: 'Esquadrias de alumínio',
    description: 'Portas, janelas e fachadas com alta durabilidade, vedação perfeita e pintura eletrostática.'
  },
  {
    icon: Shower,
    title: 'Boxes de vidro temperado',
    description: 'Modelos de abrir, correr ou cantoneira com ferragens premium e instalação segura.'
  },
  {
    icon: Buildings,
    title: 'Fachadas comerciais',
    description: 'Estruturas elegantes que valorizam o ponto comercial com isolamento acústico e térmico.'
  },
  {
    icon: SquaresFour,
    title: 'Coberturas e guarda-corpos',
    description: 'Projetos personalizados para áreas externas com vidro laminado e alumínio reforçado.'
  }
];

function Services(): JSX.Element {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">O que fazemos</span>
          <h2>Portfólio completo em vidro temperado e alumínio sob medida</h2>
          <p>
            Atuamos do projeto à instalação com equipe própria especializada, materiais certificados e
            garantia total de serviço.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <service.icon size={32} weight="duotone" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
