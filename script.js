const loadingScreen = document.getElementById('loadingScreen');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const siteHeader = document.getElementById('siteHeader');
const typedText = document.getElementById('typedText');

const texts = ['Frontend Web Developer', 'HTML • CSS • JavaScript', 'Responsive Web Designer', 'Creative UI Developer'];
let index = 0;

window.addEventListener('load', () => {
  setTimeout(() => loadingScreen.classList.add('hidden'), 800);
});

function animateTyping() {
  if (!typedText) return;
  typedText.classList.add('is-changing');
  setTimeout(() => {
    typedText.textContent = texts[index % texts.length];
    typedText.classList.remove('is-changing');
  }, 180);
  index += 1;
}
setInterval(animateTyping, 3200);

const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (event) => {
  document.body.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.body.style.setProperty('--mouse-y', `${event.clientY}px`);
  if (cursor) {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  }
});

document.querySelectorAll('a, button, input, textarea, select').forEach((element) => {
  element.addEventListener('mouseenter', () => cursor?.classList.add('is-active'));
  element.addEventListener('mouseleave', () => cursor?.classList.remove('is-active'));
});

menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

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

const revealObserver = new IntersectionObserver((entries, revealObserverInstance) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserverInstance.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-heading, .about-card, .about-stat-card, .about-tech-card, .about-profile-card, .skill-card, .service-card, .project-card, .focus-card, .review-card, .contact-card, .form-card, .journey-item, #journey').forEach((element, elementIndex) => {
  element.classList.add('reveal');
  element.style.setProperty('--reveal-delay', `${Math.min(elementIndex * 60, 420)}ms`);
  revealObserver.observe(element);
});

const statsStrip = document.querySelector('.stats-strip');
const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.35 });

if (statsStrip) statsObserver.observe(statsStrip);

document.querySelectorAll('.focus-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
  });
});

document.querySelectorAll('.skill-card, .service-card, .project-card, .about-stat-card, .about-tech-card, .review-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const practiceCards = document.querySelectorAll('#practice .project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    practiceCards.forEach((card, cardIndex) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-filtered', !matches);
      if (matches) {
        card.style.setProperty('--filter-delay', `${cardIndex * 55}ms`);
        card.classList.remove('filter-in');
        requestAnimationFrame(() => card.classList.add('filter-in'));
      }
    });
  });
});

const approachSection = document.getElementById('approach');
const approachObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.approach-step, .approach-line').forEach((element, index) => {
      setTimeout(() => element.classList.add('active'), index * 300);
    });
    observer.unobserve(entry.target);
  });
}, { threshold: 0.35 });

if (approachSection) approachObserver.observe(approachSection);

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
    const subject = encodeURIComponent(`${values.project_type || 'Portfolio'} enquiry`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nProject Type: ${values.project_type}\n\nMessage:\n${values.message}`);
    window.location.href = `mailto:avnikgupta16@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
    formStatus.textContent = 'Your email app should open with the message ready to send.';
  }
});
