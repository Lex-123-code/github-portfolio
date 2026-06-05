// ── Contribution Grid ──
const grid = document.getElementById('contrib-grid');
const levels = [0,0,0,1,1,2,2,3,3,4];
const weeks = 52;
for (let w = 0; w < weeks; w++) {
  const col = document.createElement('div');
  col.className = 'contrib-col';
  const days = 7;
  for (let d = 0; d < days; d++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    // make recent weeks denser
    const recency = w / weeks;
    const rand = Math.random();
    let lvl;
    if (rand < 0.28) lvl = 0;
    else if (rand < 0.5) lvl = 1;
    else if (rand < 0.7) lvl = recency > 0.6 ? 3 : 2;
    else if (rand < 0.88) lvl = recency > 0.7 ? 4 : 3;
    else lvl = 4;
    cell.classList.add('c' + lvl);
    col.appendChild(cell);
  }
  grid.appendChild(col);
}

// ── Monthly bar chart ──
const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
const commits = [42,58,39,91,77,120,88,145,103,167,189,212];
const max = Math.max(...commits);
const barsEl = document.getElementById('monthly-bars');
const labelsEl = document.getElementById('month-labels');
months.forEach((m, i) => {
  const col = document.createElement('div');
  col.className = 'bar-col';
  const fill = document.createElement('div');
  fill.className = 'bar-fill';
  fill.style.height = Math.round((commits[i] / max) * 56) + 'px';
  col.appendChild(fill);
  barsEl.appendChild(col);

  const lbl = document.createElement('div');
  lbl.style.cssText = 'flex:1;text-align:center;font-size:9px;color:var(--muted)';
  lbl.textContent = m;
  labelsEl.appendChild(lbl);
});

// ── Scroll reveal ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.js-reveal').forEach(el => obs.observe(el));
