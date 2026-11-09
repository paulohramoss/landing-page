import { ArrowRight, CheckCircle, WhatsappLogo } from '@phosphor-icons/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import Contact from '../sections/Contact';
import FAQ from '../sections/FAQ';
import Process from '../sections/Process';
import { CITY, ServicePageData, services, serviceUrl } from '../data/services';
import { trackEvent } from '../lib/analytics';

const WHATSAPP_PHONE = '5549920007235';

type ServicePageProps = { service: ServicePageData };

function ServicePage({ service }: ServicePageProps): JSX.Element {
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    service.whatsappMessage
  )}`;
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="service-hero" id="inicio">
          <div className="container">
            <nav className="breadcrumb" aria-label="Você está em">
              <a href="/">Início</a>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{service.name}</span>
            </nav>

            <span className="hero-badge">Vidraçaria Ramos · {CITY}/SC</span>
            <h1>{service.h1}</h1>
            <p className="service-hero__intro">{service.intro}</p>

            <div className="hero-actions">
              <a
                className="btn whatsapp"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click', { label: service.slug })}
              >
                <WhatsappLogo size={22} weight="fill" />
                Pedir orçamento no WhatsApp
              </a>
              <a className="btn secondary" href="#contato">
                Preencher formulário
              </a>
            </div>

            <ul className="service-hero__benefits">
              {service.benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckCircle size={20} weight="fill" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Modelos e opções</span>
              <h2>O que fazemos em {service.name.toLowerCase()}</h2>
            </div>
            <div className="service-grid service-grid--options">
              {service.options.map((option) => (
                <article key={option.title} className="service-card">
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </article>
              ))}
            </div>
            <p className="service-ideal">
              <strong>Indicado para:</strong> {service.idealFor.join(' · ')}
            </p>
          </div>
        </section>

        <Process />

        <FAQ items={service.faqs} title={`Dúvidas sobre ${service.name.toLowerCase()}`} />

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <span className="section-eyebrow">Outros serviços</span>
              <h2>Também fazemos</h2>
            </div>
            <ul className="related-services">
              {otherServices.map((item) => (
                <li key={item.slug}>
                  <a href={serviceUrl(item)}>
                    {item.name} <ArrowRight size={14} weight="bold" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Contact defaultProjectType={service.projectType} />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default ServicePage;
