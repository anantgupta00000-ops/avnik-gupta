import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaCode, FaReact, FaServer, FaPalette } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'Responsive Design'], value: 95 },
  { title: 'CMS', items: ['WordPress', 'Elementor', 'Theme Customization'], value: 92 },
  { title: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Chrome DevTools', 'Figma'], value: 90 },
];

const services = [
  { title: 'Frontend Development', desc: 'High-end interfaces with modern layouts and polished implementation.' },
  { title: 'Responsive Websites', desc: 'Seamless experiences across mobile, tablet, and desktop.' },
  { title: 'Landing Pages', desc: 'Conversion-focused pages with strong hierarchy and visual impact.' },
  { title: 'WordPress Development', desc: 'Business websites with structured content and smooth performance.' },
  { title: 'Portfolio Websites', desc: 'Elegant personal brands tailored to your story.' },
  { title: 'UI Implementation', desc: 'Design translation into responsive and maintainable code.' },
];

const projects = [
  {
    title: 'The Legacy',
    desc: 'A premium book website with refined layouts, thoughtful storytelling, and an elegant reading-focused experience.',
    link: 'https://anantgupta00000-ops.github.io/the-legacy/',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
  },
  {
    title: 'Studio K.S.H',
    desc: 'A modern clothing website with stylish presentation, strong visual storytelling, and responsive collection sections.',
    link: 'https://anantgupta00000-ops.github.io/studio-K.s.H/',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  },
  {
    title: 'Shop Nutri',
    desc: 'A dry fruit website with clear product presentation, nutrition-focused storytelling, and a polished shopping experience.',
    link: 'https://anantgupta00000-ops.github.io/shop-Nutri/',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
  },
  {
    title: 'Aryan Purse',
    desc: 'A luxury handbag storefront with premium product presentation, clear pack pricing, and direct order support.',
    link: 'https://anantgupta00000-ops.github.io/Aryan-purse/',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showCursorGlow, setShowCursorGlow] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [githubProfile, setGithubProfile] = useState({ html_url: 'https://github.com/anantgupta00000-ops', public_repos: 8, followers: 0, following: 0, avatar_url: '' });
  const [githubLanguages, setGithubLanguages] = useState(['HTML', 'CSS', 'JavaScript']);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const profileRes = await fetch('https://api.github.com/users/anantgupta00000-ops');
        const profileData = await profileRes.json();
        const reposRes = await fetch('https://api.github.com/users/anantgupta00000-ops/repos?per_page=100');
        const reposData = await reposRes.json();
        const languageCounts = reposData.reduce((acc, repo) => {
          if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
          return acc;
        }, {});
        setGithubProfile({
          html_url: profileData.html_url || 'https://github.com/anantgupta00000-ops',
          public_repos: profileData.public_repos || 8,
          followers: profileData.followers || 0,
          following: profileData.following || 0,
          avatar_url: profileData.avatar_url || '',
        });
        setGithubLanguages(Object.entries(languageCounts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([lang]) => lang));
      } catch {
        setGithubProfile({ html_url: 'https://github.com/anantgupta00000-ops', public_repos: 8, followers: 0, following: 0, avatar_url: '' });
        setGithubLanguages(['HTML', 'CSS', 'JavaScript']);
      }
    };

    fetchGithub();

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);

    const cursor = document.getElementById('custom-cursor');
    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener('mousemove', moveCursor);

    document.querySelectorAll('a, button, input, textarea, .card').forEach((el) => {
      el.addEventListener('mouseenter', () => setShowCursorGlow(true));
      el.addEventListener('mouseleave', () => setShowCursorGlow(false));
    });

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setStatus('Please fill in all fields.');
      return;
    }
    setIsSending(true);
    setStatus('Sending your message...');
    const serviceId = 'service_6h3dy7w';
    const templateId = 'template_0f3m9yb';
    const publicKey = '7K2b7w8j0-iJPHj8x';

    try {
      if (serviceId && templateId && publicKey && !serviceId.includes('your') && !templateId.includes('your')) {
        await emailjs.send(serviceId, templateId, { from_name: name, reply_to: email, subject, message }, publicKey);
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        window.location.href = `mailto:avnikgupta16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        setStatus('Your email app should open with the message ready to send.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(119,136,115,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(220,207,192,0.22),_transparent_30%),linear-gradient(135deg,_#FDF6ED_0%,_#F7EDE3_45%,_#F2E7DD_100%)] text-slate-900">
      <div id="custom-cursor" className={`custom-cursor ${showCursorGlow ? 'active' : ''}`}></div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob blob-one"></div>
        <div className="blob blob-two"></div>
        <div className="blob blob-three"></div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#DCCFC0] bg-[#FDF6ED]/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">Avnik</a>
          <nav className="hidden items-center gap-6 md:flex">
            {['home', 'about', 'skills', 'services', 'projects', 'contact'].map((item) => (
              <a key={item} data-nav-link href={`#${item}`} className="text-sm text-[#6D655C] transition hover:text-[#2F3A2E]" onClick={() => setIsMenuOpen(false)}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>
            ))}
          </nav>
          <button className="rounded-full border border-[#DCCFC0] bg-white p-2 text-[#5F5F5F] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#DCCFC0] bg-[#FDF6ED] md:hidden">
              <div className="flex flex-col gap-3 px-6 py-4">
                {['home', 'about', 'skills', 'services', 'projects', 'contact'].map((item) => (
                  <a key={item} href={`#${item}`} className="text-sm text-[#6D655C]" onClick={() => setIsMenuOpen(false)}>{item.charAt(0).toUpperCase() + item.slice(1)}</a>
                ))}
                <a href="resume.html" className="text-sm text-[#6D655C]" onClick={() => setIsMenuOpen(false)}>Resume</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="home" className="relative z-10">
        <section className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
<motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="reveal text-center lg:text-left">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">Frontend Web Developer</p>
              <h1 className="text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">Hi, I’m <span className="bg-gradient-to-r from-[#778873] via-[#A88A72] to-[#DCCFC0] bg-clip-text text-transparent">Avnik Gupta</span></h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5f5b53] lg:mx-0">I create thoughtfully crafted websites that feel calm, premium, and effortless across every screen.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <a href="#projects" className="rounded-full bg-gradient-to-r from-[#778873] to-[#A88A72] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#778873]/20">View My Projects</a>
                <a href="#contact" className="rounded-full border border-[#DCCFC0] bg-white px-5 py-3 text-sm font-semibold text-[#5F5F5F]">Contact Me</a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                {['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'WordPress'].map((item) => <span key={item} className="rounded-full border border-[#DCCFC0] bg-[#FFF9F2] px-3 py-1 text-sm text-[#6D655C]">{item}</span>)}
              </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="reveal relative mx-auto w-full max-w-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#DCCFC0]/50 via-[#FDF6ED]/60 to-[#778873]/20 blur-3xl"></div>
            <div className="relative rounded-[2rem] border border-[#DCCFC0] bg-[#FDF6ED]/90 p-6 shadow-[0_25px_70px_rgba(119,136,115,0.18)] backdrop-blur-2xl">
              <div className="mb-5 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400"></span><span className="h-3 w-3 rounded-full bg-yellow-400"></span><span className="h-3 w-3 rounded-full bg-green-400"></span>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_1.3fr]">
                <div className="rounded-2xl border border-[#DCCFC0] bg-[#FFF9F2] p-4">
                  <FaCode className="mb-4 text-2xl text-[#778873]" />
                  <div className="h-3 w-20 rounded-full bg-[#E6D8C7]"></div>
                  <div className="mt-3 h-3 w-16 rounded-full bg-[#E6D8C7]"></div>
                  <div className="mt-3 h-3 w-24 rounded-full bg-[#E6D8C7]"></div>
                </div>
                <div className="rounded-2xl border border-[#DCCFC0] bg-[#FFF9F2] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6D655C]">UI systems</p>
                      <p className="text-xl font-semibold">Premium build</p>
                    </div>
                    <FaPalette className="text-2xl text-[#A88A72]" />
                  </div>
                  <div className="mt-4 h-28 rounded-2xl bg-gradient-to-br from-[#778873]/35 via-[#DCCFC0]/50 to-[#FDF6ED]/80"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">About</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Crafting elegant experiences with clarity, motion, and intention.</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <p className="text-[#6d655c]">I’m Avnik Gupta, a frontend web developer passionate about transforming ideas into premium digital experiences. I blend modern design systems, thoughtful interaction, and clean code to build websites that feel refined and perform beautifully.</p>
                <p className="mt-4 text-[#6d655c]">My expertise includes HTML5, CSS3, JavaScript, Bootstrap 5, jQuery, WordPress, responsive design, Git, and GitHub. This website was built using modern frontend technologies and polished UI design principles.</p>
              </div>
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <h3 className="text-xl font-semibold">What I focus on</h3>
                <ul className="mt-4 space-y-3 text-[#6D655C]">
                  <li>• Premium UI systems and motion</li>
                  <li>• Responsive, accessible interfaces</li>
                  <li>• SEO-friendly and performance-first builds</li>
                  <li>• Clean, reusable frontend architecture</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">Skills</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Core strengths across frontend, CMS, and product delivery.</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {skills.map((skill) => (
                <div key={skill.title} className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skill.items.map((item) => <span key={item} className="rounded-full border border-[#DCCFC0] bg-[#FDF6ED] px-3 py-1 text-sm text-[#6d655c]">{item}</span>)}
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm text-[#6d655c]"><span>Proficiency</span><span>{skill.value}%</span></div>
                  <div className="mt-2 h-2 rounded-full bg-[#EADFD8]"><div className="h-2 rounded-full bg-gradient-to-r from-[#778873] via-[#A88A72] to-[#DCCFC0]" style={{ width: `${skill.value}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">Services</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Premium services for ambitious products and brands.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                  <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[#DCCFC0] to-[#FDF6ED] p-3"><FaReact className="text-xl text-[#778873]" /></div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-[#6D655C]">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">Projects</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Selected work that reflects modern craft and attention to detail.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.title} className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <a href={project.link} target="_blank" rel="noreferrer" className="rounded-full border border-[#DCCFC0] bg-[#FDF6ED] px-3 py-1 text-sm font-medium text-[#778873] transition hover:bg-[#F7E7DC]">Live Demo</a>
                    <span className="text-sm text-[#8a7f70]">2026</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-[#6d655c]">{project.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => <span key={tech} className="rounded-full border border-[#DCCFC0] bg-[#FDF6ED] px-3 py-1 text-sm text-[#6d655c]">{tech}</span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[#778873] hover:text-[#65775F]">Open Live Demo <FiExternalLink /></a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">GitHub</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Live GitHub presence and project footprint.</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <p className="text-sm text-[#6D655C]">Profile</p>
                <a href={githubProfile.html_url} target="_blank" rel="noreferrer" className="mt-3 block text-xl font-semibold text-[#2F3A2E]">GitHub Profile</a>
              </div>
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <p className="text-sm text-[#6D655C]">Repositories</p>
                <p className="mt-3 text-3xl font-semibold text-[#2F3A2E]">{githubProfile.public_repos}</p>
              </div>
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <p className="text-sm text-[#6D655C]">Followers</p>
                <p className="mt-3 text-3xl font-semibold text-[#2F3A2E]">{githubProfile.followers}</p>
              </div>
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <p className="text-sm text-[#6D655C]">Top Languages</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {githubLanguages.map((lang) => <span key={lang} className="rounded-full border border-[#DCCFC0] bg-[#FDF6ED] px-3 py-1 text-sm text-[#6D655C]">{lang}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#778873]">Contact</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Let’s create something memorable together.</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-semibold">Let’s talk</h3>
                <p className="mt-3 text-[#6D655C]">For freelance projects, collaborations, or new opportunities, I’d love to hear from you.</p>
                <div className="mt-6 space-y-3 text-[#6D655C]">
                  <a href="mailto:avnikgupta16@gmail.com" className="flex items-center gap-3 hover:text-white"><FaEnvelope /> avnikgupta16@gmail.com</a>
                  <a href="tel:+917042412263" className="flex items-center gap-3 hover:text-white">☎ +91 7042412263</a>
                  <a href="https://www.linkedin.com/in/avnik-gupta-0b37a041b" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white"><FaLinkedin /> LinkedIn</a>
                  <a href="https://github.com/anantgupta00000-ops" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white"><FaGithub /> GitHub</a>
                </div>
                <div className="mt-8 flex gap-4">
                  <a href="https://github.com/anantgupta00000-ops" target="_blank" rel="noreferrer" className="social-icon rounded-full border border-[#DCCFC0] bg-[#FDF6ED] p-3 text-xl transition hover:scale-110 hover:text-[#778873]"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/avnik-gupta-0b37a041b" target="_blank" rel="noreferrer" className="social-icon rounded-full border border-[#DCCFC0] bg-[#FDF6ED] p-3 text-xl transition hover:scale-110 hover:text-[#778873]"><FaLinkedin /></a>
                  <a href="mailto:avnikgupta16@gmail.com" className="social-icon rounded-full border border-[#DCCFC0] bg-[#FDF6ED] p-3 text-xl transition hover:scale-110 hover:text-[#778873]"><FaEnvelope /></a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="card rounded-[1.5rem] border border-[#DCCFC0] bg-[#FFF9F2] p-8 backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="rounded-2xl border border-[#DCCFC0] bg-[#fff5eb] px-4 py-3 outline-none ring-0 text-[#2f3a2e]" />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="rounded-2xl border border-[#DCCFC0] bg-[#fff5eb] px-4 py-3 outline-none ring-0 text-[#2f3a2e]" />
                </div>
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="mt-4 w-full rounded-2xl border border-[#DCCFC0] bg-[#fff5eb] px-4 py-3 outline-none ring-0 text-[#2f3a2e]" />
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows="6" className="mt-4 w-full rounded-2xl border border-[#DCCFC0] bg-[#fff5eb] px-4 py-3 outline-none ring-0 text-[#2f3a2e]"></textarea>
                <button disabled={isSending} className="mt-4 rounded-full bg-gradient-to-r from-[#778873] to-[#A88A72] px-5 py-3 text-sm font-semibold text-white disabled:opacity-70">{isSending ? 'Sending...' : 'Send Message'}</button>
                {status && <p className="mt-3 text-sm text-[#6d655c]">{status}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DCCFC0] px-6 py-8 text-[#6d655c] lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Avnik Gupta. Designed & Developed with care.</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-6 right-6 rounded-full border border-[#DCCFC0] bg-[#FDF6ED] p-3 text-[#778873] shadow-xl backdrop-blur-xl transition ${showBackToTop ? 'opacity-100' : 'pointer-events-none opacity-0'}`}><FaArrowUp /></button>
    </div>
  );
}

export default App;
