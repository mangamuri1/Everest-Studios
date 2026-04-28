'use strict';

/* ── CURSOR ─────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  cursor.style.left = mx + 'px'; 
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * .12; 
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px'; 
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,.service-card,.portfolio-item,.insta-post,.studio-img,.tab-btn,.frame-item,.story-item,.story-video-controls').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover') });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover') });
});

/* ── LOADER ─────────────────────────────────────── */
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hide');
    document.body.style.overflow = 'auto';
  }, 2400);
});

/* ── NAV ────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MOBILE NAV ─────────────────────────────────── */
window.toggleMobileNav = function() {
  const mn = document.getElementById('mobile-nav');
  if (mn) mn.style.display = mn.style.display === 'flex' ? 'none' : 'flex';
};

window.closeMobileNav = function() { 
  const mn = document.getElementById('mobile-nav');
  if (mn) mn.style.display = 'none';
};

/* ── HERO PARALLAX ──────────────────────────────── */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-cinematic-bg');
  if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * .28}px)`;
});

/* ── HERO WAVEFORM ──────────────────────────────── */
function drawHeroWave() {
  const pts = []; 
  const W = window.innerWidth; 
  const t = Date.now() / 1000;
  for (let x = 0; x <= W; x += 10) {
    const y = 80 + Math.sin((x / W) * Math.PI * 5 + t) * 20 + Math.sin((x / W) * Math.PI * 11 + t * 1.4) * 10 + Math.sin((x / W) * Math.PI * 2.5 + t * .7) * 7;
    pts.push(x + ',' + y);
  }
  const wl = document.getElementById('hero-wave-line');
  if (wl) wl.setAttribute('points', pts.join(' '));
  requestAnimationFrame(drawHeroWave);
}
drawHeroWave();

/* ── SCROLL REVEAL ──────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') });
}, { threshold: .1 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.timeline-item').forEach(el => revealObs.observe(el));

/* ── SERVICE WAVES ──────────────────────────────── */
for (let i = 1; i <= 6; i++) {
  const w = document.getElementById('wave' + i);
  if (!w) continue;
  for (let b = 0; b < 18; b++) {
    const bar = document.createElement('div');
    bar.className = 's-bar';
    bar.style.setProperty('--d', (0.35 + Math.random() * .9) + 's');
    bar.style.animationDelay = (Math.random() * .5) + 's';
    bar.style.height = (25 + Math.random() * 75) + '%';
    w.appendChild(bar);
  }
}

/* ── PORTFOLIO FILTER ───────────────────────────── */
window.filterPortfolio = function(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
  });
};

/* ── MODAL ──────────────────────────────────────── */
window.openModal = function(type, title, meta) {
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const body = document.getElementById('modal-body');
  const modal = document.getElementById('modal');

  if (modalTitle) modalTitle.textContent = title;
  if (modalMeta) modalMeta.textContent = meta;
  
  if (body) {
    if (type === 'audio') {
      body.innerHTML = `<p style="color:var(--muted-light);font-size:.88rem;margin-bottom:18px;font-family:var(--font-ui)">Audio preview — connect a media source to populate this player.</p><div style="background:var(--surface);border:1px solid var(--glass-border);border-radius:2px;padding:36px;text-align:center"><div style="font-size:3.5rem;margin-bottom:14px">🎵</div><p style="font-family:var(--font-ui);font-size:.7rem;color:var(--muted);letter-spacing:.2em;text-transform:uppercase">Audio Player</p><p style="font-family:var(--font-ui);font-size:.7rem;color:var(--crimson-light);margin-top:10px">Connect Spotify / SoundCloud / custom media API</p></div>`;
    } else {
      body.innerHTML = `<p style="color:var(--muted-light);font-size:.88rem;margin-bottom:18px;font-family:var(--font-ui)">Video preview — connect a media source to populate this player.</p><div class="modal-video" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px"><div style="font-size:4rem">🎬</div><p style="font-family:var(--font-ui);font-size:.7rem;color:var(--muted);letter-spacing:.2em;text-transform:uppercase">Video Player</p><p style="font-family:var(--font-ui);font-size:.7rem;color:var(--crimson-light)">Connect YouTube / Vimeo / custom video CDN</p></div>`;
    }
  }
  
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = 'auto';
};

