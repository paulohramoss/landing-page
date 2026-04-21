import logoVr from '../assets/logo-vr.jpg';

function Logo(): JSX.Element {
  return (
    <a className="logo" href="#inicio" aria-label="Página inicial Vidraçaria Ramos">
      <div className="logo-wrap">
        <img className="logo-img" src={logoVr} alt="Vidraçaria Ramos" />
      </div>
    </a>
  );
}

export default Logo;
