import { FormEvent, DragEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppModal } from '../components/WhatsAppModal';
import {
  WhatsappLogo,
  Phone,
  Envelope,
  MapPin,
  CheckCircle,
  WarningCircle,
  UploadSimple,
  X
} from '@phosphor-icons/react';

const EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/vidraramos1@gmail.com';
const ACCEPTED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
];
const ACCEPTED_ATTR = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
const MAX_FILES = 5;

type FileEntry = { file: File; preview: string | null };
type FormStatus = 'idle' | 'success' | 'error';

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getBadge(file: File): { label: string; mod: string } {
  if (file.type.startsWith('image/')) return { label: 'IMG', mod: 'img' };
  if (file.type === 'application/pdf') return { label: 'PDF', mod: 'pdf' };
  return { label: 'DOC', mod: 'doc' };
}

function Contact(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [selectedFiles, setSelectedFiles] = useState<FileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createdUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      createdUrls.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const makeEntry = (file: File): FileEntry => {
    let preview: string | null = null;
    if (file.type.startsWith('image/')) {
      preview = URL.createObjectURL(file);
      createdUrls.current.add(preview);
    }
    return { file, preview };
  };

  const addFiles = (incoming: File[]) => {
    const valid = incoming.filter(f => ACCEPTED_MIME.includes(f.type));
    setSelectedFiles(prev => {
      const existing = new Set(prev.map(e => e.file.name));
      const newEntries = valid.filter(f => !existing.has(f.name)).map(makeEntry);
      return [...prev, ...newEntries].slice(0, MAX_FILES);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const entry = prev[index];
      if (entry.preview) {
        URL.revokeObjectURL(entry.preview);
        createdUrls.current.delete(entry.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

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
    formData.delete('attachment');
    selectedFiles.forEach(({ file }) => formData.append('attachment', file));

    try {
      setIsSubmitting(true);
      setFormStatus('idle');

      const response = await fetch(EMAIL_ENDPOINT, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Falha ao enviar');

      selectedFiles.forEach(({ preview }) => {
        if (preview) {
          URL.revokeObjectURL(preview);
          createdUrls.current.delete(preview);
        }
      });
      setFormStatus('success');
      setSelectedFiles([]);
      form.reset();
    } catch (error) {
      console.error('Não foi possível enviar a mensagem.', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const atLimit = selectedFiles.length >= MAX_FILES;

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
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Nome completo
                <input name="name" type="text" placeholder="Como devemos te chamar?" required />
              </label>
              <label>
                Telefone / WhatsApp
                <input name="phone" type="tel" placeholder="(49) 99999-9999" required />
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

            <div className="file-upload-field">
              <p className="file-upload-label">
                Arquivos do projeto{' '}
                <span className="file-upload-label__optional">(opcional)</span>
              </p>

              <div
                className={`file-upload-zone${isDragging ? ' file-upload-zone--dragging' : ''}${atLimit ? ' file-upload-zone--disabled' : ''}`}
                onClick={() => !atLimit && fileInputRef.current?.click()}
                onDragOver={!atLimit ? handleDragOver : undefined}
                onDragLeave={handleDragLeave}
                onDrop={!atLimit ? handleDrop : undefined}
                role="button"
                tabIndex={atLimit ? -1 : 0}
                onKeyDown={e => !atLimit && e.key === 'Enter' && fileInputRef.current?.click()}
                aria-label="Área de upload de arquivos"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="attachment"
                  accept={ACCEPTED_ATTR}
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <UploadSimple size={28} weight="duotone" />
                <span className="file-upload-zone__title">
                  {atLimit
                    ? `Limite de ${MAX_FILES} arquivos atingido`
                    : 'Clique ou arraste arquivos aqui'}
                </span>
                <span className="file-upload-zone__hint">
                  PDF, DOC, DOCX, JPG, PNG · máx. {MAX_FILES} arquivos
                </span>
              </div>

              {selectedFiles.length > 0 && (
                <ul className="file-upload-list">
                  {selectedFiles.map(({ file, preview }, i) => {
                    const badge = getBadge(file);
                    return (
                      <li key={`${file.name}-${i}`} className="file-upload-item">
                        {preview ? (
                          <img
                            src={preview}
                            alt={file.name}
                            className="file-upload-item__thumb"
                          />
                        ) : (
                          <span className={`file-upload-item__badge file-upload-item__badge--${badge.mod}`}>
                            {badge.label}
                          </span>
                        )}
                        <span className="file-upload-item__name">{file.name}</span>
                        <span className="file-upload-item__size">{formatSize(file.size)}</span>
                        <button
                          type="button"
                          className="file-upload-remove"
                          onClick={() => removeFile(i)}
                          aria-label={`Remover ${file.name}`}
                        >
                          <X size={13} weight="bold" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <button className="btn primary" type="submit" disabled={isSubmitting}>
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
                <Phone size={16} weight="bold" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.4rem' }} />
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
            <p className="contact-chat__hours">Segunda a sexta, das 8h às 18h</p>
            <div className="contact-map">
              <iframe
                title="Localização Vidraçaria Ramos"
                src="https://maps.google.com/maps?q=Rua+Adolfo+Konder,+1757,+S%C3%A3o+Miguel+do+Oeste,+SC,+Brasil&output=embed&hl=pt-BR"
                width="100%"
                height="180"
                style={{ border: 0, borderRadius: '14px' }}
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
