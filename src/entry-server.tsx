import { renderToString } from 'react-dom/server';
import Page from './Page';

export { services, SITE_URL } from './data/services';
export { homeFaqs } from './sections/FAQ';

export function render(pathname: string): string {
  return renderToString(<Page pathname={pathname} />);
}
