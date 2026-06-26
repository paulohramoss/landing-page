import { List } from '@phosphor-icons/react';
import { useState } from 'react';
import Logo from './Logo';

const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Processo', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' }
];

function Header(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <Logo />
        <nav className={`nav ${menuOpen ? 'is-open' : ''}`} aria-label="Menu principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav-cta" href="#contato" onClick={() => setMenuOpen(false)}>
            Orçamento grátis
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((state) => !state)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <List size={28} weight="bold" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
