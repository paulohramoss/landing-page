// Conteúdo das páginas de serviço (SEO local).
// Cada item vira uma página própria em /<slug>/ no build (ver scripts/prerender.mjs).
// Mantenha os textos fiéis ao que a empresa realmente faz — nada de prometer o que não entrega.

export type ServiceFaq = { question: string; answer: string };

export type ServicePageData = {
  slug: string;
  /** Nome curto, usado em cards, breadcrumb e no formulário. */
  name: string;
  /** Valor do <select> "Tipo de projeto" do formulário de contato. */
  projectType: string;
  /** <title> da página (até ~60 caracteres). */
  metaTitle: string;
  /** <meta name="description"> (até ~155 caracteres). */
  metaDescription: string;
  h1: string;
  intro: string;
  /** Mensagem pré-preenchida no WhatsApp. */
  whatsappMessage: string;
  options: { title: string; description: string }[];
  benefits: string[];
  idealFor: string[];
  faqs: ServiceFaq[];
};

export const SITE_URL = 'https://www.vidracariaesquadriasramos.com.br';
export const CITY = 'São Miguel do Oeste';

export const services: ServicePageData[] = [
  {
    slug: 'box-para-banheiro-sao-miguel-do-oeste',
    name: 'Box para banheiro',
    projectType: 'box-banheiro',
    metaTitle: 'Box para Banheiro em São Miguel do Oeste/SC | Vidraçaria Ramos',
    metaDescription:
      'Box de vidro temperado sob medida em São Miguel do Oeste e região: modelos de correr, abrir e canto. Medição no local e orçamento grátis.',
    h1: 'Box para banheiro sob medida',
    intro:
      'Box de vidro temperado feito na medida exata do seu banheiro, com ferragens de qualidade e instalação pela nossa própria equipe. Vamos até você, medimos o espaço e indicamos o modelo que funciona melhor no seu dia a dia.',
    whatsappMessage: 'Olá! Vi o site e gostaria de um orçamento de box para banheiro.',
    options: [
      {
        title: 'Box de correr',
        description: 'O mais pedido: economiza espaço e funciona bem em banheiros pequenos e médios.'
      },
      {
        title: 'Box de abrir',
        description: 'Porta pivotante com visual limpo, ideal para vãos maiores.'
      },
      {
        title: 'Box de canto',
        description: 'Para chuveiro em quina, aproveitando duas paredes com acesso pela diagonal.'
      },
      {
        title: 'Acabamentos',
        description: 'Perfis em alumínio natural, preto fosco ou inox — combinando com metais e revestimentos.'
      }
    ],
    benefits: [
      'Vidro temperado 8mm com certificação INMETRO',
      'Medição no local, sem custo',
      'Fabricado sob medida — sem adaptação de peça pronta',
      'Instalação feita pela nossa própria equipe'
    ],
    idealFor: ['Reforma de banheiro', 'Obra nova', 'Troca de box antigo ou de cortina'],
    faqs: [
      {
        question: 'Qual a espessura do vidro do box?',
        answer:
          'Trabalhamos com vidro temperado de 8mm com certificação INMETRO, que é o padrão de segurança para box de banheiro.'
      },
      {
        question: 'Preciso saber as medidas antes de pedir orçamento?',
        answer:
          'Não. Vamos até o local, medimos tudo e passamos o orçamento sem compromisso. Se quiser adiantar, mande uma foto do banheiro pelo WhatsApp.'
      },
      {
        question: 'Qual modelo de box é melhor para banheiro pequeno?',
        answer:
          'Geralmente o box de correr, porque não precisa de espaço para a porta abrir. Na visita técnica indicamos a melhor opção para o seu caso.'
      }
    ]
  },
  {
    slug: 'janelas-de-aluminio-sao-miguel-do-oeste',
    name: 'Janelas de alumínio',
    projectType: 'janelas',
    metaTitle: 'Janelas de Alumínio em São Miguel do Oeste/SC | Vidraçaria Ramos',
    metaDescription:
      'Janelas de alumínio sob medida em São Miguel do Oeste: correr, basculante, maxim-ar e pivotante. Medição no local e orçamento grátis.',
    h1: 'Janelas de alumínio sob medida',
    intro:
      'Esquadrias de alumínio feitas para o vão da sua obra, em todos os modelos mais usados. Atendemos construção nova e troca de janelas antigas, com medição no local e instalação pela nossa equipe.',
    whatsappMessage: 'Olá! Vi o site e gostaria de um orçamento de janelas de alumínio.',
    options: [
      { title: 'Janela de correr', description: 'Clássica para quartos e salas, com folhas que deslizam lado a lado.' },
      { title: 'Basculante', description: 'Ventilação na parte de cima — muito usada em banheiros, cozinhas e lavanderias.' },
      { title: 'Maxim-ar', description: 'Abre projetando para fora, ventila mesmo com chuva leve.' },
      { title: 'Pivotante', description: 'Gira sobre um eixo, ótima para grandes vãos e projetos modernos.' }
    ],
    benefits: [
      'Alumínio anodizado ou pintado',
      'Vidro simples, duplo ou refletivo conforme o projeto',
      'Fabricação sob medida para cada vão',
      'Medição e orçamento sem custo'
    ],
    idealFor: ['Obra nova', 'Troca de janelas de madeira ou ferro', 'Reformas e ampliações'],
    faqs: [
      {
        question: 'Vocês trocam janelas antigas?',
        answer:
          'Sim. Medimos o vão existente e fabricamos a janela de alumínio sob medida para substituir a antiga.'
      },
      {
        question: 'Que tipos de vidro posso usar na janela?',
        answer:
          'Vidro simples, duplo ou refletivo, de acordo com o ambiente e o projeto. Orientamos a melhor escolha na visita.'
      },
      {
        question: 'Atendem construtoras?',
        answer:
          'Sim. Atendemos residências, construtoras e empresas em São Miguel do Oeste e na região oeste de Santa Catarina.'
      }
    ]
  },
  {
    slug: 'portas-e-divisorias-de-vidro-sao-miguel-do-oeste',
    name: 'Portas e divisórias de vidro',
    projectType: 'portas-divisorias',
    metaTitle: 'Portas e Divisórias de Vidro em São Miguel do Oeste | Vidraçaria Ramos',
    metaDescription:
      'Portas de vidro temperado e divisórias internas sob medida em São Miguel do Oeste/SC para casas, lojas e escritórios. Orçamento grátis.',
    h1: 'Portas e divisórias de vidro',
    intro:
      'Portas de vidro temperado e divisórias que deixam o ambiente mais claro, amplo e moderno. Fazemos sob medida para residências, lojas e escritórios.',
    whatsappMessage: 'Olá! Vi o site e gostaria de um orçamento de porta ou divisória de vidro.',
    options: [
      { title: 'Portas de vidro temperado', description: 'De abrir ou de correr, para entradas, salas e áreas externas.' },
      { title: 'Divisórias internas', description: 'Separam ambientes sem bloquear a luz — ótimas para escritórios.' },
      { title: 'Vidro laminado', description: 'Opção de segurança extra para locais de grande circulação.' },
      { title: 'Portas de alumínio', description: 'Esquadrias de alumínio para uso residencial e comercial.' }
    ],
    benefits: [
      'Temperado 10mm ou laminado',
      'Projeto sob medida para o seu vão',
      'Instalação com equipe própria',
      'Visita técnica e orçamento sem custo'
    ],
    idealFor: ['Escritórios', 'Lojas e comércios', 'Salas e áreas de lazer'],
    faqs: [
      {
        question: 'Divisória de vidro serve para escritório?',
        answer:
          'Sim, é uma das aplicações mais comuns: separa as salas mantendo a iluminação natural e a sensação de espaço.'
      },
      {
        question: 'Qual vidro é usado nas portas?',
        answer: 'Vidro temperado de 10mm ou vidro laminado, conforme o local e a necessidade de segurança.'
      }
    ]
  },
  {
    slug: 'fachadas-de-vidro-sao-miguel-do-oeste',
    name: 'Fachadas comerciais de vidro',
    projectType: 'fachada',
    metaTitle: 'Fachadas de Vidro em São Miguel do Oeste/SC | Vidraçaria Ramos',
    metaDescription:
      'Fachadas comerciais em vidro e alumínio sob medida em São Miguel do Oeste e região. Valorize seu ponto comercial. Orçamento sem compromisso.',
    h1: 'Fachadas comerciais de vidro',
    intro:
      'A fachada é o cartão de visita do seu negócio. Projetamos e instalamos fachadas em vidro e alumínio que valorizam o ponto, aumentam a entrada de luz e deixam a vitrine à vista de quem passa.',
    whatsappMessage: 'Olá! Vi o site e gostaria de um orçamento de fachada de vidro.',
    options: [
      { title: 'Fachadas com grandes panos de vidro', description: 'Visibilidade total para lojas, showrooms e concessionárias.' },
      { title: 'Vitrines', description: 'Exposição de produtos com vidro de segurança.' },
      { title: 'Portas de entrada', description: 'Integradas à fachada, em vidro temperado ou esquadria de alumínio.' },
      { title: 'Residências de alto padrão', description: 'Esquadrias amplas para projetos arquitetônicos contemporâneos.' }
    ],
    benefits: [
      'Projeto sob medida para cada fachada',
      'Vidro e alumínio de alto padrão',
      'Execução com equipe própria',
      'Atendimento direto com quem executa'
    ],
    idealFor: ['Lojas e comércios', 'Concessionárias e showrooms', 'Prédios comerciais'],
    faqs: [
      {
        question: 'Vocês fazem fachadas para comércio?',
        answer:
          'Sim. Já entregamos fachadas comerciais em São Miguel do Oeste — veja alguns projetos no portfólio da página inicial.'
      },
      {
        question: 'Trabalham junto com arquiteto ou construtora?',
        answer:
          'Sim. Seguimos o projeto aprovado e acompanhamos a obra junto com o arquiteto ou a construtora responsável.'
      }
    ]
  },
  {
    slug: 'espelhos-sob-medida-sao-miguel-do-oeste',
    name: 'Espelhos sob medida',
    projectType: 'espelhos',
    metaTitle: 'Espelhos Sob Medida em São Miguel do Oeste/SC | Vidraçaria Ramos',
    metaDescription:
      'Espelhos sob medida em São Miguel do Oeste para banheiros, academias, lojas e decoração. Bisotê, lapidado ou liso, com instalação.',
    h1: 'Espelhos sob medida',
    intro:
      'Espelhos cortados no tamanho exato da sua parede, para banheiro, quarto, academia, loja ou decoração. Entregamos instalado, com fixação segura.',
    whatsappMessage: 'Olá! Vi o site e gostaria de um orçamento de espelho.',
    options: [
      { title: 'Bisotê', description: 'Borda chanfrada que dá um acabamento mais sofisticado.' },
      { title: 'Lapidado', description: 'Borda polida e segura, visual limpo e moderno.' },
      { title: 'Liso', description: 'Opção prática e econômica para qualquer ambiente.' },
      { title: 'Grandes formatos', description: 'Paredes inteiras para academias, estúdios e lojas.' }
    ],
    benefits: [
      'Corte sob medida para qualquer formato',
      'Instalação com fixação segura',
      'Acabamento impecável nas bordas',
      'Orçamento sem compromisso'
    ],
    idealFor: ['Banheiros', 'Academias e estúdios', 'Lojas e salões', 'Decoração de ambientes'],
    faqs: [
      {
        question: 'Qual a diferença entre espelho bisotê e lapidado?',
        answer:
          'O bisotê tem a borda chanfrada, com um efeito decorativo. O lapidado tem a borda reta e polida. Os dois são seguros ao toque.'
      },
      {
        question: 'Vocês instalam o espelho?',
        answer: 'Sim, entregamos o espelho instalado, com fixação adequada para o tamanho e o tipo de parede.'
      }
    ]
  },
  {
    slug: 'guarda-corpo-e-cobertura-de-vidro-sao-miguel-do-oeste',
    name: 'Guarda-corpo e cobertura de vidro',
    projectType: 'cobertura-guardacorpo',
    metaTitle: 'Guarda-corpo e Cobertura de Vidro em São Miguel do Oeste | Vidraçaria Ramos',
    metaDescription:
      'Guarda-corpo e cobertura de vidro laminado sob medida em São Miguel do Oeste/SC para varandas, escadas e áreas de lazer. Orçamento grátis.',
    h1: 'Guarda-corpo e cobertura de vidro',
    intro:
      'Segurança sem tapar a vista. Instalamos guarda-corpos e coberturas em vidro laminado para varandas, sacadas, escadas e áreas de lazer.',
    whatsappMessage: 'Olá! Vi o site e gostaria de um orçamento de guarda-corpo ou cobertura de vidro.',
    options: [
      { title: 'Guarda-corpo para varanda e sacada', description: 'Proteção com vista livre, em vidro laminado.' },
      { title: 'Guarda-corpo para escada', description: 'Acabamento moderno e seguro para escadas internas e externas.' },
      { title: 'Cobertura de vidro', description: 'Para áreas de lazer, entradas e garagens, mantendo a luz natural.' },
      { title: 'Estrutura', description: 'Em alumínio ou aço inox, conforme o projeto.' }
    ],
    benefits: [
      'Vidro laminado com película de segurança',
      'Estrutura em alumínio ou aço inox',
      'Projeto sob medida para cada espaço',
      'Instalação com equipe própria'
    ],
    idealFor: ['Varandas e sacadas', 'Escadas', 'Áreas de lazer e piscinas', 'Entradas e garagens'],
    faqs: [
      {
        question: 'Por que usar vidro laminado no guarda-corpo?',
        answer:
          'Porque, se o vidro trincar, a película mantém os pedaços presos, sem cair. Por isso ele é indicado para guarda-corpos e coberturas.'
      },
      {
        question: 'Cobertura de vidro esquenta o ambiente?',
        answer:
          'Depende da orientação solar e do tipo de vidro. Na visita técnica avaliamos o local e indicamos a melhor solução.'
      }
    ]
  }
];

export function serviceUrl(service: ServicePageData): string {
  return `/${service.slug}/`;
}

export function findServiceByPath(pathname: string): ServicePageData | undefined {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  return services.find((service) => service.slug === clean);
}
