import { WhatsappLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { WhatsAppModal } from "./WhatsAppModal";

function FloatingWhatsAppButton(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="floating-whatsapp">
        <button
          className="floating-whatsapp__trigger btn whatsapp"
          onClick={() => setIsModalOpen(true)}
          aria-label="Falar com a Vidraçaria Ramos pelo WhatsApp"
          type="button"
          style={{ border: "none", cursor: "pointer" }}
        >
          <WhatsappLogo size={28} weight="fill" />
          <span className="floating-whatsapp__label">Fale conosco</span>
        </button>
      </div>
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default FloatingWhatsAppButton;
