import { WhatsappLogo } from '@phosphor-icons/react';

const WHATSAPP_PHONE = '5549988432733';
const DEFAULT_MESSAGE = 'Olá! Gostaria de saber mais sobre os serviços da Vidraçaria Ramos.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

function FloatingWhatsAppButton(): JSX.Element {
  return (
    <div className="floating-whatsapp">
      <a
        href={WHATSAPP_URL}
        className="floating-whatsapp__trigger btn whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Vidraçaria Ramos pelo WhatsApp"
      >
        <WhatsappLogo size={28} weight="fill" />
        <span className="floating-whatsapp__label">Fale conosco</span>
      </a>
    </div>
  );
}

export default FloatingWhatsAppButton;
