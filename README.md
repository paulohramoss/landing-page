# Landing Page - Vidraçaria Ramos

Landing page institucional desenvolvida em **React + TypeScript** para a Vidraçaria Ramos, especializada em vidros temperados e esquadrias de alumínio.

## ✨ Principais recursos

- Design inspirado na identidade visual fornecida (gradiente azul/rosa e logotipo "VR").
- Seções completas: hero, serviços, diferenciais, portfólio, processo, depoimentos, chamada para ação e contato.
- Layout responsivo com menu mobile e animações suaves utilizando **Framer Motion**.
- Formulário de contato pronto para integração com serviços de backend ou plataformas de formulário.

## 🚀 Tecnologias

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Phosphor Icons](https://phosphoricons.com/)

## 🛠️ Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Abra [http://localhost:5173](http://localhost:5173) no navegador para visualizar a landing page.

4. Para gerar a versão de produção:

   ```bash
   npm run build
   ```

5. Opcionalmente, visualize o build localmente:

   ```bash
   npm run preview
   ```

## 🤖 Assistente Gemini integrado

O site agora conta com um chat flutuante que conecta diretamente ao **Google Gemini** para responder dúvidas dos visitantes.

1. Crie um arquivo `.env` na raiz do projeto (ou ajuste o existente) com a variável abaixo:

   ```bash
   VITE_GEMINI_API_KEY=sua_api_key_do_gemini
   ```

   > Utilize a chave fornecida pela equipe da Vidraçaria Ramos.

2. Reinicie o servidor de desenvolvimento após definir a variável de ambiente.

3. O botão "Falar com o Gemini" aparecerá no canto inferior direito da página. Basta clicar para abrir o chat e conversar com a IA.

## 📁 Estrutura de pastas

```
├── public/           # Assets públicos
├── src/
│   ├── assets/       # Ilustrações SVG da página
│   ├── components/   # Componentes reutilizáveis (Header, Footer, Logo)
│   ├── sections/     # Sessões principais da landing page
│   ├── styles/       # Estilos globais
│   └── main.tsx      # Ponto de entrada da aplicação
```

## 📄 Licença

Este projeto está disponível para uso livre e pode ser adaptado conforme necessário.