window.closeModalOnBackdrop = function(e) { 
  const modal = document.getElementById('modal');
  if (e.target === modal) window.closeModal(); 
};

document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') window.closeModal(); 
});

/* ── INSTAGRAM GRIDS ────────────────────────────── */
const ownerEmojis = ['🎤', '🎵', '🎶', '🎼', '🎸', '🎹'];
const studioEmojis = ['🎛️', '🎙️', '🔊', '🎬', '🎞️', '📡'];

function buildInstaGrid(gridId, emojis, url) {
  const g = document.getElementById(gridId); 
  if (!g) return;
  for (let i = 0; i < 6; i++) {
    const post = document.createElement('div');
    post.className = 'insta-post';
    post.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--surface);font-size:2rem">${emojis[i % emojis.length]}</div><div class="insta-post-overlay">&#x2197;</div>`;
    post.onclick = () => window.open(url, '_blank');
    g.appendChild(post);
  }
}
buildInstaGrid('owner-insta-grid', ownerEmojis, 'https://www.instagram.com/mahith_narayan/');
buildInstaGrid('studio-insta-grid', studioEmojis, 'https://www.instagram.com/evereststudioshyd/');

/* ── PIANO ENGINE ────────────────────────────────── */
(function () {
  const NOTES = [
    { n: 'C3', f: 130.81, t: 'w' }, { n: 'C#3', f: 138.59, t: 'b' },
    { n: 'D3', f: 146.83, t: 'w' }, { n: 'D#3', f: 155.56, t: 'b' },
    { n: 'E3', f: 164.81, t: 'w' },
    { n: 'F3', f: 174.61, t: 'w' }, { n: 'F#3', f: 185.00, t: 'b' },
    { n: 'G3', f: 196.00, t: 'w' }, { n: 'G#3', f: 207.65, t: 'b' },
    { n: 'A3', f: 220.00, t: 'w' }, { n: 'A#3', f: 233.08, t: 'b' },
    { n: 'B3', f: 246.94, t: 'w' },
    { n: 'C4', f: 261.63, t: 'w' }, { n: 'C#4', f: 277.18, t: 'b' },
    { n: 'D4', f: 293.66, t: 'w' }, { n: 'D#4', f: 311.13, t: 'b' },
    { n: 'E4', f: 329.63, t: 'w' },
    { n: 'F4', f: 349.23, t: 'w' }, { n: 'F#4', f: 369.99, t: 'b' },
    { n: 'G4', f: 392.00, t: 'w' }, { n: 'G#4', f: 415.30, t: 'b' },
    { n: 'A4', f: 440.00, t: 'w' }, { n: 'A#4', f: 466.16, t: 'b' },
    { n: 'B4', f: 493.88, t: 'w' },
    { n: 'C5', f: 523.25, t: 'w' }
  ];
  const KB = { 'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4', 'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4', 'k': 'C5' };
  let actx = null;
  function getCtx() { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); return actx; }

  function playNote(freq, name) {
    const ctx = getCtx(), now = ctx.currentTime;
    const display = document.getElementById('piano-note-display');
    if (display) display.textContent = name;
    
    // Master
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.001, now);
    master.gain.linearRampToValueAtTime(0.55, now + 0.006);
    master.gain.exponentialRampToValueAtTime(0.22, now + 0.18);
    master.gain.exponentialRampToValueAtTime(0.001, now + 3.2);
    
    // Compressor
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 5;
    master.connect(comp); comp.connect(ctx.destination);
    
    // Filter (string brightness)
    const flt = ctx.createBiquadFilter();
    flt.type = 'lowpass';
    flt.frequency.setValueAtTime(freq * 10, now);
    flt.frequency.exponentialRampToValueAtTime(freq * 2.5, now + 0.25);
    flt.Q.value = 0.8;
    flt.connect(master);
    
    // Harmonics
    [[1, 1.0], [2, 0.55], [3, 0.22], [4, 0.12], [5, 0.07], [6, 0.04], [7, 0.02]].forEach(([n, g]) => {
      const o = ctx.createOscillator(), gn = ctx.createGain();
      o.type = 'sine'; o.frequency.value = freq * n;
      gn.gain.setValueAtTime(g * 0.28, now);
      gn.gain.exponentialRampToValueAtTime(0.001, now + (3.2 / Math.sqrt(n)));
      o.connect(gn); gn.connect(flt);
      o.start(now); o.stop(now + 3.5);
    });
    
    // Hammer transient noise
    const bsz = Math.floor(ctx.sampleRate * 0.022);
    const buf = ctx.createBuffer(1, bsz, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bsz; i++) d[i] = (Math.random() * 2 - 1);
    const ns = ctx.createBufferSource(), nf = ctx.createBiquadFilter(), ng = ctx.createGain();
    ns.buffer = buf; nf.type = 'bandpass'; nf.frequency.value = freq * 2.2; nf.Q.value = 0.6;
    ng.gain.setValueAtTime(0.09, now); ng.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    ns.connect(nf); nf.connect(ng); ng.connect(comp);
    ns.start(now); ns.stop(now + 0.03);
  }

  // Build keyboard
  const wrap = document.getElementById('piano-keys');
  if (!wrap) return;
  const whites = NOTES.filter(n => n.t === 'w');
  
  // White keys
  whites.forEach((note) => {
    const el = document.createElement('div');
    el.className = 'pk-white'; el.dataset.note = note.n;
    const shortcut = Object.entries(KB).find(([k, v]) => v === note.n);
    el.innerHTML = `<span class="kl">${shortcut ? shortcut[0].toUpperCase() : ''}</span>`;
    el.addEventListener('mousedown', e => { e.preventDefault(); playNote(note.f, note.n); el.classList.add('active'); });
    el.addEventListener('mouseup', () => el.classList.remove('active'));
    el.addEventListener('mouseleave', () => el.classList.remove('active'));
    el.addEventListener('touchstart', e => { e.preventDefault(); playNote(note.f, note.n); el.classList.add('active'); }, { passive: false });
    el.addEventListener('touchend', () => el.classList.remove('active'));
    wrap.appendChild(el);
  });
  
  // Black keys — positioned after rendering
  requestAnimationFrame(() => {
    const wEls = wrap.querySelectorAll('.pk-white');
    const wW = wEls[0] ? wEls[0].offsetWidth : 52;
    NOTES.forEach((note, ni) => {
      if (note.t !== 'b') return;
      let count = 0;
      for (let i = 0; i < ni; i++) { if (NOTES[i].t === 'w') count++; }
      const wIdx = count - 1;
      const leftPx = wIdx * wW + wW * 0.62;
      const el = document.createElement('div');
      el.className = 'pk-black'; el.dataset.note = note.n;
      el.style.left = leftPx + 'px';
      const shortcut = Object.entries(KB).find(([k, v]) => v === note.n);
      if (shortcut) el.title = shortcut[0].toUpperCase();
      el.addEventListener('mousedown', e => { e.preventDefault(); playNote(note.f, note.n); el.classList.add('active'); });
      el.addEventListener('mouseup', () => el.classList.remove('active'));
      el.addEventListener('mouseleave', () => el.classList.remove('active'));
      el.addEventListener('touchstart', e => { e.preventDefault(); playNote(note.f, note.n); el.classList.add('active'); }, { passive: false });
      el.addEventListener('touchend', () => el.classList.remove('active'));
      wrap.appendChild(el);
    });
  });
  
  // Keyboard input
  document.addEventListener('keydown', e => {
    if (e.repeat) return;
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const noteName = KB[e.key.toLowerCase()];
    if (!noteName) return;
    const found = NOTES.find(n => n.n === noteName);
    if (!found) return;
    playNote(found.f, found.n);
    const el = wrap.querySelector(`[data-note="${noteName}"]`);
    if (el) el.classList.add('active');
  });
  
  document.addEventListener('keyup', e => {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const noteName = KB[e.key.toLowerCase()];
    if (!noteName) return;
    const el = wrap.querySelector(`[data-note="${noteName}"]`);
    if (el) el.classList.remove('active');
  });
})();

