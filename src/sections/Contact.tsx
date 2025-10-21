function Contact(): JSX.Element {
  return (
    <section className="section" id="contato">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Contato</span>
          <h2>Solicite uma visita técnica ou orçamento sem compromisso</h2>
          <p>
            Preencha o formulário que nossa equipe retorna rapidamente com as melhores soluções em vidro
            e alumínio para o seu projeto.
          </p>
        </div>
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const entries = Object.fromEntries(data.entries());
            console.table(entries);
            alert('Obrigado! Recebemos sua mensagem e entraremos em contato em breve.');
            form.reset();
          }}
        >
          <div className="form-grid">
            <label>
              Nome completo
              <input name="name" type="text" placeholder="Como devemos te chamar?" required />
            </label>
            <label>
              E-mail
              <input name="email" type="email" placeholder="seuemail@exemplo.com" required />
            </label>
            <label>
              Telefone / WhatsApp
              <input name="phone" type="tel" placeholder="(11) 99999-9999" required />
            </label>
            <label>
              Tipo de projeto
              <select name="projectType" defaultValue="residencial" required>
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="corporativo">Corporativo</option>
              </select>
            </label>
          </div>
          <label>
            Descreva sua necessidade
            <textarea name="message" rows={5} placeholder="Conte um pouco sobre o projeto"></textarea>
          </label>
          <button className="btn primary" type="submit">
            Enviar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
