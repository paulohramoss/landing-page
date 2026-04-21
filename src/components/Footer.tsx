import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react';
import Logo from './Logo';

const quickLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Como funciona', href: '#processo' },
  { label: 'Contato', href: '#contato' }
];

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Atendimento</h4>
            <p>Segunda a sexta das 8h às 18h</p>
            <p>
              <a href="tel:+5549920007235">(49)92000-7235</a>
            </p>
            <p>
              <a href="tel:+5549991368810">(49)99136-8810</a>
            </p>
            <p>
              <a href="mailto:vidraramos1@gmail.com">vidraramos1@gmail.com</a>
            </p>
            <div className="footer-social">
              <a
                className="footer-social-link"
                href="https://www.instagram.com/vidra_ramos/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da Vidraçaria Ramos"
              >
                <InstagramLogo size={20} weight="bold" />
              </a>
              <a
                className="footer-social-link"
                href="https://www.facebook.com/profile.php?id=100009049510783"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook da Vidraçaria Ramos"
              >
                <FacebookLogo size={20} weight="bold" />
              </a>
            </div>
          </div>

          <div>
            <h4>Links rápidos</h4>
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>

          <div>
            <h4>Contato</h4>
            <a href="tel:+5549920007235">(49) 92000-7235</a>
            <a href="tel:+5549991368810">(49) 99136-8810</a>
            <a href="mailto:vidraramos1@gmail.com">vidraramos1@gmail.com</a>
            <p className="footer-address">
              Rua Adolfo Konder, 1757<br />
              São Miguel do Oeste / SC
            </p>
            <p className="footer-hours">Seg–Sex, 8h às 18h</p>
          </div>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Vidraçaria Ramos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
