/* logos.jsx — six low-poly logo concepts for Shippy Sheep Studio (sheep + sailing ship) */

const PAL = {
  ink: '#182b3d', sky: '#2f9ee0', grass: '#4fbf6a', sun: '#ffc23d',
  coral: '#ff7a5c', plum: '#8a6cff', navy: '#1f4e79', wool: '#ffffff', shade: '#dbe6ef',
};

/* tiny faceted sheep face used inside several marks */
function sheepFace(cx, cy, r, wool, shade, face) {
  return (
    <g>
      <polygon points={`${cx - r},${cy - r * 0.2} ${cx - r * 0.4},${cy - r} ${cx},${cy - r * 0.1}`} fill={wool} />
      <polygon points={`${cx - r * 0.4},${cy - r} ${cx + r * 0.4},${cy - r} ${cx},${cy - r * 0.1}`} fill={shade} />
      <polygon points={`${cx + r * 0.4},${cy - r} ${cx + r},${cy - r * 0.2} ${cx},${cy - r * 0.1}`} fill={wool} />
      <polygon points={`${cx - r},${cy - r * 0.2} ${cx},${cy - r * 0.1} ${cx - r * 0.5},${cy + r * 0.7}`} fill={shade} />
      <polygon points={`${cx + r},${cy - r * 0.2} ${cx},${cy - r * 0.1} ${cx + r * 0.5},${cy + r * 0.7}`} fill={shade} />
      <polygon points={`${cx - r * 0.5},${cy + r * 0.7} ${cx},${cy - r * 0.1} ${cx + r * 0.5},${cy + r * 0.7}`} fill={wool} />
      <polygon points={`${cx - r * 0.55},${cy} ${cx + r * 0.55},${cy} ${cx},${cy + r * 0.9}`} fill={face} />
      <circle cx={cx - r * 0.22} cy={cy + r * 0.18} r={r * 0.1} fill={wool} />
      <circle cx={cx + r * 0.22} cy={cy + r * 0.18} r={r * 0.1} fill={wool} />
    </g>
  );
}

/* ---------- A · Helmsheep — ship's wheel with a sheep face hub ---------- */
function MarkHelm({ onDark }) {
  const ring = onDark ? '#ffffff' : PAL.navy;
  const handles = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x1 = 32 + Math.cos(a) * 20, y1 = 32 + Math.sin(a) * 20;
    const x2 = 32 + Math.cos(a) * 29, y2 = 32 + Math.sin(a) * 29;
    handles.push(<line key={'l' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ring} strokeWidth="4" strokeLinecap="round" />);
    handles.push(<circle key={'c' + i} cx={x2} cy={y2} r="3.4" fill={ring} />);
  }
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Helmsheep mark">
      {handles}
      <circle cx="32" cy="32" r="20" fill="none" stroke={ring} strokeWidth="4" />
      <circle cx="32" cy="32" r="14.5" fill={onDark ? '#0c1030' : '#eaf4fb'} />
      {sheepFace(32, 32, 11, '#ffffff', '#cfe0ee', PAL.ink)}
    </svg>
  );
}

