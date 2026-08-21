const loadingScreen = document.getElementById('loadingScreen');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const siteHeader = document.getElementById('siteHeader');
const typedText = document.getElementById('typedText');

const texts = ['HTML • CSS • JavaScript', 'Responsive Design', 'Frontend Practice', 'User-Friendly UI'];
let textIndex = 0;

window.addEventListener('load', () => {
  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('hidden');
  }, 700);
});

if (typedText) {
  setInterval(() => {
    typedText.textContent = texts[textIndex % texts.length];
    textIndex += 1;
  }, 2500);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navAnchors.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'active');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = totalHeight > 0 ? scrollTop / totalHeight : 0;

  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${progress})`;
  }

  if (siteHeader) {
    siteHeader.classList.toggle('scrolled', scrollTop > 20);
  }

  if (backToTop) {
    backToTop.classList.toggle('show', scrollTop > 420);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const practiceCards = document.querySelectorAll('#practice .project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((el) => el.classList.toggle('is-active', el === button));

    practiceCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.style.display = matches ? '' : 'none';
    });
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const requiredFields = ['name', 'email', 'project_type', 'message'];

    const isValid = requiredFields.every((field) => {
      const value = values[field];
      return value !== undefined && String(value).trim() !== '';
    });

    if (!isValid) {
      formStatus.textContent = 'Please fill in all required fields.';
      return;
    }

    const subject = encodeURIComponent(`${values.project_type || 'Portfolio'} enquiry`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nProject Type: ${values.project_type}\n\nMessage:\n${values.message}`
    );

    form.reset();
    window.location.href = `mailto:avnikgupta16@gmail.com?subject=${subject}&body=${body}`;
    formStatus.textContent = 'Your email app should open with the message ready to send.';
  });
}

