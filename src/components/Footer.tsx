import Logo from './Logo';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <Logo />
        <div className="footer-grid">
          <div>
            <h4>Atendimento</h4>
            <p>Segunda a sábado das 8h às 18h</p>
            <p>
              <a href="tel:+5549988432733">(49)98843-2733</a>
            </p>
            <p>
              <a href="mailto:vidraramos1@gmail.com">vidraramos1@gmail.com</a>
            </p>
          </div>
          <div>
            <h4>Endereço</h4>
            <p>Rua das Esquadrias, 321 - Centro</p>
            <p>São Paulo / SP</p>
          </div>
          <div>
            <h4>Social</h4>
            <p>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </p>
          </div>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Vidraçaria Ramos. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
