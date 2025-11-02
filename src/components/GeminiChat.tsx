import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import '../styles/gemini-chat.css';

type GeminiChatMessage = {
  id: number;
  role: 'user' | 'model' | 'error';
  content: string;
};

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const INITIAL_GREETING_ID = -1;

const SYSTEM_PROMPT =
  'Você é o assistente virtual da Vidraçaria Ramos. Responda em português brasileiro com um tom cordial, objetivo e útil. Traga informações sobre os serviços de vidraçaria, prazos de instalação, materiais utilizados e formas de contato quando solicitado.';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

function parseResponseText(data: unknown): string | null {
  if (
    typeof data !== 'object' ||
    data === null ||
    !('candidates' in data) ||
    !Array.isArray((data as { candidates: unknown }).candidates)
  ) {
    return null;
  }

  const [firstCandidate] = (data as { candidates: Array<{ content?: { parts?: Array<{ text?: string }> } }> }).candidates;

  if (!firstCandidate?.content?.parts) {
    return null;
  }

  return firstCandidate.content.parts
    .map((part) => part?.text ?? '')
    .join('\n\n')
    .trim() || null;
}

function GeminiChat(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<GeminiChatMessage[]>(() => [
    {
      id: INITIAL_GREETING_ID,
      role: 'model',
      content:
        'Olá! Sou o assistente virtual da Vidraçaria Ramos. Posso ajudar com informações sobre nossos produtos, prazos e orçamentos. Como posso te ajudar hoje?'
    }
  ]);

  const isConfigured = useMemo(() => Boolean(GEMINI_API_KEY), []);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) {
      return;
    }

    if (!GEMINI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'error',
          content: 'A chave da API do Gemini não foi configurada. Informe o responsável pelo site.'
        }
      ]);
      setInputValue('');
      return;
    }

    const userMessage: GeminiChatMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const payload = {
        contents: updatedMessages
          .filter((message) => message.role !== 'error')
          .filter((message) => message.id !== INITIAL_GREETING_ID)
          .map((message) => ({
            role: message.role === 'model' ? 'model' : 'user',
            parts: [{ text: message.content }]
          })),
        system_instruction: {
          role: 'system',
          parts: [{ text: SYSTEM_PROMPT }]
        }
      };

      const response = await fetch(GEMINI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      const text = parseResponseText(data);

      if (!text) {
        throw new Error('Resposta vazia do Gemini');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: 'model',
          content: text
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          role: 'error',
          content: 'Não foi possível falar com o Gemini agora. Tente novamente em instantes.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const renderMessage = (message: GeminiChatMessage) =>
    message.content.split(/\n{2,}/).map((paragraph, index) => (
      <p key={`${message.id}-${index}`}>{paragraph}</p>
    ));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  return (
    <div className={`gemini-chat ${isOpen ? 'gemini-chat--open' : ''}`}>
      <button
        type="button"
        className="gemini-chat__toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'gemini-chat-panel' : undefined}
      >
        {isOpen ? 'Fechar assistente' : 'Falar com o Gemini'}
      </button>

      {isOpen && (
        <div
          id="gemini-chat-panel"
          className="gemini-chat__panel"
          role="dialog"
          aria-label="Assistente virtual Gemini"
        >
          <header className="gemini-chat__header">
            <div>
              <h2>Assistente Gemini</h2>
              <p>Converse com a IA do Google para tirar dúvidas sobre nossos serviços.</p>
            </div>
            <button type="button" className="gemini-chat__close" onClick={() => setIsOpen(false)} aria-label="Fechar chat">
              ×
            </button>
          </header>

          <div
            ref={messagesContainerRef}
            className="gemini-chat__messages"
            role="log"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {messages.map((message) => (
              <div key={message.id} className={`gemini-chat__message gemini-chat__message--${message.role}`}>
                <span className="gemini-chat__message-avatar" aria-hidden="true">
                  {message.role === 'user' ? 'Você' : message.role === 'model' ? 'G' : '!'}
                </span>
                <div className="gemini-chat__message-body">
                  <span className="gemini-chat__message-label">
                    {message.role === 'user' ? 'Você' : message.role === 'model' ? 'Assistente Gemini' : 'Aviso'}
                  </span>
                  <div className="gemini-chat__message-content">{renderMessage(message)}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="gemini-chat__typing" role="status" aria-live="polite">
                <span className="gemini-chat__typing-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="gemini-chat__typing-label">Gemini está digitando…</span>
              </div>
            )}
          </div>

          <form className="gemini-chat__composer" onSubmit={handleSubmit}>
            <label htmlFor="gemini-chat-input" className="gemini-chat__label">
              Mensagem
            </label>
            <textarea
              id="gemini-chat-input"
              name="message"
              placeholder={
                isConfigured
                  ? 'Escreva sua dúvida... (Enter para enviar, Shift + Enter para nova linha)'
                  : 'Configure a chave de API do Gemini para ativar o assistente.'
              }
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isConfigured || isLoading}
              rows={3}
              required
            />
            <button type="submit" className="gemini-chat__submit" disabled={!isConfigured || isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
            {!isConfigured && (
              <p className="gemini-chat__hint">
                Adicione a variável <code>VITE_GEMINI_API_KEY</code> ao arquivo de ambiente para ativar o chat.
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default GeminiChat;
