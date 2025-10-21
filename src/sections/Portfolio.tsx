import showroom from '../assets/showroom.svg';
import fachada from '../assets/fachada.svg';
import varanda from '../assets/varanda.svg';

const projects = [
  {
    image: showroom,
    title: 'Showroom corporativo',
    description: 'Divisórias de vidro laminado com portas pivotantes e perfis premium anodizados.'
  },
  {
    image: fachada,
    title: 'Fachada comercial',
    description: 'Estrutura pele de vidro com caixilhos ocultos e película de proteção solar.'
  },
  {
    image: varanda,
    title: 'Fechamento de varanda',
    description: 'Sistema de vidro retrátil que garante conforto térmico sem perder a vista.'
  }
];

function Portfolio(): JSX.Element {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Projetos em destaque</span>
          <h2>Ambientes sofisticados e funcionais que encantam seus clientes</h2>
          <p>
            Conheça algumas das nossas entregas recentes em empresas, condomínios e residências de alto
            padrão.
          </p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <article key={project.title} className="portfolio-card">
              <img src={project.image} alt={project.title} />
              <div className="portfolio-card__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
