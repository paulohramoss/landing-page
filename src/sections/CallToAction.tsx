import { WhatsappLogo } from '@phosphor-icons/react';
import { useState } from 'react';
import { WhatsAppModal } from '../components/WhatsAppModal';

function CallToAction(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2>Pronto para transformar seu espaço?</h2>
          <p>
            Orçamento gratuito, sem compromisso. Atendemos residências e empresas
            com o mesmo cuidado e qualidade.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn cta-primary" href="#contato">
            Solicitar orçamento
          </a>
          <button
            className="btn whatsapp"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <WhatsappLogo size={22} weight="fill" />
            Falar no WhatsApp
          </button>
        </div>
      </div>
      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default CallToAction;
