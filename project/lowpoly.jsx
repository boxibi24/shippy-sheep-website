/* lowpoly.jsx — procedural low-poly geometry: scene, bands, sheep mark, facets */

/* ---------- color helpers ---------- */
function _hex(c){ c=c.replace('#',''); if(c.length===3)c=c.split('').map(x=>x+x).join(''); return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]; }
function _toHex(r,g,b){ const h=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0'); return '#'+h(r)+h(g)+h(b); }
function lerpColor(a,b,t){ const A=_hex(a),B=_hex(b); return _toHex(A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t); }
function shade(c,amt){ const A=_hex(c); return _toHex(A[0]+255*amt, A[1]+255*amt, A[2]+255*amt); }

/* deterministic pseudo-random so SSR/hydration & re-render stay stable per seed */
function mulberry32(seed){ return function(){ let t=seed+=0x6D2B79F5; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }

/* ---------- generic rectangular low-poly mesh ---------- */
function meshTriangles(W,H,cols,rows,jitter,seed){
  const rnd=mulberry32(seed);
  const pts=[];
  for(let r=0;r<=rows;r++){
    pts[r]=[];
    for(let c=0;c<=cols;c++){
      const edgeX = c===0||c===cols, edgeY = r===0||r===rows;
      const jx = edgeX?0:(rnd()-.5)*jitter*(W/cols);
      const jy = edgeY?0:(rnd()-.5)*jitter*(H/rows);
      pts[r][c]={x:(c/cols)*W+jx, y:(r/rows)*H+jy};
    }
  }
  const tris=[];
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
    const a=pts[r][c],b=pts[r][c+1],d=pts[r+1][c],e=pts[r+1][c+1];
    tris.push({p:[a,b,e], cy:(a.y+b.y+e.y)/3});
    tris.push({p:[a,e,d], cy:(a.y+e.y+d.y)/3});
  }
  return tris;
}

/* ---------- HERO: a full low-poly landscape (sky + sun + layered hills + sheep) ---------- */
function LowPolyScene({ direction, variant }) {
  const v = getComputedStyle(document.documentElement);
  const skyTop = v.getPropertyValue('--sky-top').trim() || '#9ed8ff';
  const skyBot = v.getPropertyValue('--sky-bot').trim() || '#e8f7ff';
  const hillBack = v.getPropertyValue('--hill-back').trim() || '#9fd6a4';
  const hillMid = v.getPropertyValue('--hill-mid').trim() || '#66c478';
  const hillFront = v.getPropertyValue('--hill-front').trim() || '#3da85c';
  const sunC = v.getPropertyValue('--sun').trim() || '#ffd24a';

  const W = 1000, H = 760;
  const rnd = mulberry32(variant === 'facets' ? 99 : 7);

  // SKY mesh
  const sky = meshTriangles(W, H * 0.72, 9, 6, 0.55, 11).map((t, i) => {
    const tt = t.cy / (H * 0.72);
    let col = lerpColor(skyTop, skyBot, tt);
    col = shade(col, (rnd() - 0.5) * 0.05);
    return { pts: t.p.map(pt => [pt.x, pt.y]), fill: col };
  });

  // SUN (low-poly disc)
  const sunCx = W * (variant === 'facets' ? 0.5 : 0.74), sunCy = H * 0.2, sunR = 88;
  const sunSides = 11, sunPts = [];
  for (let i = 0; i < sunSides; i++) {
    const a = (i / sunSides) * Math.PI * 2 - Math.PI / 2;
    const rr = sunR * (0.9 + rnd() * 0.18);
    sunPts.push([sunCx + Math.cos(a) * rr, sunCy + Math.sin(a) * rr]);
  }
  const sunTris = [];
  for (let i = 0; i < sunSides; i++) {
    sunTris.push({ pts: [[sunCx, sunCy], sunPts[i], sunPts[(i + 1) % sunSides]], fill: shade(sunC, (i % 2 ? 0.04 : -0.03)) });
  }

  // a ridge generator -> faceted band
  function hillBand(baseY, amp, segments, color, seed, rows = 2, bottom = H) {
    const r = mulberry32(seed);
    const ridge = [];
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * W;
      const y = baseY + Math.sin(i * 1.3 + seed) * amp * (0.5 + r() * 0.7) - r() * amp * 0.4;
      ridge.push({ x, y });
    }
    const tris = [];
    for (let i = 0; i < segments; i++) {
      const x0 = ridge[i].x, x1 = ridge[i + 1].x;
      const yTop0 = ridge[i].y, yTop1 = ridge[i + 1].y;
      for (let rr = 0; rr < rows; rr++) {
        const ya0 = yTop0 + (bottom - yTop0) * (rr / rows);
        const ya1 = yTop1 + (bottom - yTop1) * (rr / rows);
        const yb0 = yTop0 + (bottom - yTop0) * ((rr + 1) / rows);
        const yb1 = yTop1 + (bottom - yTop1) * ((rr + 1) / rows);
        const f0 = shade(color, (r() - 0.5) * 0.10 + (rr * -0.02));
        const f1 = shade(color, (r() - 0.5) * 0.10 + (rr * -0.02));
        tris.push({ pts: [[x0, ya0], [x1, ya1], [x1, yb1]], fill: f0 });
        tris.push({ pts: [[x0, ya0], [x1, yb1], [x0, yb0]], fill: f1 });
      }
    }
    return tris;
  }

  const backHills = hillBand(H * 0.50, 46, 7, hillBack, 3, 1);
  const midHills = hillBand(H * 0.60, 60, 8, hillMid, 17, 2);
  const frontHills = hillBand(H * 0.72, 70, 9, hillFront, 29, 2);

  const tri = (t, i) => <polygon key={i} points={t.pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')} fill={t.fill} />;

  return (
    <div className="lowpoly" style={{ width: '100%', height: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" role="img" aria-label="Stylized low-poly landscape">
        {direction === 'nightfall' && (
          <defs>
            <filter id="sceneGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        )}
        {sky.map(tri)}
        <g filter={direction === 'nightfall' ? 'url(#sceneGlow)' : undefined}>{sunTris.map(tri)}</g>
        {backHills.map(tri)}
        {midHills.map(tri)}
        {frontHills.map(tri)}
        {/* a little flock of low-poly sheep on the front hill */}
        <FlockSheep W={W} H={H} direction={direction} />
      </svg>
    </div>
  );
}

/* tiny faceted sheep that sit on the hill */
function FlockSheep({ W, H, direction }) {
  const spots = [
    { x: W * 0.22, y: H * 0.80, s: 1.15 },
    { x: W * 0.50, y: H * 0.86, s: 1.5 },
    { x: W * 0.78, y: H * 0.81, s: 1.0 },
  ];
  const wool = direction === 'nightfall' ? '#f3f0ff' : '#ffffff';
  const woolShade = direction === 'nightfall' ? '#cdc6f0' : '#dfe7ee';
  const face = direction === 'nightfall' ? '#2a2f72' : '#3a4a5c';
  return spots.map((sp, i) => (
    <g key={i} transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`} style={{ transformOrigin: 'center', animation: `bob ${3 + i * 0.6}s var(--ease) ${i * 0.3}s infinite` }}>
      {/* legs */}
      <rect x="-12" y="6" width="5" height="14" rx="2" fill={face} />
      <rect x="7" y="6" width="5" height="14" rx="2" fill={face} />
      {/* faceted wool body */}
      <polygon points="-20,-4 -4,-16 0,2" fill={wool} />
      <polygon points="-4,-16 12,-14 0,2" fill={woolShade} />
      <polygon points="12,-14 22,0 0,2" fill={wool} />
      <polygon points="-20,-4 0,2 -8,10" fill={woolShade} />
      <polygon points="0,2 22,0 14,10" fill={wool} />
      <polygon points="-8,10 0,2 14,10" fill={woolShade} />
      {/* head */}
      <polygon points="16,-12 30,-12 23,2" fill={face} />
      <polygon points="14,-14 20,-18 22,-10" fill={face} />
      <circle cx="25" cy="-6" r="1.6" fill={wool} />
    </g>
  ));
}

/* ---------- decorative faceted band for section tops/bottoms ---------- */
function FacetBand({ color, flip, height = 90 }) {
  const W = 1000, H = height;
  const r = mulberry32(color.length * 13 + (flip ? 5 : 0));
  const seg = 10, pts = [];
  for (let i = 0; i <= seg; i++) pts.push({ x: (i / seg) * W, y: H * 0.5 + (r() - 0.5) * H * 0.8 });
  const tris = [];
  for (let i = 0; i < seg; i++) {
    const top = flip ? 0 : H, ya = pts[i].y, yb = pts[i + 1].y;
    tris.push({ p: [[pts[i].x, ya], [pts[i + 1].x, yb], [pts[i + 1].x, top]], f: shade(color, (r() - 0.5) * 0.08) });
    tris.push({ p: [[pts[i].x, ya], [pts[i + 1].x, top], [pts[i].x, top]], f: shade(color, (r() - 0.5) * 0.08) });
  }
  return (
    <div className="lowpoly" style={{ width: '100%', height, lineHeight: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {tris.map((t, i) => <polygon key={i} points={t.p.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')} fill={t.f} />)}
      </svg>
    </div>
  );
}

/* ---------- faceted decorative blob (behind cards / accents) ---------- */
function FacetBlob({ colors, size = 320, seed = 3, style }) {
  const cx = size / 2, cy = size / 2, sides = 9, R = size * 0.46;
  const r = mulberry32(seed);
  const outer = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2;
    const rr = R * (0.8 + r() * 0.35);
    outer.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  const tris = [];
  for (let i = 0; i < sides; i++) {
    tris.push({ p: [[cx, cy], outer[i], outer[(i + 1) % sides]], f: colors[i % colors.length] });
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style} aria-hidden="true">
      {tris.map((t, i) => <polygon key={i} points={t.p.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')} fill={t.f} opacity={0.9} />)}
    </svg>
  );
}

/* ---------- SHEEP MARK (logo placeholder) ---------- */
function SheepMark({ size = 40, mono }) {
  const wool = mono || '#ffffff';
  const woolShade = mono ? 'color-mix(in srgb, ' + mono + ' 78%, #000)' : '#e3ecf3';
  const face = mono ? 'color-mix(in srgb, ' + mono + ' 55%, #000)' : 'var(--c1)';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Shippy Sheep Studio" role="img">
      {/* faceted wool head */}
      <polygon points="14,22 26,10 32,26" fill={wool} />
      <polygon points="26,10 42,12 32,26" fill={woolShade} />
      <polygon points="42,12 52,24 32,26" fill={wool} />
      <polygon points="14,22 32,26 16,38" fill={woolShade} />
      <polygon points="52,24 32,26 50,38" fill={woolShade} />
      <polygon points="16,38 32,26 32,46" fill={wool} />
      <polygon points="50,38 32,26 32,46" fill={woolShade} />
      <polygon points="16,38 32,46 24,50" fill={woolShade} />
      <polygon points="50,38 32,46 40,50" fill={wool} />
      {/* face */}
      <polygon points="26,28 38,28 32,42" fill={face} />
      <circle cx="29" cy="32" r="1.8" fill={wool} />
      <circle cx="35" cy="32" r="1.8" fill={wool} />
    </svg>
  );
}

Object.assign(window, { LowPolyScene, FacetBand, FacetBlob, SheepMark, lerpColor, shade, mulberry32 });