/* ── STORY VIDEO MUTE ───────────────────────────── */
window.toggleMute = function(btn) {
  const vid = btn.parentElement.querySelector('video');
  if (vid) {
    vid.muted = !vid.muted;
    btn.textContent = vid.muted ? '🔇' : '🔊';
  }
};

/* ── FORM — Formspree + localStorage + toast ───── */
window.handleFormSubmit = function(e) {
  e.preventDefault();
  const btn = e.target;
  const form = btn.closest('.contact-grid').querySelector('.reveal-right');
  const inputs = form.querySelectorAll('.form-input,.form-select,.form-textarea');
  const labels = form.querySelectorAll('.form-label');
  
  const entry = { id: Date.now(), submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) };
  const formData = new FormData();
  inputs.forEach((inp, i) => {
    const label = labels[i] ? labels[i].textContent.trim() : 'field_' + i;
    entry[label] = inp.value;
    if (inp.name) formData.append(inp.name, inp.value);
  });
  
  const key = 'evereststudios_enquiries';
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(entry);
  localStorage.setItem(key, JSON.stringify(existing));
  
  const orig = btn.textContent;
  btn.textContent = 'Sending...';
  btn.style.opacity = '.7';
  btn.disabled = true;
  
  fetch('https://formspree.io/f/meevbrgw', {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' }
  })
    .then(res => {
      if (res.ok) {
        btn.textContent = '\u2713 Enquiry Sent!';
        btn.style.background = '#25d366';
        btn.style.opacity = '1';
        btn.disabled = false;
        showToast('\u2705 Enquiry sent successfully! We will contact you shortly.');
        inputs.forEach(inp => inp.tagName === 'SELECT' ? inp.selectedIndex = 0 : inp.value = '');
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3500);
      } else {
        btn.textContent = '\u26a0 Try Again';
        btn.style.background = 'var(--crimson)';
        btn.style.opacity = '1';
        btn.disabled = false;
        showToast('\u26a0 Something went wrong. Please try WhatsApp or email.');
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3500);
      }
    })
    .catch(() => {
      btn.textContent = '\u26a0 Try Again';
      btn.style.background = 'var(--crimson)';
      btn.style.opacity = '1';
      btn.disabled = false;
      showToast('\u26a0 Network error. Enquiry saved locally — we will follow up.');
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3500);
    });
};

function showToast(msg) {
  let t = document.getElementById('es-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'es-toast';
    t.style.cssText = 'position:fixed;bottom:36px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--panel);border:1px solid rgba(0,255,100,.2);color:var(--platinum-light);font-family:var(--font-ui);font-size:.82rem;letter-spacing:.08em;padding:16px 32px;border-radius:4px;box-shadow:0 8px 40px rgba(0,0,0,.6);z-index:9995;transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .5s;opacity:0;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => {
    t.style.transform = 'translateX(-50%) translateY(0)';
    t.style.opacity = '1';
    setTimeout(() => {
      t.style.transform = 'translateX(-50%) translateY(100px)';
      t.style.opacity = '0';
    }, 4000);
  });
}

/* ── STAT COUNTERS ──────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target); 
    const suffix = el.dataset.suffix || '';
    let current = 0; 
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); counterObs.disconnect(); } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

const statWrap = document.querySelector('.owner-stats');
if (statWrap) counterObs.observe(statWrap);
else { 
  const ownerSec = document.getElementById('owner'); 
  if (ownerSec) counterObs.observe(ownerSec); 
}
