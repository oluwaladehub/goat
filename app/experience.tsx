"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { profile, type Project } from "./content";

const OpenProject = createContext<(project: Project) => void>(() => {});
const destinations = [
  ["top", "Home"], ["featured", "Featured Work"], ["capabilities", "Capabilities"],
  ["work", "Selected Work"], ["contact", "Contact"],
] as const;
const chapters = ["top", "about", "terrain", "experience", "featured", "capabilities", "approach", "work", "contact"];
const chapterNames = ["Introduction", "About", "Capabilities overview", "Experience", "Featured work", "Capabilities in depth", "Engineering approach", "Selected work", "Contact"];

export function MagnetI({ className, hero = false }: { className?: string; hero?: boolean }) {
  return (
    <svg className={className} viewBox={hero ? "0 0 50 102" : "0 22 50 80"} aria-hidden="true">
      {hero && <circle cx="25" cy="10" r="8" />}
      <path fillRule="evenodd" d="M1 87V49a24 24 0 0 1 48 0v38H37V49a12 12 0 0 0-24 0v38ZM4 78v6h6v-6Zm36 0v6h6v-6Z" />
      <path d="M1 91h2v6H1zm5 0h2v8H6zm5 0h2v6h-2zm26 0h2v6h-2zm5 0h2v8h-2zm5 0h2v6h-2z" />
    </svg>
  );
}

export function ProjectButton({ project, index = 0, featured = false }: {
  project: Project; index?: number; featured?: boolean;
}) {
  const openProject = useContext(OpenProject);
  if (featured) {
    return <button type="button" className="pill pill-dark" onClick={() => openProject(project)}>Explore featured work <span aria-hidden="true">↗</span></button>;
  }
  return (
    <button className="project-card" type="button" onClick={() => openProject(project)}>
      <span className={`project-thumb project-thumb--${project.id}`} aria-hidden="true">
        <span className="project-number eyebrow">0{index + 1}</span>
        <span className="thumb-art"><i /><i /><i /></span>
        <span className="project-arrow">↗</span>
      </span>
      <span className="project-info"><span className="eyebrow">{project.category}</span><strong>{project.title}</strong><small>{project.stack}</small></span>
    </button>
  );
}

