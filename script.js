// mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? '✕' : '☰';
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
    document.body.style.overflow = '';
  }));
}

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// hero search (demo only — no backend)
const heroSearch = document.getElementById('heroSearchForm');
if (heroSearch) {
  heroSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = heroSearch.querySelector('input').value.trim();
    if (q) alert('Search is a visual demo in this template — connect it to a real search index or site search service.');
  });
}

// people/insights filters (shared pattern)
document.querySelectorAll('.filters').forEach(group => {
  const buttons = group.querySelectorAll('.filter-btn');
  const targetSelector = group.dataset.target || '.people-card';
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll(targetSelector).forEach(card => {
        card.hidden = !(filter === 'all' || card.dataset.cat === filter);
      });
    });
  });
});
