const steps = [
  {
    title: '1. Consultoria especializada',
    description: 'Entendemos o objetivo do projeto, indicamos materiais e apresentamos referências.'
  },
  {
    title: '2. Medição e projeto técnico',
    description: 'Nossa equipe realiza medições precisas e desenvolve projeto detalhado para aprovação.'
  },
  {
    title: '3. Fabricação e instalação',
    description: 'Produção própria com prazos ágeis e instalação limpa, seguindo todas as normas de segurança.'
  },
  {
    title: '4. Pós-obra e garantia',
    description: 'Entrega assistida, orientações de manutenção e garantia contra defeitos de fabricação.'
  }
];

function Process(): JSX.Element {
  return (
    <section className="section alt" id="processo">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Como trabalhamos</span>
          <h2>Processo transparente do primeiro contato à entrega final</h2>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <article key={step.title} className="process-card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
