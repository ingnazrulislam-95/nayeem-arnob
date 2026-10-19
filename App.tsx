import { useEffect, useState } from "react";
import Network from "./components/Network";
import Contact from "./components/Contact";
import { LINKEDIN, nav, heroIntro, about, expertise, experience, projects, education, philosophy } from "./content";

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export default function App() {
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setSolid(scrollY > 40);
      setProgress(h > 0 ? (scrollY / h) * 100 : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div id="progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className={solid ? "solid" : ""}>
        <div className="wrap">
          <nav aria-label="Main">
            <a className="logo" href="#hero" aria-label="Nayeem Al-Tamzid Bhuiyan, home">NB</a>
            <button id="menu" aria-expanded={open} aria-controls="links" onClick={() => setOpen(!open)}>Menu</button>
            <ul id="links" className={open ? "open" : ""} onClick={() => setOpen(false)}>
              {nav.map((n) => <li key={n}><a className="l" href={`#${n}`}>{cap(n)}</a></li>)}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <Network />
          <div className="wrap">
            <div>
              <div className="tag mono">Engineering · Technology · Systems</div>
              <h1>Ing. Nayeem Al-Tamzid Bhuiyan</h1>
              <h2>Engineering systems. Solving real-world challenges.</h2>
              <p>{heroIntro}</p>
              <a className="btn p" href="#projects">Explore my work</a>
              <a className="btn s" href={LINKEDIN} target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
            </div>
            <div className={`mark ${photo ? "has" : ""}`}>
              <span aria-hidden="true">NB</span>
              <small className="mono">Add public/photo.jpg</small>
              <img src="/photo.jpg" alt="Portrait of Ing. Nayeem Al-Tamzid Bhuiyan" hidden={!photo} onLoad={() => setPhoto(true)} onError={() => setPhoto(false)} />
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap">
            <h2>Engineering with purpose.</h2>
            <div className="cols">
              <p className="mono" style={{ color: "#64748b" }}>Czechia · Application / Systems Engineering</p>
              <div>{about.map((t) => <p key={t}>{t}</p>)}</div>
            </div>
          </div>
        </section>

        <section className="dark" id="expertise">
          <div className="wrap">
            <h2>Expertise</h2>
            <div className="grid">
              {expertise.map((e) => <div key={e.title}><h3>{e.title}</h3><p>{e.text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <h2>Experience</h2>
            <div className="tl">
              {experience.map((x) => (
                <article key={x.title + x.meta}>
                  <h3>{x.title}</h3>
                  <div className="mono">{x.meta}</div>
                  <div className="mono" style={{ marginTop: 0 }}>{x.place}</div>
                  {x.note && <p className="co" style={{ marginTop: 10 }}>{x.note}</p>}
                  {x.duties.length > 0 && <ul className="duties">{x.duties.map((d) => <li key={d}>{d}</li>)}</ul>}
                  {x.tools.length > 0 && <ul className="tools" aria-label="Tools">{x.tools.map((t) => <li key={t}>{t}</li>)}</ul>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dark" id="projects">
          <div className="wrap">
            <h2>Selected work</h2>
            <p style={{ color: "var(--slate)", maxWidth: "60ch", marginTop: 22 }}>
              The projects below are sample content to show the layout. Replace them in content.ts before publishing.
            </p>
            <div className="pj">
              {projects.map((p) => (
                <article key={p.title}>
                  <span className="demo mono">Demo project</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <ul className="tools">{p.tools.map((t) => <li key={t}>{t}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education">
          <div className="wrap">
            <h2>Education</h2>
            <div className="tl">
              {education.map((e) => (
                <article key={e.title}><h3>{e.title}</h3><div className="mono">{e.meta}</div><p className="ph">{e.text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="phil" id="philosophy">
          <div className="wrap">
            <h2>How I work</h2>
            <ul>{philosophy.map((p) => <li key={p}>{p}</li>)}</ul>
            <p className="ph">Proposed themes. Approve or rewrite before publishing.</p>
          </div>
        </section>

        <section id="network">
          <div className="wrap">
            <h2>Professional network</h2>
            <p style={{ maxWidth: "58ch", margin: "24px 0 28px" }}>Follow my professional updates and get in touch on LinkedIn.</p>
            <a className="btn p" style={{ borderColor: "var(--navy)", background: "var(--navy)", color: "var(--white)" }} href={LINKEDIN} target="_blank" rel="noopener noreferrer">Open LinkedIn profile</a>
          </div>
        </section>

        <section className="dark" id="contact">
          <div className="wrap">
            <h2>Let’s connect.</h2>
            <p style={{ color: "var(--slate)", maxWidth: "52ch", marginTop: 22 }}>
              Open to meaningful conversations, technical collaboration, and opportunities to exchange ideas.
            </p>
            <Contact />
          </div>
        </section>
      </main>

      <footer><div className="wrap">© {new Date().getFullYear()} Ing. Nayeem Al-Tamzid Bhuiyan</div></footer>
    </>
  );
}
