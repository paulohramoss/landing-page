import { useState } from "react";
import { WhatsAppModal } from "../components/WhatsAppModal";

function CallToAction(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>
            Pronto para transformar seu projeto com vidro e alumínio sob medida?
          </h2>
          <p>
            Envie as plantas ou fotos do ambiente e receba um orçamento
            personalizado com sugestão de soluções em até 24 horas úteis.
          </p>
        </div>
        <div className="cta-actions">
          <button
            className="btn primary"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            Falar no WhatsApp
          </button>
          <a className="btn outline" href="#contato">
            Enviar projeto
          </a>
        </div>
      </div>
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

export default CallToAction;
