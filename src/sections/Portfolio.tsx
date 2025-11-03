import casaVidro from '../assets/portfolio/casa-vidro.jpeg';
import duasRodas from '../assets/portfolio/duas-rodas.jpeg';
import container from '../assets/portfolio/container.jpeg';

const projects = [
  {
    image: casaVidro,
    title: 'Residência contemporânea',
    description:
      'Ilustração da residência térrea de alto padrão com volumes geométricos, esquadrias amplas e acabamento em tons neutros.'
  },
  {
    image: duasRodas,
    title: 'Concessionária Duas Rodas',
    description:
      'Ilustração da fachada comercial com marquise vermelha, grande pano de vidro e exposição de veículos.'
  },
  {
    image: container,
    title: 'Módulo multiuso em container',
    description:
      'Ilustração da unidade modular com aberturas em venezianas garantindo ventilação e privacidade para diferentes usos.'
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
            Veja algumas obras recentes entregues pela equipe: residenciais, comerciais e soluções modulares
            que evidenciam a versatilidade do nosso trabalho.
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
