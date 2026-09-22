"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const practiceAreas = ["7-172", "7-175", "7-168", "7-174"];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const closeMenu = () => setMenuOpen(false);
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setToast("Mensagem recebida. Em breve entraremos em contato.");
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Di Lorenzo, início"><span>DiLorenzo</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span /><b>Menu</b>
        </button>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} id="site-nav" aria-label="Navegação principal">
          {["Home", "Atuação", "Equipe", "Contato"].map((item) => <a key={item} href={`#${item === "Home" ? "inicio" : item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="inicio">
          <Image className="hero-image" src="/assets/3-31.webp" alt="Profissionais analisando documentos em uma mesa de trabalho" fill priority sizes="100vw" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-kicker">Estratégia para decisões importantes</p>
            <h1>Lorem ipsum<br />dolor sit</h1>
            <p className="hero-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor fringilla porttitor.</p>
            <a className="dark-button" href="#contato">Falar com um especialista</a>
          </div>
          <a className="scroll-cue" href="#atuacao"><span>Saiba mais</span><i /></a>
        </section>

        <section className="practice" id="atuacao">
          <div className="section-inner">
            <p className="section-number">01 / atuação</p>
            <h2>Áreas de Atuação</h2>
            <p className="section-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor fringilla porttitor.</p>
            <div className="practice-grid">
              {practiceAreas.map((asset, index) => <a className="practice-card" href="#contato" key={asset}><span>Loren</span><Image src={`/assets/${asset}.webp`} alt="" width={33} height={33} /></a>)}
            </div>
          </div>
        </section>

        <section className="team" id="equipe">
          <div className="section-inner">
            <p className="section-number">02 / presença</p>
            <h2>Nossa Equipe</h2>
            <div className="team-card">
              <Image src="/assets/7-200.webp" alt="Pessoa Exemplo, profissional do escritório" width={264} height={288} />
              <div className="team-meta"><p className="team-name">Pessoa Exemplo</p><p><strong>Cargo</strong><br />Formação</p></div>
            </div>
            <div className="slider-controls" aria-label="Navegação da equipe">{[0, 1, 2, 3].map((member) => <button className={`slider-dot ${activeMember === member ? "is-active" : ""}`} type="button" aria-label={`Membro ${member + 1}`} key={member} onClick={() => setActiveMember(member)} />)}</div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="section-inner">
            <p className="section-number">03 / conexão</p>
            <h2>Entre em contato</h2>
            <div className="contact-layout">
              <p className="contact-copy">Conte-nos sobre o seu momento. Uma conversa inicial pode abrir caminhos mais claros.</p>
              <form className="contact-form" onSubmit={submitContact}>
                <label>Nome<input type="text" name="nome" placeholder="Seu nome" required /></label>
                <label>E-mail<input type="email" name="email" placeholder="email@gmail.com" required /></label>
                <label>Mensagem<textarea name="mensagem" rows={3} placeholder="Como podemos ajudar?" required /></label>
                <button className="dark-button" type="submit">Enviar mensagem</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div><a className="footer-brand" href="#inicio">DiLorenzo</a><p>Redes Sociais</p><div className="socials"><a href="#contato" aria-label="Instagram">◎</a><a href="#contato" aria-label="Facebook">f</a><a href="#contato" aria-label="LinkedIn">in</a></div></div>
          <nav aria-label="Links do rodapé"><a href="#atuacao">Atuação</a><a href="#equipe">Equipe</a><a href="#contato">Contato</a></nav>
          <div className="footer-contact"><span>(XX) XXXX-XXXXX</span><span>email@gmail.com</span></div>
        </div>
        <small>Direitos Reservados 2026</small>
      </footer>
      <div className={`toast ${toast ? "is-visible" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
