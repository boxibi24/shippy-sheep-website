/* logos3.jsx — light-mode helm + interchangeable sheep-in-hub designs */

const PAL3 = { ink: '#152538', navy: '#1f4e79', navyLt: '#3a6da0', navyDk: '#0f2c49', sky: '#2f9ee0', sun: '#ffc23d' };

/* ---- sheep variants: each draws a head centered at (cx,cy) within radius r.
   colors c = { wool, shade, face, eye } ---- */

function sFaceted(cx, cy, r, c) {
  return (
    <g>
      <polygon points={`${cx - r},${cy - r * 0.15} ${cx - r * 0.4},${cy - r} ${cx},${cy}`} fill={c.wool} />
      <polygon points={`${cx - r * 0.4},${cy - r} ${cx + r * 0.4},${cy - r} ${cx},${cy}`} fill={c.shade} />
      <polygon points={`${cx + r * 0.4},${cy - r} ${cx + r},${cy - r * 0.15} ${cx},${cy}`} fill={c.wool} />
      <polygon points={`${cx - r},${cy - r * 0.15} ${cx},${cy} ${cx - r * 0.5},${cy + r * 0.8}`} fill={c.shade} />
      <polygon points={`${cx + r},${cy - r * 0.15} ${cx},${cy} ${cx + r * 0.5},${cy + r * 0.8}`} fill={c.shade} />
      <polygon points={`${cx - r * 0.5},${cy + r * 0.8} ${cx},${cy} ${cx + r * 0.5},${cy + r * 0.8}`} fill={c.wool} />
      <polygon points={`${cx - r * 0.5},${cy + r * 0.05} ${cx + r * 0.5},${cy + r * 0.05} ${cx},${cy + r}`} fill={c.face} />
      <circle cx={cx - r * 0.2} cy={cy + r * 0.3} r={r * 0.1} fill={c.eye} />
      <circle cx={cx + r * 0.2} cy={cy + r * 0.3} r={r * 0.1} fill={c.eye} />
    </g>
  );
}

function sFluffy(cx, cy, r, c) {
  return (
    <g>
      {/* ears */}
      <ellipse cx={cx - r * 0.92} cy={cy + r * 0.15} rx={r * 0.22} ry={r * 0.34} fill={c.face} transform={`rotate(-22 ${cx - r * 0.92} ${cy + r * 0.15})`} />
      <ellipse cx={cx + r * 0.92} cy={cy + r * 0.15} rx={r * 0.22} ry={r * 0.34} fill={c.face} transform={`rotate(22 ${cx + r * 0.92} ${cy + r * 0.15})`} />
      {/* fluffy wool head */}
      <circle cx={cx - r * 0.55} cy={cy - r * 0.4} r={r * 0.5} fill={c.shade} />
      <circle cx={cx + r * 0.55} cy={cy - r * 0.4} r={r * 0.5} fill={c.shade} />
      <circle cx={cx} cy={cy - r * 0.72} r={r * 0.52} fill={c.wool} />
      <circle cx={cx - r * 0.55} cy={cy + r * 0.25} r={r * 0.45} fill={c.wool} />
      <circle cx={cx + r * 0.55} cy={cy + r * 0.25} r={r * 0.45} fill={c.shade} />
      {/* face */}
      <ellipse cx={cx} cy={cy + r * 0.18} rx={r * 0.6} ry={r * 0.56} fill={c.face} />
      <circle cx={cx - r * 0.24} cy={cy + r * 0.08} r={r * 0.11} fill={c.eye} />
      <circle cx={cx + r * 0.24} cy={cy + r * 0.08} r={r * 0.11} fill={c.eye} />
    </g>
  );
}

