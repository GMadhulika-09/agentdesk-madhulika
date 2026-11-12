/* AgentDesk – interactions (vanilla JS, no libraries).
   Each feature is its own function; they are all started at the bottom of the file. */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. THEME: light / dark, remembered in localStorage */
function initTheme() {
  const root = document.documentElement;
  const btn = $('#themeBtn');
  function apply(theme) {
    root.dataset.theme = theme;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  apply(root.dataset.theme || 'light');
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('agentdesk-theme', next); } catch (e) {}
  });
}

/* 2. NAVIGATION: mobile menu + highlight the section being viewed */
function initNav() {
  const menuBtn = $('#menuBtn');
  const links = $('#links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const navLinks = $$('a', links);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) observer.observe(s); });
}

/* 3. HERO DASHBOARD: simulated activity (sample data only, no real AI) */
function initDashboard() {
  const samples = [
    ['c1', 'Support Agent', 'answered a question about opening hours'],
    ['c2', 'Scheduling Agent', 'booked a tasting for Friday, 4:30 pm'],
    ['c3', 'Email Agent', 'drafted a reply and is waiting for approval'],
    ['c1', 'Support Agent', 'passed a refund question to the owner'],
    ['c2', 'Scheduling Agent', 'sent a reminder for tomorrow\'s pickup'],
    ['c3', 'Email Agent', 'sorted 8 new emails by urgency'],
  ];
  const feed = $('#feed');
  const counter = $('#taskCount');
  let next = 0, total = Number(counter.textContent);

  function addItem() {
    const [cls, who, what] = samples[next % samples.length];
    const li = document.createElement('li');
    li.className = cls;
    li.style.setProperty('--c', `var(--${{ c1: 'purple', c2: 'mint', c3: 'blue' }[cls]})`);
    const strong = document.createElement('b');
    strong.textContent = who;
    li.append(strong, ' ' + what);
    feed.prepend(li);
    while (feed.children.length > 4) feed.lastChild.remove();
    counter.textContent = ++total;
    next++;
  }
  for (let k = 0; k < 4; k++) addItem();
  total = 128; counter.textContent = total;
  if (!reducedMotion) setInterval(addItem, 3500);
}

/* 4. AGENT MODAL: uses the native <dialog> element (Esc to close, focus stays inside) */
function initAgentModal() {
  const modal = $('#agentModal');
  let current = null;

  function open(card) {
    current = card;
    $('#modalTitle').textContent = $('h3', card).textContent;
    $('#modalDesc').textContent = $('.agent-desc', card).textContent;
    $('#modalCaps').innerHTML = $('.caps', card).innerHTML;
    $('#modalSample').textContent = card.dataset.sample;
    const tile = $('#modalTile');
    tile.className = 'tile ' + [...$('.tile', card).classList].find(c => /^c\d$/.test(c));
    tile.innerHTML = $('.tile', card).innerHTML;
    document.body.classList.add('modal-open');
    modal.showModal();
  }
  function close() { modal.close(); }

  $$('[data-open]').forEach(btn => btn.addEventListener('click', () => open(btn.closest('.agent'))));
  $('#modalClose').addEventListener('click', close);
  $('#modalCancel').addEventListener('click', close);
  modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
  // Clicking the dark area outside the box also closes it
  modal.addEventListener('click', e => { if (e.target === modal) close(); });

  $('#modalConfirm').addEventListener('click', () => {
    const select = $('#agent');
    select.value = $('#modalTitle').textContent;
    $('#agentErr').textContent = '';
    select.classList.remove('invalid');
    close();
    $('#contact').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    setTimeout(() => $('#name').focus({ preventScroll: true }), reducedMotion ? 0 : 500);
  });
}

/* 5. HOW IT WORKS: draw the connecting lines when the section scrolls into view */
function initSteps() {
  const steps = $('#steps');
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { steps.classList.add('in'); observer.disconnect(); }
  }, { threshold: 0.4 });
  observer.observe(steps);
}

/* 6. PRICING: monthly / yearly toggle */
function initPricing() {
  const buttons = $$('.toggle button');
  const note = $('#billNote');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const yearly = btn.dataset.bill === 'yearly';
    buttons.forEach(b => {
      b.classList.toggle('on', b === btn);
      b.setAttribute('aria-pressed', b === btn);
    });
    $$('.amt').forEach(el => { el.textContent = yearly ? el.dataset.y : el.dataset.m; });
    $$('.bill').forEach(el => { el.textContent = yearly ? el.dataset.y : el.dataset.m; });
    note.textContent = yearly
      ? 'Yearly prices show the monthly equivalent, billed once a year at 20% less than monthly billing.'
      : 'Prices are per month, billed monthly.';
  }));
}

/* 7. FAQ: only one answer open at a time */
function initFaq() {
  const items = $$('#faq details');
  items.forEach(item => item.addEventListener('toggle', () => {
    if (item.open) items.forEach(other => { if (other !== item) other.open = false; });
  }));
}

/* 8. DEMO FORM: validation + confirmation (front-end only, nothing is sent) */
function initForm() {
  const form = $('#demoForm');
  const success = $('#success');
  const rules = {
    name:     v => v.trim().length >= 2 || 'Enter your full name.',
    email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email, like name@company.com.',
    business: v => v.trim().length >= 2 || 'Enter your business name.',
    agent:    v => v !== '' || 'Choose an agent.',
  };
  const field = id => $('#' + id);

  function validate(id) {
    const result = rules[id](field(id).value);
    const ok = result === true;
    $('#' + id + 'Err').textContent = ok ? '' : result;
    field(id).classList.toggle('invalid', !ok);
    field(id).setAttribute('aria-invalid', !ok);
    return ok;
  }
  Object.keys(rules).forEach(id => {
    field(id).addEventListener('blur', () => validate(id));
    field(id).addEventListener('input', () => field(id).classList.contains('invalid') && validate(id));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    success.hidden = true;
    const results = Object.keys(rules).map(validate);
    if (results.includes(false)) {
      field(Object.keys(rules)[results.indexOf(false)]).focus();
      return;
    }
    const first = field('name').value.trim().split(' ')[0];
    success.textContent = `Thanks, ${first}. This is a front-end demo, so nothing was sent or booked. In a live product, the team would reply to ${field('email').value.trim()}.`;
    success.hidden = false;
    form.reset();
    success.focus();
  });
}

/* 9. BACK TO TOP button */
function initBackToTop() {
  const btn = $('#toTop');
  addEventListener('scroll', () => { btn.hidden = scrollY < 700; }, { passive: true });
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
}

initTheme(); initNav(); initDashboard(); initAgentModal(); initSteps();
initPricing(); initFaq(); initForm(); initBackToTop();
