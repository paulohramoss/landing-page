import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page';
import { initAnalytics } from './lib/analytics';
import './styles/global.css';

initAnalytics();

const container = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <Page pathname={window.location.pathname} />
  </React.StrictMode>
);

// Em produção o HTML já chega pré-renderizado (bom para o Google): o React
// "hidrata" essa marcação, aproveitando o que já está na tela (inclusive o que
// o visitante já digitou). No `npm run dev` o #root vem vazio e renderizamos do zero.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
