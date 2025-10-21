const testimonials = [
  {
    name: 'Fernanda Mota',
    role: 'Arquiteta - Studio FM',
    quote:
      'A Vidraçaria Ramos virou parceira nos projetos corporativos pela agilidade e cuidado com os detalhes. Entregam exatamente o que foi aprovado com nossos clientes.'
  },
  {
    name: 'Ricardo Alves',
    role: 'Síndico - Condomínio Horizon',
    quote:
      'Fechamos todas as varandas do edifício com o sistema retrátil. Prazos cumpridos, equipe organizada e suporte pós-obra quando precisamos.'
  },
  {
    name: 'Juliana Martins',
    role: 'Empresária - Café Solar',
    quote:
      'A fachada em pele de vidro transformou a apresentação do nosso negócio. Recebemos elogios diários dos clientes.'
  }
];

function Testimonials(): JSX.Element {
  return (
    <section className="section" aria-labelledby="depoimentos">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow" id="depoimentos">
            Depoimentos
          </span>
          <h2>Quem já escolheu a Vidraçaria Ramos recomenda</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="testimonial-card">
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
