import {
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    id: 1,
    name: "AI Network Failure Simulator",
    description:
      "AI-powered network failure simulation tool for testing resilient systems under realistic fault conditions.",
    tags: ["Python", "AI", "ML"],
    github: "https://github.com/aditiraj29",
  },
  {
    id: 2,
    name: "AI GeoRISK",
    description:
      "Geographic risk assessment using AI to analyze spatial data and predict high-risk zones.",
    tags: ["Python", "GeoAnalysis", "ML"],
    github: "https://github.com/aditiraj29",
  },
  {
    id: 3,
    name: "LLM SQL Agent",
    description:
      "Natural language to SQL query agent powered by large language models for intuitive database querying.",
    tags: ["Python", "LLM", "NLP"],
    github: "https://github.com/aditiraj29",
  },
  {
    id: 4,
    name: "Poultry Meat Detector",
    description:
      "AI-powered web application for poultry meat freshness detection using computer vision.",
    tags: ["Python", "Computer Vision", "ML"],
    github: "https://github.com/aditiraj29",
  },
];

const SKILLS = [
  {
    title: "Data Analytics",
    icon: "📊",
    description:
      "Transforming raw data into actionable insights through robust analysis and compelling visualizations.",
    tags: ["Python", "Pandas", "NumPy", "Tableau", "Power BI", "Data Viz"],
  },
  {
    title: "Machine Learning",
    icon: "🤖",
    description:
      "Building intelligent models and systems that learn from data to solve complex real-world problems.",
    tags: ["Scikit-learn", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  },
  {
    title: "UI/UX Design",
    icon: "✦",
    description:
      "Crafting elegant, user-centered interfaces that blend aesthetics with seamless functionality.",
    tags: ["Figma", "React", "TypeScript", "Tailwind CSS", "Prototyping"],
  },
];

// Precomputed static dot positions for decorative grid
const DOT_POSITIONS = [
  { id: "d00", cx: 16, cy: 16 },
  { id: "d01", cx: 48, cy: 16 },
  { id: "d02", cx: 80, cy: 16 },
  { id: "d03", cx: 112, cy: 16 },
  { id: "d04", cx: 144, cy: 16 },
  { id: "d05", cx: 176, cy: 16 },
  { id: "d06", cx: 208, cy: 16 },
  { id: "d07", cx: 240, cy: 16 },
  { id: "d10", cx: 16, cy: 48 },
  { id: "d11", cx: 48, cy: 48 },
  { id: "d12", cx: 80, cy: 48 },
  { id: "d13", cx: 112, cy: 48 },
  { id: "d14", cx: 144, cy: 48 },
  { id: "d15", cx: 176, cy: 48 },
  { id: "d16", cx: 208, cy: 48 },
  { id: "d17", cx: 240, cy: 48 },
  { id: "d20", cx: 16, cy: 80 },
  { id: "d21", cx: 48, cy: 80 },
  { id: "d22", cx: 80, cy: 80 },
  { id: "d23", cx: 112, cy: 80 },
  { id: "d24", cx: 144, cy: 80 },
  { id: "d25", cx: 176, cy: 80 },
  { id: "d26", cx: 208, cy: 80 },
  { id: "d27", cx: 240, cy: 80 },
  { id: "d30", cx: 16, cy: 112 },
  { id: "d31", cx: 48, cy: 112 },
  { id: "d32", cx: 80, cy: 112 },
  { id: "d33", cx: 112, cy: 112 },
  { id: "d34", cx: 144, cy: 112 },
  { id: "d35", cx: 176, cy: 112 },
  { id: "d36", cx: 208, cy: 112 },
  { id: "d37", cx: 240, cy: 112 },
  { id: "d40", cx: 16, cy: 144 },
  { id: "d41", cx: 48, cy: 144 },
  { id: "d42", cx: 80, cy: 144 },
  { id: "d43", cx: 112, cy: 144 },
  { id: "d44", cx: 144, cy: 144 },
  { id: "d45", cx: 176, cy: 144 },
  { id: "d46", cx: 208, cy: 144 },
  { id: "d47", cx: 240, cy: 144 },
  { id: "d50", cx: 16, cy: 176 },
  { id: "d51", cx: 48, cy: 176 },
  { id: "d52", cx: 80, cy: 176 },
  { id: "d53", cx: 112, cy: 176 },
  { id: "d54", cx: 144, cy: 176 },
  { id: "d55", cx: 176, cy: 176 },
  { id: "d56", cx: 208, cy: 176 },
  { id: "d57", cx: 240, cy: 176 },
  { id: "d60", cx: 16, cy: 208 },
  { id: "d61", cx: 48, cy: 208 },
  { id: "d62", cx: 80, cy: 208 },
  { id: "d63", cx: 112, cy: 208 },
  { id: "d64", cx: 144, cy: 208 },
  { id: "d65", cx: 176, cy: 208 },
  { id: "d66", cx: 208, cy: 208 },
  { id: "d67", cx: 240, cy: 208 },
  { id: "d70", cx: 16, cy: 240 },
  { id: "d71", cx: 48, cy: 240 },
  { id: "d72", cx: 80, cy: 240 },
  { id: "d73", cx: 112, cy: 240 },
  { id: "d74", cx: 144, cy: 240 },
  { id: "d75", cx: 176, cy: 240 },
  { id: "d76", cx: 208, cy: 240 },
  { id: "d77", cx: 240, cy: 240 },
];

function useActiveSection() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      for (const o of observers) {
        o?.disconnect();
      }
    };
  }, []);

  return active;
}

