import { CaretDown } from '@phosphor-icons/react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type FaqItem = { question: string; answer: string };

const faqs: FaqItem[] = [
  {
    question: 'O orçamento tem algum custo?',
    answer:
      'Não. A visita técnica, a medição e o orçamento são gratuitos e sem compromisso, com retorno em até 24 horas.'
  },
  {
    question: 'Quais regiões vocês atendem?',
    answer:
      'Atendemos São Miguel do Oeste e toda a região oeste de Santa Catarina, para clientes residenciais, construtoras e empresas.'
  },
  {
    question: 'Os produtos têm garantia?',
    answer:
      'Sim. Todo projeto sai com contrato de prazo definido, materiais certificados pelo INMETRO e garantia total na instalação.'
  },
  {
    question: 'Quanto tempo leva a fabricação e instalação?',
    answer:
      'O prazo varia conforme o tamanho e a complexidade do projeto. Ele é combinado e informado junto com o orçamento, sem surpresas depois.'
  }
];

function FAQ(): JSX.Element {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="section alt" id="faq" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="section-eyebrow">Dúvidas frequentes</span>
          <h2>Perguntas que recebemos com frequência</h2>
          <p>
            Ainda com dúvidas? Fale com a nossa equipe pelo WhatsApp ou envie sua mensagem pelo
            formulário abaixo.
          </p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.question}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <CaretDown size={18} weight="bold" className={`faq-icon${isOpen ? ' is-open' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      className="faq-answer"
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
