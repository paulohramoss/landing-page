import App from './App';
import { findServiceByPath } from './data/services';
import ServicePage from './pages/ServicePage';

// Escolhe a página pelo caminho da URL. Usado no navegador (main.tsx)
// e na pré-renderização do build (entry-server.tsx).
function Page({ pathname }: { pathname: string }): JSX.Element {
  const service = findServiceByPath(pathname);
  return service ? <ServicePage service={service} /> : <App />;
}

export default Page;
