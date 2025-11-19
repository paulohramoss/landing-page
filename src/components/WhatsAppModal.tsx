import { X, WhatsappLogo } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBERS = [
  {
    label: "Atendimento Geral",
    phone: "5549988432733",
    message:
      "Olá! Gostaria de saber mais sobre os serviços da Vidraçaria Ramos.",
  },
  {
    label: "Plantão",
    phone: "5549991368810", // Placeholder
    message: "Olá! Preciso de uma ajuda urgente!",
  },
];

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="whatsapp-modal-overlay"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
        padding: "1rem",
      }}
    >
      <div
        ref={modalRef}
        className="whatsapp-modal"
        style={{
          backgroundColor: "var(--color-surface)",
          borderRadius: "24px",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          boxShadow: "var(--shadow-lg)",
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--color-muted)",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #128c7e, #25d366)",
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 1rem",
              color: "white",
            }}
          >
            <WhatsappLogo size={32} weight="fill" />
          </div>
          <h3 style={{ margin: "0 0 0.5rem", color: "var(--color-dark)" }}>
            Fale Conosco
          </h3>
          <p style={{ margin: 0, color: "var(--color-muted)" }}>
            Escolha com quem você quer falar:
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {WHATSAPP_NUMBERS.map((item, index) => (
            <a
              key={index}
              href={`https://wa.me/${item.phone}?text=${encodeURIComponent(
                item.message
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn whatsapp"
              style={{
                justifyContent: "space-between",
                padding: "1rem 1.5rem",
                textDecoration: "none",
              }}
              onClick={onClose}
            >
              <span>{item.label}</span>
              <WhatsappLogo size={24} />
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