export function Experience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const details = useRef<HTMLDialogElement>(null);
  const scroll = useRef<Lenis | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = loader.current;
    const video = root.current?.querySelector<HTMLVideoElement>(".hero-video");
    if (!overlay || !video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const percentage = overlay.querySelector("b");
    const progress = { value: 0 };
    let mounted = true;
    let dismissTimer: number | undefined;
    const animation = gsap.timeline({ paused: true }).to(progress, {
      value: 100, duration: 0.65, ease: "power1.out",
      onUpdate: () => {
        const value = Math.round(progress.value);
        overlay.style.setProperty("--load-progress", value + "%");
        if (percentage) percentage.textContent = String(value);
      },
    }).call(() => {
      overlay.classList.add("is-done");
      dismissTimer = window.setTimeout(() => { overlay.hidden = true; }, 650);
    });
    overlay.hidden = false;
    const finish = () => { if (mounted) animation.play(); };
    const onMediaReady = () => { void document.fonts.ready.then(finish); };
    const fallback = window.setTimeout(finish, 2200);

    if (video.readyState >= 2 || video.error) onMediaReady();
    else {
      video.addEventListener("loadeddata", onMediaReady, { once: true });
      video.addEventListener("error", finish, { once: true });
    }

    return () => {
      mounted = false;
      window.clearTimeout(fallback);
      window.clearTimeout(dismissTimer);
      video.removeEventListener("loadeddata", onMediaReady);
      video.removeEventListener("error", finish);
      animation.kill();
      overlay.hidden = true;
      overlay.classList.remove("is-done");
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);

    function selectChapter(id: string) {
      element!.dataset.active = id;
      for (const link of element!.querySelectorAll<HTMLAnchorElement>(".chapters a")) {
        if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }

    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 900px) and (pointer: fine)",
      motion: "(prefers-reduced-motion: no-preference)",
      any: "all",
    }, ({ conditions }) => {
      const { desktop, motion } = conditions!;
      const lenis = motion && desktop ? new Lenis({ autoRaf: false, lerp: 0.09 }) : null;
      scroll.current = lenis;
      const tick = (seconds: number) => lenis?.raf(seconds * 1000);
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
      }

      if (motion) element.dataset.motion = "true";
      if (desktop && motion) element.dataset.desktopMotion = "true";
      const video = element.querySelector<HTMLVideoElement>(".hero-video");
      if (video && !motion) video.pause();
      if (video && motion) void video.play().catch(() => {});
      for (const section of element.querySelectorAll<HTMLElement>("[data-scene]")) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (trigger) => { if (trigger.isActive) selectChapter(section.id); },
        });
      }
      if (motion) {
        const portrait = element.querySelector("[data-hero-art]");
        if (portrait) gsap.to(portrait, { scale: 1.15, yPercent: 12, ease: "none", scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } });

        for (const section of element.querySelectorAll<HTMLElement>(".scene")) {
          const art = section.querySelector("[data-art]");
          const copy = section.querySelector("[data-copy]");
          if (!art || !copy) continue;
          const direction = section.classList.contains("scene--right") ? -1 : 1;
          gsap.fromTo(art, { scale: 1.03, xPercent: -3 * direction, yPercent: 2 }, {
            scale: 1.22, xPercent: 4 * direction, yPercent: -3, ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.fromTo(copy, { y: 30, opacity: 0.35 }, {
            y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 88%", end: "top 20%", scrub: true },
          });
        }
        for (const panel of element.querySelectorAll("[data-capability]")) {
          gsap.fromTo(panel, { y: 36, opacity: 0.45 }, {
            y: 0, opacity: 1, scrollTrigger: { trigger: panel, start: "top 92%", end: "top 45%", scrub: true },
          });
        }
      }

      const gallery = element.querySelector<HTMLElement>("[data-gallery]");
      const track = element.querySelector<HTMLElement>("[data-track]");
      const walk = element.querySelector<HTMLElement>("[data-walk]");
      const trackDistance = () => Math.max(0, (track?.scrollWidth ?? 0) - (gallery?.clientWidth ?? 0));
      let walkTrigger: ScrollTrigger | undefined;
      if (motion && walk) {
        gsap.fromTo(walk, { xPercent: desktop ? -19 : -8 }, {
          xPercent: desktop ? 21 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: "#work",
            start: desktop ? "top top" : "top 75%",
            end: desktop ? "bottom bottom" : "bottom top",
            scrub: true,
            onUpdate: ({ progress }) => {
              const frame = Math.floor(progress * (desktop ? 28 : 12)) % 4;
              walk.style.backgroundPosition = `${frame % 2 * 100}% ${Math.floor(frame / 2) * 100}%`;
            },
          },
        });
        if (desktop && gallery && track) {
          const slide = gsap.to(track, {
            x: () => -trackDistance(),
            ease: "none",
            scrollTrigger: { trigger: "#work", start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
          });
          walkTrigger = slide.scrollTrigger;
        }
      }

      function revealFocusedCard(event: FocusEvent) {
        const card = event.target;
        if (!(card instanceof HTMLElement) || !gallery || !walkTrigger) return;
        const distance = trackDistance();
        if (!distance) return;
        const bounds = card.getBoundingClientRect();
        const visible = gallery.getBoundingClientRect();
        if (bounds.left >= visible.left && bounds.right <= visible.right) return;
        const target = Math.min(distance, Math.max(0, card.offsetLeft - (gallery.clientWidth - card.offsetWidth) / 2));
        const top = walkTrigger.start + (walkTrigger.end - walkTrigger.start) * target / distance;
        if (lenis) lenis.scrollTo(top, { immediate: true });
        else window.scrollTo(0, top);
      }
      gallery?.addEventListener("focusin", revealFocusedCard);
      const refresh = () => ScrollTrigger.refresh();
      void document.fonts.ready.then(() => { if (element.isConnected) refresh(); });
      return () => {
        gallery?.removeEventListener("focusin", revealFocusedCard);
        gsap.ticker.remove(tick);
        lenis?.destroy();
        scroll.current = null;
        delete element.dataset.motion;
        delete element.dataset.desktopMotion;
        if (walk) walk.style.backgroundPosition = "";
      };
    }, element);

    const onAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      menu.current?.close();
      if (location.hash !== link.hash) history.pushState(null, "", link.hash);
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
      if (scroll.current) scroll.current.scrollTo(target, { offset: -parseFloat(getComputedStyle(target).scrollMarginTop || "0") });
      else target.scrollIntoView();
    };
    element.addEventListener("click", onAnchor);
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView();
    }
    return () => { element.removeEventListener("click", onAnchor); media.revert(); };
  }, []);

  useEffect(() => {
    if (project && !details.current?.open) details.current?.showModal();
  }, [project]);

  return (
    <OpenProject.Provider value={setProject}>
      <div ref={root} data-active="top" className="portfolio">
        <div className="opening-loader" ref={loader} role="status" hidden>
          <div className="opening-loader-mark"><MagnetI /><MagnetI className="opening-loader-fill" /></div>
          <p className="eyebrow">Loading <b aria-hidden="true">0</b></p>
        </div>
        <a href="#main" className="skip-link">Skip to content</a>
        <header className="header">
          <a href="#top" className="header-logo" aria-label={`${profile.name}, home`}>{profile.wordmark}</a>
          <div className="flex items-center gap-2.5">
            <a className="pill header-work" href="#work">Work</a>
            <a className="pill header-cv" href="/Nifemi-CV.pdf" download aria-label="Download CV">CV <span aria-hidden="true">↓</span></a>
            <a className="pill pill-dark header-talk" href="#contact">Let’s talk</a>
            <button className="pill" type="button" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}>Menu <span className="menu-dots" aria-hidden="true">••</span></button>
          </div>
        </header>
        <nav className="chapters" aria-label="Page sections">
          {chapters.map((id, index) => <a key={id} href={`#${id}`} aria-label={chapterNames[index]} aria-current={index === 0 ? "location" : undefined}><span /></a>)}
        </nav>
        <a className="floating-contact" href={profile.whatsapp} aria-label="Chat with Nifemi on WhatsApp">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20.6 16.7A9 9 0 0 1 8 20.4l-4.6 1.2 1.2-4.5a9 9 0 1 1 16-0.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 7.5c-.7-.3-1.5.3-1.6 1.1-.3 2.1 2.5 5.3 4.5 6.4 1.4.8 3.7 1.2 4.5-.4l.3-.7c0-.2-.2-.4-.5-.5l-1.9-.9c-.3-.2-.5 0-.7.2l-.8.9c-1.6-.5-2.7-1.7-3.4-3l.6-.7c.2-.2.2-.4.1-.6L9 7.5Z" fill="currentColor" />
          </svg>
        </a>
        {children}
        <dialog ref={menu} className="menu-dialog" aria-label="Menu" onClose={() => setMenuOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) menu.current?.close(); }}>
          <button type="button" className="pill dialog-close" onClick={() => menu.current?.close()} autoFocus>Close</button>
          <nav aria-label="Main navigation">
            {destinations.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            <a className="menu-email eyebrow" href={`mailto:${profile.email}`}>{profile.email}</a>
          </nav>
        </dialog>
        <dialog ref={details} className="project-dialog" aria-labelledby="project-title" onClose={() => setProject(null)} onClick={(event) => { if (event.target === event.currentTarget) details.current?.close(); }}>
          {project && (
            <div className="project-dialog-inner" data-lenis-prevent>
              <button type="button" className="pill pill-dark dialog-close" onClick={() => details.current?.close()} autoFocus>Close</button>
              <p className="eyebrow">{project.category} · {project.stack}</p>
              <h2 id="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              {project.id === "backend" && <BackendWalkthrough />}
              <div className="flex flex-wrap gap-2">
                {project.links.map(({ label, url }) => <a className="pill pill-dark" key={url} href={url}>{label} ↗</a>)}
              </div>
            </div>
          )}
        </dialog>
      </div>
    </OpenProject.Provider>
  );
}

function BackendWalkthrough() {
  return (
    <div className="walkthrough">
      <ol>
        <li><strong>Validate the request.</strong> Check the input types and pagination bounds before looking up records.</li>
        <li><strong>Retrieve the records.</strong> Apply filters and return a bounded page of matching results.</li>
        <li><strong>Return a predictable response.</strong> Give clients a stable response shape and clear feedback on invalid input.</li>
      </ol>
      <div className="api-example">
        <p className="eyebrow">Illustrative request and response</p>
        <pre><code>{`GET /records?status=active&limit=2&offset=0

200 OK
{
  "items": [{ "id": 42, "status": "active" }],
  "limit": 2,
  "offset": 0
}

422 Unprocessable Entity
{ "detail": "limit must be between 1 and 100" }`}</code></pre>
      </div>
    </div>
  );
}
