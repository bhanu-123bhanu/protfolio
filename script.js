// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.transition = 'opacity 0.6s ease';
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 600);
    }
  }, 2000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX; cy = e.clientY;
  if (cursor) {
    cursor.style.left = cx + 'px'; 
    cursor.style.top = cy + 'px';
  }
});

function animRing() {
  rx += (cx - rx) * 0.12; 
  ry += (cy - ry) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = rx + 'px'; 
    cursorRing.style.top = ry + 'px';
  }
  requestAnimationFrame(animRing);
}
animRing();

// Scroll Bar
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  const scrollBar = document.getElementById('scrollBar');
  if (scrollBar) {
    scrollBar.style.width = pct + '%';
  }
});

// Project card mouse glow
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.1) + 's';
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => bar.classList.add('animate'), 300);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item, .project-card, .skill-cat').forEach(el => observer.observe(el));

// Skill bars in view
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => bar.classList.add('animate'), 400);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-cat').forEach(el => barObserver.observe(el));
