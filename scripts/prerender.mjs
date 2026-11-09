// Pré-renderização estática (SSG) — roda depois do `vite build`.
//
// Por que existe: o site é um app React. Sem isto, o HTML entregue ao Google
// é um <div id="root"></div> vazio, e o conteúdo só aparece depois do JavaScript.
// Aqui geramos o HTML completo de cada página no build, com título, descrição
// e dados estruturados próprios, e criamos uma página por serviço.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render, services, homeFaqs, SITE_URL } = await import(
  pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
);

const template = await readFile(resolve(distDir, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
});

function setMeta(html, { title, description, url }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${t}</title>`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${d}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${d}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`],
    [/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${d}$2`]
  ];
  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(html)) throw new Error(`Tag não encontrada no index.html: ${pattern}`);
    html = html.replace(pattern, replacement);
  }
  return html;
}

function buildPage(pathname, { meta, schemas }) {
  let html = template;
  if (meta) html = setMeta(html, meta);
  html = html.replace('</head>', `    ${schemas.map(jsonLd).join('\n    ')}\n  </head>`);
  const app = render(pathname);
  if (!html.includes('<div id="root"></div>')) throw new Error('Elemento #root não encontrado');
  return html.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
}

const pages = [
  {
    path: '/',
    file: 'index.html',
    html: buildPage('/', { schemas: [faqSchema(homeFaqs)] })
  },
  ...services.map((service) => {
    const url = `${SITE_URL}/${service.slug}/`;
    return {
      path: `/${service.slug}/`,
      file: `${service.slug}/index.html`,
      html: buildPage(`/${service.slug}/`, {
        meta: { title: service.metaTitle, description: service.metaDescription, url },
        schemas: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            serviceType: service.name,
            description: service.metaDescription,
            url,
            areaServed: { '@type': 'City', name: 'São Miguel do Oeste' },
            provider: {
              '@type': 'HomeAndConstructionBusiness',
              name: 'Vidraçaria Ramos',
              url: `${SITE_URL}/`,
              telephone: '+5549920007235'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: service.name, item: url }
            ]
          },
          faqSchema(service.faqs)
        ]
      })
    };
  })
];

for (const page of pages) {
  const target = resolve(distDir, page.file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, page.html);
  console.log(`  ✓ ${page.path}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
await writeFile(resolve(distDir, 'sitemap.xml'), sitemap);
console.log(`  ✓ sitemap.xml (${pages.length} URLs)`);

await rm(ssrDir, { recursive: true, force: true });
