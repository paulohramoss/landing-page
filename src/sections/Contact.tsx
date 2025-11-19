import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { WhatsAppModal } from "../components/WhatsAppModal";

const EMAIL_ENDPOINT = "https://formsubmit.co/ajax/vidraramos1@gmail.com";

function Contact(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setSelectedFileName(file ? file.name : "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const getValue = (key: string) => {
      const value = formData.get(key);

      return typeof value === "string" ? value : "";
    };

    const name = getValue("name");

    const email = getValue("email");

    const phone = getValue("phone");

    const projectType = getValue("projectType");

    const message = getValue("message");

    formData.set("name", name);

    formData.set("email", email);

    formData.set("phone", phone);

    formData.set("projectType", projectType);

    formData.set("message", message);

    formData.append("_subject", `Novo contato - ${name || "Contato"}`);

    formData.append("_captcha", "false");

    try {
      setIsSubmitting(true);

      const response = await fetch(EMAIL_ENDPOINT, {
        method: "POST",

        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar e-mail");
      }

      alert(
        "Obrigado! Recebemos sua mensagem e entraremos em contato em breve."
      );

      form.reset();

      setSelectedFileName("");
    } catch (error) {
      console.error("Não foi possível enviar a mensagem.", error);

      alert(
        "Não foi possível enviar sua mensagem. Tente novamente em instantes."
      );
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
            Preencha o formulário que nossa equipe retorna rapidamente com as
            melhores soluções em vidro e alumínio para o seu projeto.
          </p>
        </div>

        <div className="contact-layout">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-grid">
              <label>
                Nome completo
                <input
                  name="name"
                  type="text"
                  placeholder="Como devemos te chamar?"
                  required
                />
              </label>

              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </label>

              <label>
                Telefone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  placeholder="(49) 99999-9999"
                  required
                />
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
              <textarea
                name="message"
                rows={5}
                placeholder="Conte um pouco sobre o projeto"
              ></textarea>
            </label>

            <div className="file-upload">
              <input
                ref={fileInputRef}
                id="projectFile"
                name="projectFile"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <button
                className="btn secondary"
                type="button"
                onClick={handleUploadClick}
              >
                Anexar projeto (PDF, PNG, JPG ou JPEG)
              </button>

              <span aria-live="polite" className="file-upload__info">
                {selectedFileName || "Nenhum arquivo selecionado"}
              </span>
            </div>

            <button
              className="btn primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>

          <aside
            className="contact-chat"
            aria-label="Atendimento imediato pelo WhatsApp"
          >
            <div className="contact-chat__header">
              <h3>Converse agora com a nossa equipe</h3>

              <p>
                Se preferir resolver tudo por mensagem, fale conosco pelo
                WhatsApp. Estamos prontos para responder sobre projetos, prazos
                e materiais.
              </p>
            </div>

            <button
              className="btn whatsapp contact-chat__cta"
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
              Chamar no WhatsApp
            </button>

            <WhatsAppModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

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
