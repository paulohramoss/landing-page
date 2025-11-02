import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../styles/gemini-chat.css";

type GeminiChatMessage = {
  id: number;
  role: "user" | "model" | "error";
  content: string;
};

const GEMINI_API_KEY = "AIzaSyAGDiN8pgeogBELKTrc8MeRfP6EztQBn1I";
const INITIAL_GREETING_ID = -1;
const STORAGE_KEY = "gemini-chat-history";

const SYSTEM_PROMPT =
  "Você é o assistente virtual da Vidraçaria Ramos. Responda em português brasileiro com um tom cordial, objetivo e útil. Traga informações sobre os serviços de vidraçaria, prazos de instalação, materiais utilizados e formas de contato quando solicitado.";

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function parseResponseText(data: unknown): string | null {
  if (
    typeof data !== "object" ||
    data === null ||
    !("candidates" in data) ||
    !Array.isArray((data as { candidates: unknown }).candidates)
  ) {
    return null;
  }

  const [firstCandidate] = (
    data as {
      candidates: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    }
  ).candidates;

  if (!firstCandidate?.content?.parts) {
    return null;
  }

  return (
    firstCandidate.content.parts
      .map((part) => part?.text ?? "")
      .join("\n\n")
      .trim() || null
  );
}

function getInitialMessages(): GeminiChatMessage[] {
  const greetingMessage: GeminiChatMessage = {
    id: INITIAL_GREETING_ID,
    role: "model",
    content:
      "Ei, você! Quer participar de promoções e sorteios EXCLUSIVOS? Saber das promos antes de todo mundo? Então fica de olho nas nossas redes sociais! Me chama aqui que te passo todas AGORA!",
  };

  if (typeof window === "undefined") {
    return [greetingMessage];
  }

  const storedMessages = window.localStorage.getItem(STORAGE_KEY);

  if (!storedMessages) {
    return [greetingMessage];
  }

  try {
    const parsed = JSON.parse(storedMessages) as GeminiChatMessage[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [greetingMessage];
    }

    const hasGreeting = parsed.some(
      (message) => message.id === INITIAL_GREETING_ID
    );

    return hasGreeting ? parsed : [greetingMessage, ...parsed];
  } catch (error) {
    console.warn("Não foi possível carregar o histórico do chat.", error);
    return [greetingMessage];
  }
}

function GeminiChat(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] =
    useState<GeminiChatMessage[]>(getInitialMessages);

  const isConfigured = useMemo(() => Boolean(GEMINI_API_KEY), []);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.warn("Não foi possível salvar o histórico do chat.", error);
    }
  }, [messages]);

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
          role: "error",
          content:
            "A chave da API do Gemini não foi configurada. Informe o responsável pelo site.",
        },
      ]);
      setInputValue("");
      return;
    }

    const userMessage: GeminiChatMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const payload = {
        contents: updatedMessages
          .filter((m) => m.role !== "error")
          .filter((m) => m.id !== INITIAL_GREETING_ID)
          .map((m) => ({
            role: m.role === "model" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
        systemInstruction: {
          role: "system",
          parts: [{ text: SYSTEM_PROMPT }],
        },
      };

      const response = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      const text = parseResponseText(data);

      if (!text) {
        throw new Error("Resposta vazia do Gemini");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "model",
          content: text,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          role: "error",
          content:
            "Não foi possível falar com o Gemini agora. Tente novamente em instantes.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const renderMessage = (message: GeminiChatMessage) =>
    message.content
      .split(/\n{2,}/)
      .map((paragraph, index) => (
        <p key={`${message.id}-${index}`}>{paragraph}</p>
      ));

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="jivo-chat" role="application" aria-label="Atendimento on-line">
      <div className="jivo-chat__card" role="dialog" aria-labelledby="jivo-chat-title">
        <header className="jivo-chat__header">
          <div className="jivo-chat__header-main">
            <span className="jivo-chat__avatar" aria-hidden="true">
              C
            </span>
            <div className="jivo-chat__agent">
              <h2 id="jivo-chat-title">Claudio</h2>
              <span>Customer support</span>
            </div>
          </div>
          <span className="jivo-chat__brand">
            Chat desenvolvido por <strong>jivochat</strong>
          </span>
        </header>

        <div
          ref={messagesContainerRef}
          className="jivo-chat__messages"
          role="log"
          aria-live="polite"
          aria-busy={isLoading}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`jivo-chat__message jivo-chat__message--${message.role}`}
            >
              <span className="jivo-chat__message-author">
                {message.role === "user"
                  ? "Você"
                  : message.role === "model"
                  ? "Claudio"
                  : "Aviso"}
              </span>
              <div className="jivo-chat__message-bubble">
                {renderMessage(message)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="jivo-chat__typing" role="status" aria-live="polite">
              <span className="jivo-chat__typing-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="jivo-chat__typing-label">Claudio está digitando…</span>
            </div>
          )}
        </div>

        <form className="jivo-chat__composer" onSubmit={handleSubmit}>
          <label htmlFor="jivo-chat-input" className="jivo-chat__label">
            Digite sua mensagem
          </label>
          <textarea
            id="jivo-chat-input"
            name="message"
            placeholder={
              isConfigured
                ? "Digite sua mensagem aqui e aperte Enter"
                : "Configure a chave de API do Gemini para ativar o chat."
            }
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!isConfigured || isLoading}
            rows={1}
            required
          />
          <button
            type="submit"
            className="jivo-chat__submit"
            disabled={!isConfigured || isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          {!isConfigured && (
            <p className="jivo-chat__hint">
              Adicione a variável <code>VITE_GEMINI_API_KEY</code> ao arquivo de
              ambiente para ativar o chat.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default GeminiChat;
