const loadingScreen = document.getElementById('loadingScreen');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const siteHeader = document.getElementById('siteHeader');
const typedText = document.getElementById('typedText');

const texts = ['Creating premium web experiences', 'Designing elegant digital products', 'Crafting polished responsive interfaces'];
let index = 0;

window.addEventListener('load', () => {
  setTimeout(() => loadingScreen.classList.add('hidden'), 800);
});

function animateTyping() {
  typedText.textContent = texts[index % texts.length];
  index += 1;
}
setInterval(animateTyping, 2200);

menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline.from('.hero-copy > *', { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 })
    .from('.hero-visual', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5');

  gsap.utils.toArray('.glass-panel, .section-heading').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      y: 24,
      opacity: 0,
      duration: 0.7
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.nav-links a').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? scrollTop / height : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
  siteHeader.classList.toggle('scrolled', scrollTop > 20);
  backToTop.classList.toggle('show', scrollTop > 420);
});

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

let lastSubmission = 0;
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const now = Date.now();
  if (now - lastSubmission < 10000) {
    formStatus.textContent = 'Please wait a moment before sending another message.';
    return;
  }

  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());
  const isValid = Object.values(values).every((value) => String(value).trim());

  if (!isValid) {
    formStatus.textContent = 'Please fill out every field before sending.';
    return;
  }

  lastSubmission = now;
  formStatus.textContent = 'Sending your message...';

  const serviceId = 'service_your_id';
  const templateId = 'template_your_id';
  const publicKey = 'your_public_key';

  if (serviceId !== 'service_your_id' && templateId !== 'template_your_id' && publicKey !== 'your_public_key') {
    try {
      emailjs.init(publicKey);
      await emailjs.send(serviceId, templateId, values);
      form.reset();
      formStatus.textContent = 'Message sent successfully!';
    } catch (error) {
      formStatus.textContent = 'EmailJS failed. Please try again later.';
    }
  } else {
    const subject = encodeURIComponent(values.subject || 'Portfolio Contact');
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`);
    window.location.href = `mailto:avnikgupta16@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
    formStatus.textContent = 'Your email app should open with the message ready to send.';
  }
});
