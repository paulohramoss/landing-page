import { useState } from 'react';
import GeminiChat from './GeminiChat';

const CHAT_DIALOG_ID = 'floating-gemini-chat';

function FloatingChat(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const triggerLabel = isOpen ? 'Fechar chat' : 'Falar com o Gemini';

  return (
    <div className="floating-chat">
      {isOpen && (
        <div className="floating-chat__panel" id={CHAT_DIALOG_ID}>
          <GeminiChat className="jivo-chat--floating" onClose={toggleChat} />
        </div>
      )}
      <button
        type="button"
        className="floating-chat__trigger"
        onClick={toggleChat}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={CHAT_DIALOG_ID}
      >
        <span className="floating-chat__trigger-label">{triggerLabel}</span>
      </button>
    </div>
  );
}

export default FloatingChat;
