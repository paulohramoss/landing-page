import { FormEvent, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppModal } from '../components/WhatsAppModal';
import {
  WhatsappLogo,
  Phone,
  Envelope,
  MapPin,
  CheckCircle,
  WarningCircle
} from '@phosphor-icons/react';

const EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/vidraramos1@gmail.com';

type FormStatus = 'idle' | 'success' | 'error';

function Contact(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const getValue = (key: string) => {
      const value = formData.get(key);
      return typeof value === 'string' ? value : '';
    };

    formData.append('_subject', `Novo contato — ${getValue('name') || 'Contato'}`);
    formData.append('_captcha', 'false');

    try {
      setIsSubmitting(true);
      setFormStatus('idle');

      const response = await fetch(EMAIL_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Falha ao enviar');

      setFormStatus('success');
      form.reset();
    } catch (error) {
      console.error('Não foi possível enviar a mensagem.', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contato">
      <div className="container">
        <div className="section-heading">
          <span className="section-eyebrow">Contato</span>
          <h2>Solicite um orçamento sem compromisso</h2>
          <p>
            Preencha o formulário e nossa equipe retorna com as melhores soluções
            para o seu projeto em até 24 horas.
          </p>
        </div>

        <div className="contact-layout">
          <form
            className="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
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
                Telefone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  placeholder="(49) 99999-9999"
                  required
                />
              </label>
            </div>

            <label>
              Tipo de projeto
              <select name="projectType" defaultValue="" required>
                <option value="" disabled>Selecione o tipo de projeto</option>
                <option value="box-banheiro">Box de Banheiro</option>
                <option value="janelas">Janelas de Alumínio</option>
                <option value="portas-divisorias">Portas & Divisórias</option>
                <option value="fachada">Fachada Comercial</option>
                <option value="espelhos">Espelhos</option>
                <option value="cobertura-guardacorpo">Coberturas & Guarda-corpos</option>
                <option value="outro">Outro</option>
              </select>
            </label>

            <label>
              Descreva sua necessidade
              <textarea
                name="message"
                rows={5}
                placeholder="Conte um pouco sobre o projeto — tamanho, ambiente, prazo desejado..."
              />
            </label>

            <button
              className="btn primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>

            <AnimatePresence>
              {formStatus !== 'idle' && (
                <motion.div
                  className={`form-feedback form-feedback--${formStatus}`}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  role="alert"
                  aria-live="polite"
                >
                  {formStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} weight="fill" />
                      Mensagem enviada! Entraremos em contato em breve.
                    </>
                  ) : (
                    <>
                      <WarningCircle size={20} weight="fill" />
                      Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <aside className="contact-chat">
            <div className="contact-chat__header">
              <h3>Prefere falar diretamente?</h3>
              <p>
                Nossa equipe está disponível para tirar dúvidas e enviar orçamentos
                pelo WhatsApp — resposta rápida, sem enrolação.
              </p>
            </div>
            <button
              className="btn whatsapp contact-chat__cta"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <WhatsappLogo size={22} weight="fill" />
              Falar no WhatsApp
            </button>
            <ul className="contact-chat__info">
              <li>
                <Phone size={15} weight="bold" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
                <a href="tel:+5549920007235">(49) 92000-7235</a>
              </li>
              <li>
                <Phone size={15} weight="bold" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
                <a href="tel:+5549991368810">(49) 99136-8810</a>
              </li>
              <li>
                <Envelope size={15} weight="bold" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
                <a href="mailto:vidraramos1@gmail.com">vidraramos1@gmail.com</a>
              </li>
              <li>
                <MapPin size={15} weight="bold" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
                Rua Adolfo Konder, 1757 — São Miguel do Oeste / SC
              </li>
            </ul>
            <p className="contact-chat__hours">
              Segunda a sexta, das 8h às 18h
            </p>

            <div className="contact-map">
              <iframe
                src="https://maps.google.com/maps?q=Rua+Adolfo+Konder+1757+S%C3%A3o+Miguel+do+Oeste+SC+Brasil&output=embed&hl=pt-BR&z=16"
                title="Localização Vidraçaria Ramos – Rua Adolfo Konder, 1757, São Miguel do Oeste / SC"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default Contact;