function scrollToSection(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          "linear-gradient(135deg, #0B1220 0%, #0E1626 40%, #1a0d30 70%, #0B1220 100%)",
      }}
    >
      {/* Background orbs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.32 0.14 295 / 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.35 0.18 270 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.28 0.12 290 / 0.10) 0%, transparent 70%)",
          }}
        />
        {/* Geometric dots grid */}
        <svg
          role="img"
          aria-label="decorative dots"
          className="absolute bottom-[15%] left-[2%] w-64 h-64 opacity-10"
          viewBox="0 0 256 256"
        >
          {DOT_POSITIONS.map((dot) => (
            <circle
              key={dot.id}
              cx={dot.cx}
              cy={dot.cy}
              r="2"
              fill="oklch(0.84 0.02 260)"
            />
          ))}
        </svg>
        {/* Network lines */}
        <svg
          role="img"
          aria-label="decorative network lines"
          className="absolute bottom-[8%] left-[5%] w-80 h-48 opacity-10"
          viewBox="0 0 320 192"
        >
          <line
            x1="20"
            y1="160"
            x2="80"
            y2="80"
            stroke="oklch(0.52 0.22 292)"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="80"
            x2="160"
            y2="120"
            stroke="oklch(0.52 0.22 292)"
            strokeWidth="1"
          />
          <line
            x1="160"
            y1="120"
            x2="240"
            y2="40"
            stroke="oklch(0.52 0.22 292)"
            strokeWidth="1"
          />
          <line
            x1="240"
            y1="40"
            x2="300"
            y2="90"
            stroke="oklch(0.52 0.22 292)"
            strokeWidth="1"
          />
          <circle cx="20" cy="160" r="4" fill="oklch(0.52 0.22 292)" />
          <circle cx="80" cy="80" r="4" fill="oklch(0.52 0.22 292)" />
          <circle cx="160" cy="120" r="4" fill="oklch(0.52 0.22 292)" />
          <circle cx="240" cy="40" r="4" fill="oklch(0.52 0.22 292)" />
          <circle cx="300" cy="90" r="4" fill="oklch(0.52 0.22 292)" />
        </svg>
      </div>

      {/* NAVBAR */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "oklch(0.14 0.022 262 / 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(0.28 0.04 258 / 0.5)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Wordmark */}
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="font-display font-bold text-xl tracking-widest bg-transparent border-none cursor-pointer"
            style={{ color: "oklch(0.97 0.01 265)", letterSpacing: "0.15em" }}
            data-ocid="nav.link"
          >
            ADITI RAJ
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
                style={{
                  color:
                    active === link.href
                      ? "oklch(0.97 0.01 265)"
                      : "oklch(0.72 0.025 258)",
                }}
                data-ocid="nav.link"
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, oklch(0.52 0.22 292), oklch(0.49 0.22 268))",
                    }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg"
            style={{ color: "oklch(0.72 0.025 258)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: "1px solid oklch(0.28 0.04 258 / 0.5)" }}
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => {
                      scrollToSection(link.href);
                      setMobileOpen(false);
                    }}
                    className="py-2 text-sm font-medium text-left bg-transparent border-none cursor-pointer"
                    style={{
                      color:
                        active === link.href
                          ? "oklch(0.97 0.01 265)"
                          : "oklch(0.72 0.025 258)",
                    }}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO SECTION */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-16"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full py-20">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col gap-6 max-w-2xl"
            >
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ color: "oklch(0.52 0.22 292)" }}
                >
                  Hi, I'm
                </motion.p>
                <h1
                  className="font-display font-extrabold leading-none tracking-tight"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 5rem)",
                    color: "oklch(0.97 0.01 265)",
                    lineHeight: 1.05,
                  }}
                >
                  Aditi Raj
                </h1>
              </div>

              <p
                className="text-lg font-medium"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.025 258), oklch(0.84 0.02 260))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Data Analyst&nbsp;&nbsp;|&nbsp;&nbsp;ML
                Engineer&nbsp;&nbsp;|&nbsp;&nbsp;UI/UX Designer
              </p>

              <p
                className="text-base leading-relaxed max-w-md"
                style={{ color: "oklch(0.72 0.025 258)" }}
              >
                Third-year CSE student specializing in Data Science and Web
                Development. Passionate about building data-driven solutions,
                machine learning models, and elegant user interfaces.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("#projects")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.03] border-none cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.22 292), oklch(0.49 0.22 268))",
                    color: "oklch(0.98 0.005 265)",
                    boxShadow: "0 4px 20px oklch(0.52 0.22 292 / 0.35)",
                  }}
                  data-ocid="hero.primary_button"
                >
                  View Projects
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("#contact")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.03] cursor-pointer"
                  style={{
                    background: "transparent",
                    color: "oklch(0.97 0.01 265)",
                    border: "1.5px solid oklch(0.28 0.04 258)",
                  }}
                  data-ocid="hero.secondary_button"
                >
                  Contact Me
                  <Mail size={16} />
                </button>
              </div>

              <div
                className="flex items-center gap-2 mt-1"
                style={{ color: "oklch(0.72 0.025 258)" }}
              >
                <MapPin size={14} />
                <span className="text-sm">Jaipur, India</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <h2
                className="font-display font-bold text-4xl"
                style={{ color: "oklch(0.97 0.01 265)" }}
              >
                Projects
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "oklch(0.18 0.028 258)",
                    border: "1px solid oklch(0.28 0.04 258)",
                    boxShadow: "0 4px 24px oklch(0.14 0.022 262 / 0.5)",
                  }}
                  data-ocid={`projects.item.${i + 1}`}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "oklch(0.52 0.22 292 / 0.15)" }}
                  >
                    <Code2
                      size={20}
                      style={{ color: "oklch(0.52 0.22 292)" }}
                    />
                  </div>

                  <h3
                    className="font-display font-semibold text-base mb-2"
                    style={{ color: "oklch(0.97 0.01 265)" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4 flex-1"
                    style={{ color: "oklch(0.72 0.025 258)" }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: "oklch(0.22 0.03 258)",
                          color: "oklch(0.84 0.02 260)",
                          border: "1px solid oklch(0.28 0.04 258)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                    style={{ color: "oklch(0.52 0.22 292)" }}
                    data-ocid={`projects.link.${i + 1}`}
                  >
                    <Github size={14} />
                    View on GitHub
                    <ExternalLink size={12} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "oklch(0.52 0.22 292)" }}
              >
                Expertise
              </p>
              <h2
                className="font-display font-bold text-4xl"
                style={{ color: "oklch(0.97 0.01 265)" }}
              >
                Core Skills & Expertise
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-2xl p-7"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.20 0.032 258), oklch(0.16 0.025 262))",
                    border: "1px solid oklch(0.28 0.04 258)",
                    boxShadow: "0 4px 24px oklch(0.14 0.022 262 / 0.5)",
                  }}
                  data-ocid={`skills.card.${i + 1}`}
                >
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h3
                    className="font-display font-bold text-xl mb-2"
                    style={{ color: "oklch(0.97 0.01 265)" }}
                  >
                    {skill.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "oklch(0.72 0.025 258)" }}
                  >
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: "oklch(0.52 0.22 292 / 0.15)",
                          color: "oklch(0.84 0.02 260)",
                          border: "1px solid oklch(0.52 0.22 292 / 0.3)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <p
                className="text-sm font-semibold tracking-widest uppercase mb-2"
                style={{ color: "oklch(0.52 0.22 292)" }}
              >
                Say Hello
              </p>
              <h2
                className="font-display font-bold text-4xl"
                style={{ color: "oklch(0.97 0.01 265)" }}
              >
                Get in Touch
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left – form */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl p-8"
                style={{
                  background: "oklch(0.18 0.028 258)",
                  border: "1px solid oklch(0.28 0.04 258)",
                }}
              >
                <form
                  action="mailto:contact@aditiraj.dev"
                  method="get"
                  encType="text/plain"
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "oklch(0.72 0.025 258)" }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: "oklch(0.22 0.03 258)",
                          border: "1px solid oklch(0.28 0.04 258)",
                          color: "oklch(0.97 0.01 265)",
                        }}
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: "oklch(0.72 0.025 258)" }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                        style={{
                          background: "oklch(0.22 0.03 258)",
                          border: "1px solid oklch(0.28 0.04 258)",
                          color: "oklch(0.97 0.01 265)",
                        }}
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "oklch(0.72 0.025 258)" }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="body"
                      rows={5}
                      placeholder="Tell me about your project or just say hi..."
                      className="rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-200 focus:ring-2"
                      style={{
                        background: "oklch(0.22 0.03 258)",
                        border: "1px solid oklch(0.28 0.04 258)",
                        color: "oklch(0.97 0.01 265)",
                      }}
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.52 0.22 292), oklch(0.49 0.22 268))",
                      color: "oklch(0.98 0.005 265)",
                      boxShadow: "0 4px 20px oklch(0.52 0.22 292 / 0.35)",
                    }}
                    data-ocid="contact.submit_button"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </motion.div>

              {/* Right – social */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-5"
              >
                <h3
                  className="font-display font-bold text-2xl"
                  style={{ color: "oklch(0.97 0.01 265)" }}
                >
                  Connect with Aditi
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.72 0.025 258)" }}
                >
                  I'm open to internships, collaborations, and exciting
                  projects. Let's build something meaningful together.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://github.com/aditiraj29"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-3 py-8 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      background: "oklch(0.18 0.028 258)",
                      border: "1px solid oklch(0.28 0.04 258)",
                    }}
                    data-ocid="contact.link"
                  >
                    <Github
                      size={32}
                      style={{ color: "oklch(0.97 0.01 265)" }}
                    />
                    <div className="text-center">
                      <div
                        className="font-semibold text-sm"
                        style={{ color: "oklch(0.97 0.01 265)" }}
                      >
                        GitHub
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.72 0.025 258)" }}
                      >
                        @aditiraj29
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/aditiraj-2903ar"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center gap-3 py-8 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      background: "oklch(0.18 0.028 258)",
                      border: "1px solid oklch(0.28 0.04 258)",
                    }}
                    data-ocid="contact.link"
                  >
                    <Linkedin
                      size={32}
                      style={{ color: "oklch(0.49 0.22 268)" }}
                    />
                    <div className="text-center">
                      <div
                        className="font-semibold text-sm"
                        style={{ color: "oklch(0.97 0.01 265)" }}
                      >
                        LinkedIn
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.72 0.025 258)" }}
                      >
                        aditiraj-2903ar
                      </div>
                    </div>
                  </a>
                </div>

                <div
                  className="flex items-center gap-3 rounded-xl px-5 py-4"
                  style={{
                    background: "oklch(0.18 0.028 258)",
                    border: "1px solid oklch(0.28 0.04 258)",
                  }}
                >
                  <MapPin size={18} style={{ color: "oklch(0.52 0.22 292)" }} />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.72 0.025 258)" }}
                  >
                    Jaipur, India
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className="py-8"
        style={{ borderTop: "1px solid oklch(0.28 0.04 258 / 0.5)" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "oklch(0.72 0.025 258)" }}>
            © {new Date().getFullYear()} Aditi Raj. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/aditiraj29"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
              style={{ color: "oklch(0.72 0.025 258)" }}
              aria-label="GitHub"
              data-ocid="footer.link"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/aditiraj-2903ar"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
              style={{ color: "oklch(0.72 0.025 258)" }}
              aria-label="LinkedIn"
              data-ocid="footer.link"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