function sMinimal(cx, cy, r, c) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 0.86} fill={c.wool} />
      <circle cx={cx - r * 0.58} cy={cy - r * 0.42} r={r * 0.4} fill={c.shade} />
      <circle cx={cx + r * 0.58} cy={cy - r * 0.42} r={r * 0.4} fill={c.shade} />
      <circle cx={cx} cy={cy - r * 0.72} r={r * 0.42} fill={c.wool} />
      <circle cx={cx - r * 0.6} cy={cy + r * 0.35} r={r * 0.34} fill={c.shade} />
      <circle cx={cx + r * 0.6} cy={cy + r * 0.35} r={r * 0.34} fill={c.wool} />
      <circle cx={cx - r * 0.28} cy={cy + r * 0.02} r={r * 0.13} fill={c.face} />
      <circle cx={cx + r * 0.28} cy={cy + r * 0.02} r={r * 0.13} fill={c.face} />
      <ellipse cx={cx} cy={cy + r * 0.4} rx={r * 0.16} ry={r * 0.12} fill={c.face} />
    </g>
  );
}

function sProfile(cx, cy, r, c) {
  return (
    <g>
      {/* back wool puff */}
      <circle cx={cx - r * 0.45} cy={cy - r * 0.12} r={r * 0.6} fill={c.wool} />
      <circle cx={cx - r * 0.78} cy={cy + r * 0.22} r={r * 0.4} fill={c.shade} />
      <circle cx={cx - r * 0.2} cy={cy - r * 0.6} r={r * 0.4} fill={c.shade} />
      <circle cx={cx - r * 0.6} cy={cy + r * 0.52} r={r * 0.36} fill={c.wool} />
      {/* ear */}
      <ellipse cx={cx + r * 0.32} cy={cy - r * 0.5} rx={r * 0.16} ry={r * 0.3} fill={c.face} transform={`rotate(32 ${cx + r * 0.32} ${cy - r * 0.5})`} />
      {/* face (looking right) */}
      <ellipse cx={cx + r * 0.52} cy={cy + r * 0.05} rx={r * 0.5} ry={r * 0.56} fill={c.face} transform={`rotate(14 ${cx + r * 0.52} ${cy + r * 0.05})`} />
      {/* snout */}
      <circle cx={cx + r * 0.92} cy={cy + r * 0.22} r={r * 0.14} fill={c.face} />
      <circle cx={cx + r * 0.6} cy={cy - r * 0.08} r={r * 0.1} fill={c.eye} />
    </g>
  );
}

const SHEEP = { faceted: sFaceted, fluffy: sFluffy, minimal: sMinimal, profile: sProfile };

/* ---- helm wheel + chosen sheep. cfg: {tileBg, ring, ringW, spokes, stroke, hub, sheep, sheepColors} ---- */
function HelmIcon2({ cfg }) {
  const { ring, ringW = 4.5, spokes = 6, stroke = false, hub, sheep = 'faceted', sheepColors } = cfg;
  const handles = [];
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2 - Math.PI / 2;
    const x1 = 32 + Math.cos(a) * 18, y1 = 32 + Math.sin(a) * 18;
    const x2 = 32 + Math.cos(a) * 30, y2 = 32 + Math.sin(a) * 30;
    handles.push(<line key={'l' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ring} strokeWidth={ringW} strokeLinecap="round" />);
    handles.push(<circle key={'c' + i} cx={x2} cy={y2} r={ringW * 0.82} fill={ring} />);
  }
  const Sheep = SHEEP[sheep];
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Helmsheep icon">
      {handles}
      {stroke
        ? <><circle cx="32" cy="32" r="20" fill="none" stroke={ring} strokeWidth={ringW} />{hub && <circle cx="32" cy="32" r="14.5" fill={hub} />}</>
        : <><circle cx="32" cy="32" r="21" fill={ring} /><circle cx="32" cy="32" r="15.5" fill={hub} /></>}
      {Sheep(32, 32, 10, sheepColors)}
    </svg>
  );
}

function WordmarkL({ accent, ink = PAL3.ink }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 25, letterSpacing: '-0.01em', color: ink, whiteSpace: 'nowrap' }}>Shippy Sheep</span>
      <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '0.34em', textTransform: 'uppercase', color: accent, marginTop: 5 }}>Studio</span>
    </span>
  );
}

Object.assign(window, { HelmIcon2, SHEEP, WordmarkL, PAL3 });
