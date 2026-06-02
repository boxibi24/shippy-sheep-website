/* logos2.jsx — Helmsheep app-icon variations (ship's wheel + sheep hub) */

const PAL2 = { ink: '#152538', navy: '#1f4e79', sky: '#2f9ee0', sun: '#ffc23d', coral: '#ff7a5c', plum: '#8a6cff' };

/* compact faceted sheep face */
function SheepHub(cx, cy, r, wool, shade, face) {
  return (
    <g>
      <polygon points={`${cx - r},${cy - r * 0.15} ${cx - r * 0.4},${cy - r} ${cx},${cy}`} fill={wool} />
      <polygon points={`${cx - r * 0.4},${cy - r} ${cx + r * 0.4},${cy - r} ${cx},${cy}`} fill={shade} />
      <polygon points={`${cx + r * 0.4},${cy - r} ${cx + r},${cy - r * 0.15} ${cx},${cy}`} fill={wool} />
      <polygon points={`${cx - r},${cy - r * 0.15} ${cx},${cy} ${cx - r * 0.5},${cy + r * 0.8}`} fill={shade} />
      <polygon points={`${cx + r},${cy - r * 0.15} ${cx},${cy} ${cx + r * 0.5},${cy + r * 0.8}`} fill={shade} />
      <polygon points={`${cx - r * 0.5},${cy + r * 0.8} ${cx},${cy} ${cx + r * 0.5},${cy + r * 0.8}`} fill={wool} />
      <polygon points={`${cx - r * 0.5},${cy + r * 0.05} ${cx + r * 0.5},${cy + r * 0.05} ${cx},${cy + r}`} fill={face} />
      <circle cx={cx - r * 0.2} cy={cy + r * 0.28} r={r * 0.1} fill={wool} />
      <circle cx={cx + r * 0.2} cy={cy + r * 0.28} r={r * 0.1} fill={wool} />
    </g>
  );
}

/* configurable ship's wheel + sheep hub. cfg: {ring, hub, wool, shade, face, spokes, stroke, ringW} */
function HelmIcon({ cfg }) {
  const { ring, hub, wool = '#ffffff', shade = '#cfe0ee', face, spokes = 6, stroke = false, ringW = 5 } = cfg;
  const handles = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2 - Math.PI / 2;
    const x1 = 32 + Math.cos(a) * 18, y1 = 32 + Math.sin(a) * 18;
    const x2 = 32 + Math.cos(a) * 30, y2 = 32 + Math.sin(a) * 30;
    handles.push(<line key={'l' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ring} strokeWidth={ringW} strokeLinecap="round" />);
    handles.push(<circle key={'c' + i} cx={x2} cy={y2} r={ringW * 0.82} fill={ring} />);
  }
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Helmsheep icon">
      {handles}
      {stroke
        ? <circle cx="32" cy="32" r="20" fill="none" stroke={ring} strokeWidth={ringW} />
        : <><circle cx="32" cy="32" r="21" fill={ring} /><circle cx="32" cy="32" r="15.5" fill={hub} /></>}
      {stroke && <circle cx="32" cy="32" r="14.5" fill={hub} />}
      {SheepHub(32, 32, 10, wool, shade, face)}
    </svg>
  );
}

/* the lockup */
function WordmarkH({ onDark, accent }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 25, letterSpacing: '-0.01em', color: onDark ? '#fff' : PAL2.ink, whiteSpace: 'nowrap' }}>Shippy Sheep</span>
      <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: accent || PAL2.sky, marginTop: 5 }}>Studio</span>
    </span>
  );
}

Object.assign(window, { HelmIcon, SheepHub, WordmarkH, PAL2 });
