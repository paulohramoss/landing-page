import residenciaContemporanea from '../assets/portfolio/residencia-contemporanea.svg';
import areaLazerPiscina from '../assets/portfolio/area-lazer-piscina.svg';
import fachadaSofisticada from '../assets/portfolio/fachada-sofisticada.svg';
import casaCompacta from '../assets/portfolio/casa-compacta.svg';
import showroomVidro from '../assets/portfolio/showroom-vidro.svg';
import containerResidencial from '../assets/portfolio/container-residencial.svg';
import concessionariaDuasRodas from '../assets/portfolio/concessionaria-duas-rodas.svg';
import containerModular from '../assets/portfolio/container-modular.svg';

const projects = [
  {
    image: residenciaContemporanea,
    title: 'Residência contemporânea',
    description:
      'Ilustração da residência térrea de alto padrão com volumes geométricos, esquadrias amplas e acabamento em tons neutros.'
  },
  {
    image: areaLazerPiscina,
    title: 'Área de lazer integrada',
    description:
      'Ilustração da área gourmet com portas de correr em vidro temperado e integração total com a piscina.'
  },
  {
    image: fachadaSofisticada,
    title: 'Entrada imponente com brises',
    description:
      'Ilustração da fachada com volumes destacados, painéis ripados e pele de vidro criando uma chegada marcante e elegante.'
  },
  {
    image: casaCompacta,
    title: 'Casa térrea compacta',
    description:
      'Ilustração da casa compacta funcional com revestimentos em madeira, esquadrias em alumínio e living integrado ao jardim.'
  },
  {
    image: showroomVidro,
    title: 'Showroom com fachada de vidro',
    description:
      'Ilustração do showroom comercial totalmente envidraçado garantindo máxima visibilidade para os produtos expostos.'
  },
  {
    image: containerResidencial,
    title: 'Casa container sofisticada',
    description:
      'Ilustração do container residencial com módulos sobrepostos, revestimento ripado e terraço panorâmico.'
  },
  {
    image: concessionariaDuasRodas,
    title: 'Concessionária Duas Rodas',
    description:
      'Ilustração da fachada comercial com marquise vermelha, grande pano de vidro e exposição de veículos.'
  },
  {
    image: containerModular,
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
