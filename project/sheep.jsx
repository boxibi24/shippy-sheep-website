/* sheep.jsx — Shippy Sheep mark + multi-view faceted sheep + roaming flock */

const SHEEP_COLORS = {
  white: { wool: '#ffffff', shade: '#dbe6ef', face: '#1f4e79', eye: '#ffffff' },
  sky:   { wool: '#c6e6fb', shade: '#7cc1ee', face: '#2f9ee0', eye: '#ffffff' },
  grass: { wool: '#cbeccf', shade: '#8ed79a', face: '#3da85c', eye: '#ffffff' },
  sun:   { wool: '#ffe7ad', shade: '#ffd166', face: '#e0a32a', eye: '#ffffff' },
  coral: { wool: '#ffd4c8', shade: '#ffa28c', face: '#ff7a5c', eye: '#ffffff' },
  plum:  { wool: '#e0d6ff', shade: '#b39bff', face: '#8a6cff', eye: '#ffffff' },
  navy:  { wool: '#1f4e79', shade: '#3a6da0', face: '#0f2c49', eye: '#ffffff' },
};
const SHEEP_KEYS = ['sky', 'grass', 'sun', 'coral', 'plum', 'white'];

/* faceted sheep head (the brand sheep) centered at cx,cy */
function sheepPolys(cx, cy, r, c) {
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

/* the faceted sheep head — the single sheep shape used everywhere. */
function FacetSheep({ color = 'white', size = 64, style, className }) {
  const c = typeof color === 'string' ? (SHEEP_COLORS[color] || SHEEP_COLORS.white) : color;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} className={className} aria-hidden="true">
      {sheepPolys(32, 32, 25, c)}
    </svg>
  );
}

/* final brand mark — ship's wheel (helm) + faceted sheep hub */
function ShippyMark({ size = 40, dark = false }) {
  const ring = dark ? '#ffffff' : '#1f4e79';
  const sc = dark
    ? { wool: '#ffffff', shade: '#cfe0ee', face: '#1f4e79', eye: '#ffffff' }
    : { wool: '#1f4e79', shade: '#3a6da0', face: '#0f2c49', eye: '#ffffff' };
  const handles = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const x1 = 32 + Math.cos(a) * 18, y1 = 32 + Math.sin(a) * 18;
    const x2 = 32 + Math.cos(a) * 30, y2 = 32 + Math.sin(a) * 30;
    handles.push(<line key={'l' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ring} strokeWidth="4.2" strokeLinecap="round" />);
    handles.push(<circle key={'k' + i} cx={x2} cy={y2} r="3.4" fill={ring} />);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Shippy Sheep Studio">
      {handles}
      <circle cx="32" cy="32" r="20" fill="none" stroke={ring} strokeWidth="4.2" />
      {sheepPolys(32, 32, 10, sc)}
    </svg>
  );
}

/* ---- background flock: faceted heads scattered around the page,
   each with a gentle CSS float/bounce. ---- */
function GlobalFlock({ count = 16, seed = 7 }) {
  const sheep = React.useMemo(() => {
    if (!count) return [];
    const rnd = window.mulberry32 ? window.mulberry32(seed) : Math.random;
    const r = () => rnd();
    const anims = ['sheepFloatA', 'sheepFloatB', 'sheepFloatC'];
    const list = [];
    for (let i = 0; i < count; i++) {
      const a = r(), b = r(), cc = r(), d = r(), e = r();
      const side = a < 0.5;
      const left = side ? cc * 24 : 76 + cc * 22;          // hug the side gutters
      const top = (i + 0.5) / count * 100 + (b - 0.5) * (80 / count);
      list.push({
        i, left, top,
        size: 32 + d * 38,
        color: SHEEP_KEYS[i % SHEEP_KEYS.length],
        op: 0.5 + e * 0.42,
        anim: anims[i % 3],
        dur: 4.5 + r() * 5,
        delay: -(r() * 8),
        rot: (b - 0.5) * 14,
      });
    }
    return list;
  }, [count, seed]);

  if (!count) return null;
  return (
    <div className="flock" aria-hidden="true">
      {sheep.map(s => (
        <div key={s.i} className="flock-sheep" style={{
          left: s.left + '%', top: s.top + '%', width: s.size, height: s.size, opacity: s.op,
          '--rot': s.rot.toFixed(1) + 'deg',
          animation: `${s.anim} ${s.dur.toFixed(2)}s ease-in-out ${s.delay.toFixed(2)}s infinite`,
        }}>
          <FacetSheep color={s.color} size={s.size} />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { SHEEP_COLORS, SHEEP_KEYS, FacetSheep, ShippyMark, GlobalFlock, sheepPolys });
