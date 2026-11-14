import Image from "next/image";
import type { ReactNode } from "react";
import { capabilities, experience, profile, projects } from "./content";
import { Experience, MagnetI, ProjectButton } from "./experience";
import { personStructuredData } from "./seo";

function Scene({ id, label, art, side = "left", children }: {
  id: string;
  label: string;
  art: "cliff" | "leap";
  side?: "left" | "right" | "bottom";
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scene scene--${side}`} data-scene aria-label={label}>
      <div className="scene-hold">
        <div className={`scene-art scene-art--${art}`} data-art aria-hidden="true">
          <Image src={`/scenes/${art}.webp`} alt="" fill sizes="100vw" />
        </div>
        <div className="scene-copy" data-copy>
          <p className="eyebrow">{label}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Experience>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }}
      />
      <main id="main">
        <section id="top" className="hero" data-scene aria-label="Introduction">
          <div className="hero-portrait" data-hero-art aria-hidden="true">
            <video className="hero-video" autoPlay muted loop playsInline preload="auto">
              <source src="/scenes/goat-mobile.mp4" type="video/mp4" media="(max-width: 650px)" />
              <source src="/scenes/goat.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-inner">
            <ul className="hero-meta eyebrow">
              <li>Software engineer</li><li>Python · Flutter · React</li><li>Backend · Mobile · Web</li>
            </ul>
            <h1 className="hero-word" aria-label={profile.name}>
              <span className="wordmark-letter" data-letter="n" aria-hidden="true">n</span>
              <MagnetI className="wordmark-magnet" hero />
              <span className="wordmark-letter" data-letter="femi" aria-hidden="true">femi</span>
            </h1>
            <p className="hero-line">I build software<br /> <em>from API to interface.</em></p>
            <a className="hero-scroll eyebrow" href="#about">↓ &nbsp; Scroll to explore</a>
          </div>
        </section>

        <Scene id="about" label="02 · About" art="cliff">
          <h2>First, <em>perspective.</em></h2>
          <p>I’m {profile.name}, a software engineer building Python APIs, Flutter apps, and responsive websites with React. I’ve delivered client websites and contributed to ServeeZ, a published home-services app in Nigeria.</p>
        </Scene>

        <Scene id="terrain" label="03 · Capabilities" art="cliff" side="right">
          <h2>My <em>terrain.</em></h2>
          <ol className="terrain-list">
            {capabilities.map(({ title }, index) => <li key={title}><span className="eyebrow">0{index + 1}</span> {title}</li>)}
          </ol>
        </Scene>

        <Scene id="experience" label="04 · Experience" art="cliff" side="right">
          <h2>Work in <em>practice.</em></h2>
          <div className="career" data-lenis-prevent tabIndex={0} aria-label="Career history">
            {experience.map(([year, role, company, detail]) => (
              <article key={company} className="career-item">
                <span className="eyebrow">{year}</span>
                <div><h3>{role}</h3><p>{company}</p><p>{detail}</p></div>
              </article>
            ))}
            <article className="career-item"><span className="eyebrow">Study</span><div><h3>Education & certifications</h3><p>BSc Industrial Chemistry, University of Ilorin · 2019–2022</p><p>ALX Software Engineering · 2023<br />Udemy Web Development · 2022</p></div></article>
          </div>
        </Scene>

        <Scene id="featured" label="05 · Featured work" art="leap" side="bottom">
          <h2>The <em>leap.</em></h2>
          <ProjectButton project={projects[0]} featured />
        </Scene>

        <section id="capabilities" className="capability-scene" data-scene aria-labelledby="capability-heading">
          <div className="capability-inner">
            <div className="capability-index">
              <p className="eyebrow">06 · Capabilities in depth</p>
              <h2 id="capability-heading">How I <em>build.</em></h2>
              <nav aria-label="Capability areas">
                {capabilities.map(({ title }, index) => <a key={title} href={`#capability-${index + 1}`}><span className="eyebrow">0{index + 1}</span> {title}</a>)}
              </nav>
            </div>
            <div>
              {capabilities.map(({ title, tools, detail }, index) => (
                <article id={`capability-${index + 1}`} className="capability-panel" key={title} data-capability>
                  <p className="eyebrow">0{index + 1} / 04</p>
                  <h3>{title}</h3>
                  <p className="capability-tools">{tools}</p>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Scene id="approach" label="07 · Engineering approach" art="cliff">
          <h2>From requirements<br /> to <em>release.</em></h2>
          <p>Define the API contract, build the user flow, and verify what happens when a request fails. I carry that approach from backend validation to mobile screens and deployment checks.</p>
        </Scene>

        <section id="work" className="work" data-scene aria-labelledby="work-heading">
          <div className="work-hold">
            <div className="work-heading"><p className="eyebrow">08 · Selected work</p><h2 id="work-heading">The <em>journey.</em></h2></div>
            <div className="walk-wrap" aria-hidden="true"><div className="walk-goat" data-walk /></div>
            <div className="gallery" data-gallery data-lenis-prevent-horizontal>
              <div className="gallery-track" data-track>{projects.map((project, index) => <ProjectButton key={project.id} project={project} index={index} />)}</div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact" data-scene aria-labelledby="contact-heading">
          <div className="contact-grid">
            <div><p className="eyebrow">09 · Contact</p><h2 id="contact-heading">Let’s talk about<br /> your <em>next project.</em></h2><p>Get in touch about software engineering roles and the work featured here.</p></div>
            <div className="contact-panel">
              <p className="eyebrow">Direct contact</p>
              <a href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a>
              <p className="eyebrow">Code & projects</p>
              <a href={profile.github}>GitHub <span aria-hidden="true">↗</span></a>
              <p className="eyebrow">Résumé</p>
              <a href="/Nifemi-CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <footer className="eyebrow"><span>{profile.name}</span><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>
    </Experience>
  );
}