/* ---------- B · Sailsheep — boat with a wool sail + sheep aboard ---------- */
function MarkSail({ onDark }) {
  const hull = PAL.coral;
  const wave = onDark ? '#3a78d8' : PAL.sky;
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Sailsheep mark">
      {/* mast */}
      <rect x="30.5" y="10" width="3" height="38" rx="1.5" fill={onDark ? '#fff' : PAL.ink} />
      {/* faceted wool sail */}
      <polygon points="33,12 33,30 50,30" fill="#ffffff" />
      <polygon points="33,30 50,30 33,42" fill="#dbe6ef" />
      <polygon points="33,12 33,30 24,30" fill="#eef4fa" />
      <polygon points="33,30 24,30 33,42" fill="#ffffff" />
      {/* pennant */}
      <polygon points="33,10 41,12.5 33,15" fill={PAL.sun} />
      {/* sheep head peeking over the deck */}
      <g transform="translate(20.5 38) scale(0.62)">
        {sheepFace(0, 0, 11, '#ffffff', '#cfe0ee', PAL.ink)}
      </g>
      {/* hull */}
      <path d="M9 44 L55 44 L48 55 Q47 57 44 57 L20 57 Q17 57 16 55 Z" fill={hull} />
      {/* water */}
      <path d="M6 60 Q14 56 22 60 T38 60 T54 60 T62 60" fill="none" stroke={wave} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- C · Woolsail — minimal twin-sail mark ---------- */
function MarkWoolsail({ onDark }) {
  const ink = onDark ? '#fff' : PAL.ink;
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Woolsail mark">
      {/* main wool sail (faceted) */}
      <polygon points="34,12 34,44 17,44" fill="#ffffff" />
      <polygon points="34,12 34,28 25,44 17,44" fill="#e7eff7" />
      <circle cx="26.5" cy="33" r="1.7" fill={PAL.ink} />
      {/* jib sail */}
      <polygon points="37,18 37,44 50,44" fill={PAL.sky} />
      {/* mast */}
      <rect x="34" y="10" width="2.6" height="36" rx="1.3" fill={ink} />
      {/* hull */}
      <path d="M12 46 L52 46 Q46 56 32 56 Q18 56 12 46 Z" fill={PAL.coral} />
      {/* waterline */}
      <line x1="9" y1="59" x2="55" y2="59" stroke={onDark ? '#3a78d8' : PAL.sky} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- D · Captain — sheep head in a sailor cap ---------- */
function MarkCaptain({ onDark }) {
  const wool = '#ffffff';
  const shade = onDark ? '#c6d3e6' : '#d7e3ee';
  const face = onDark ? '#1b2741' : PAL.ink;
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Captain sheep mark">
      {/* cap */}
      <path d="M16 26 Q16 14 32 14 Q48 14 48 26 Z" fill={PAL.navy} />
      <rect x="14" y="25" width="36" height="6" rx="3" fill="#ffffff" />
      <polygon points="20,15 28,15 24,9" fill={PAL.sun} />
      {/* ears */}
      <polygon points="13,38 6,42 15,46" fill={face} />
      <polygon points="51,38 58,42 49,46" fill={face} />
      {/* faceted wool cheeks */}
      <polygon points="14,34 26,32 22,48" fill={wool} />
      <polygon points="50,34 38,32 42,48" fill={shade} />
      {/* face */}
      <polygon points="22,33 42,33 32,52" fill={face} />
      <circle cx="27.5" cy="38" r="2" fill={wool} />
      <circle cx="36.5" cy="38" r="2" fill={wool} />
    </svg>
  );
}

/* ---------- E · Paperboat — origami boat carrying a sheep ---------- */
function MarkPaper({ onDark }) {
  const wave = onDark ? '#274a86' : '#bfe2fb';
  const wave2 = onDark ? '#1f4e79' : PAL.sky;
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Paper boat sheep mark">
      {/* sheep in the boat */}
      <g transform="translate(32 22) scale(0.7)">
        {sheepFace(0, 0, 11, '#ffffff', '#cfe0ee', PAL.ink)}
      </g>
      {/* origami boat */}
      <polygon points="10,38 54,38 46,52 18,52" fill="#ffffff" />
      <polygon points="32,38 54,38 46,52 32,52" fill="#e7eff7" />
      <polygon points="32,28 32,38 16,38" fill={PAL.sun} />
      <polygon points="32,28 32,38 48,38" fill={PAL.coral} />
      {/* waves */}
      <path d="M6 54 Q13 49 20 54 T34 54 T48 54 T62 54 L62 64 L6 64 Z" fill={wave} />
      <path d="M6 58 Q14 54 22 58 T38 58 T54 58 T62 58 L62 64 L6 64 Z" fill={wave2} />
    </svg>
  );
}

/* ---------- F · Wave — abstract sheep-wave monogram ---------- */
function MarkWave({ onDark }) {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-label="Wave monogram mark">
      <defs>
        <linearGradient id="wv1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={PAL.sky} /><stop offset="1" stopColor={PAL.plum} />
        </linearGradient>
        <linearGradient id="wv2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={PAL.coral} /><stop offset="1" stopColor={PAL.sun} />
        </linearGradient>
      </defs>
      {/* wool cloud / sail */}
      <circle cx="26" cy="20" r="9" fill="#ffffff" />
      <circle cx="36" cy="17" r="10" fill="#ffffff" />
      <circle cx="43" cy="22" r="7" fill="#ffffff" />
      <circle cx="33" cy="24" r="9" fill="#ffffff" />
      {/* waves */}
      <path d="M8 40 Q18 32 28 40 T48 40 T58 38 L58 46 Q48 54 38 46 T18 46 T8 48 Z" fill="url(#wv1)" />
      <path d="M8 50 Q18 43 28 50 T48 50 T58 48 L58 56 Q48 62 38 56 T18 56 T8 58 Z" fill="url(#wv2)" opacity="0.95" />
    </svg>
  );
}

const LOGOS = {
  helm: MarkHelm, sail: MarkSail, woolsail: MarkWoolsail,
  captain: MarkCaptain, paper: MarkPaper, wave: MarkWave,
};

/* ---------- lockup ---------- */
function Wordmark({ onDark, accent }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 26, letterSpacing: '-0.01em', color: onDark ? '#fff' : PAL.ink, whiteSpace: 'nowrap' }}>
        Shippy Sheep
      </span>
      <span style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: 11.5, letterSpacing: '0.34em', textTransform: 'uppercase', color: accent || PAL.sky, marginTop: 5 }}>
        Studio
      </span>
    </span>
  );
}

Object.assign(window, { LOGOS, Wordmark, PAL });
