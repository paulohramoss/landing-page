import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './Page';
import { initAnalytics } from './lib/analytics';
import './styles/global.css';

initAnalytics();

// O HTML já chega pré-renderizado (bom para o Google). Aqui o React
// assume a página e liga as animações e a interatividade.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page pathname={window.location.pathname} />
  </React.StrictMode>
);
