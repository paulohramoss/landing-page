const highlights = [
  {
    title: 'Prazo garantido',
    description: 'Planejamento detalhado e cronograma transparente para cada etapa do projeto.'
  },
  {
    title: 'Medição e projeto 3D',
    description: 'Visitamos o local, realizamos medições precisas e apresentamos pré-visualização digital.'
  },
  {
    title: 'Equipe própria especializada',
    description: 'Instaladores treinados e certificados seguindo normas ABNT e NR-18.'
  }
];

function Highlights(): JSX.Element {
  return (
    <section className="section alt">
      <div className="container">
        <div className="highlights">
          {highlights.map((item) => (
            <div key={item.title} className="highlight-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
