import { List, MoonStars, PhoneCall, Sun } from '@phosphor-icons/react';
import { useState } from 'react';
import Logo from './Logo';
import type { Theme } from '../hooks/useTheme';

const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Processo', href: '#processo' },
  { label: 'Contato', href: '#contato' }
];

type HeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

function Header({ theme, onToggleTheme }: HeaderProps): JSX.Element {
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
          <a className="nav-cta" href="tel:+5549988432733">
            <PhoneCall size={20} weight="bold" />
            (49)98843-2733
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
          >
            {theme === 'dark' ? <Sun size={22} weight="bold" /> : <MoonStars size={22} weight="bold" />}
          </button>
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
