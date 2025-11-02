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
        <div className="contact-layout">
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
                <input name="phone" type="tel" placeholder="(49) 99999-9999" required />
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

          <aside className="contact-chat" aria-label="Atendimento imediato pelo WhatsApp">
            <div className="contact-chat__header">
              <h3>Converse agora com a nossa equipe</h3>
              <p>
                Se preferir resolver tudo por mensagem, fale conosco pelo WhatsApp. Estamos prontos para responder sobre
                projetos, prazos e materiais.
              </p>
            </div>
            <a
              className="btn whatsapp contact-chat__cta"
              href="https://wa.me/5549988432733?text=Olá! Gostaria de saber mais sobre os serviços da Vidraçaria Ramos."
              target="_blank"
              rel="noopener noreferrer"
            >
              Chamar no WhatsApp
            </a>
            <ul className="contact-chat__info">
              <li>Atendimento de segunda a sexta, das 8h às 18h.</li>
              <li>Tempo médio de resposta inferior a 1 hora.</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Contact;
