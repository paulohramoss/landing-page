import { FormEvent, useState } from 'react';

const EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/vidraramos1@gmail.com';

function Contact(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const getValue = (key: string) => {
      const value = formData.get(key);
      return typeof value === 'string' ? value : '';
    };

    const name = getValue('name');
    const email = getValue('email');
    const phone = getValue('phone');
    const projectType = getValue('projectType');
    const message = getValue('message');

    try {
      setIsSubmitting(true);

      const response = await fetch(EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType,
          message,
          _subject: `Novo contato - ${name}`,
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar e-mail');
      }

      alert('Obrigado! Recebemos sua mensagem e entraremos em contato em breve.');
      form.reset();
    } catch (error) {
      console.error('Não foi possível enviar a mensagem.', error);
      alert('Não foi possível enviar sua mensagem. Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contato">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Contato</span>
          <h2>Solicite uma visita técnica ou orçamento sem compromisso</h2>
          <p>
            Preencha o formulário que nossa equipe retorna rapidamente com as melhores soluções em vidro e
            alumínio para o seu projeto.
          </p>
        </div>
        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
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
            <button className="btn primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </form>

          <aside className="contact-chat" aria-label="Atendimento imediato pelo WhatsApp">
            <div className="contact-chat__header">
              <h3>Converse agora com a nossa equipe</h3>
              <p>
                Se preferir resolver tudo por mensagem, fale conosco pelo WhatsApp. Estamos prontos para responder
                sobre projetos, prazos e materiais.
              </p>
            </div>
            <a
              className="btn whatsapp contact-chat__cta"
              href="https://wa.me/5549988432733?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Vidra%C3%A7aria%20Ramos."
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
