function CallToAction(): JSX.Element {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Pronto para transformar seu projeto com vidro e alumínio sob medida?</h2>
          <p>
            Envie as plantas ou fotos do ambiente e receba um orçamento personalizado com sugestão de
            soluções em até 24 horas úteis.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn primary" href="https://wa.me/5549988432733" target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
          <a className="btn outline" href="mailto:contato@vidracariaramos.com">
            Enviar projeto
          </a>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
