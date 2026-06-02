/* sections3.jsx — Experience/Stats + Mission + Team */

function Stats() {
  const stats = [
    { n: '1993', l: 'first pixel pushed', sub: 'studio roots' },
    { n: '1500+', l: 'real-time builds', sub: 'games · twins · sims' },
    { n: '22', l: 'people in the flock', sub: 'artists & engineers' },
    { n: '4', l: 'target platforms', sub: 'PC · console · web · XR' },
  ];
  return (
    <section className="stats-sec" id="experience">
      <div className="stats-band-top"><FacetBand color={getCSS('--bg-tint')} flip height={70} /></div>
      <div className="stats-inner">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow reveal">By the numbers</span>
            <h2 className="h2 reveal d1">Years of real-time craft,<br />counted in shipped frames.</h2>
          </div>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className={'stat reveal d' + ((i % 4) + 1)} key={s.l}>
                <b className="stat-n grad-text">{s.n}</b>
                <span className="stat-l">{s.l}</span>
                <span className="stat-sub muted">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const points = [
    { t: 'Playful, not childish', d: 'Stylized worlds win on charm and clarity. We keep things friendly without ever cutting engineering corners.' },
    { t: 'Real hardware, real frames', d: 'A beautiful build that stutters is a prototype. We ship things that hold frame-rate where they actually run.' },
    { t: 'Small flock, tight loop', d: 'You talk to the people making it. Fewer hand-offs, faster iteration, fewer surprises.' },
  ];
  return (
    <section className="section-pad mission-sec" id="studio">
      <div className="wrap mission-grid">
        <div className="mission-lead">
          <span className="eyebrow reveal">Our mission</span>
          <h2 className="h2 reveal d1">Make real-time 3D feel<br /><span className="grad-text">handmade and human.</span></h2>
          <p className="lead reveal d2">Big engines can feel cold. We treat every world — a game level, a factory twin, a training sim — like a tiny handcrafted toy you want to pick up and turn over. That care is the whole point of the studio.</p>
          <div className="mission-blob reveal d3"><FacetSheep color="plum" size={216} /></div>
        </div>
        <div className="mission-points">
          {points.map((p, i) => (
            <div className={'mission-point reveal d' + ((i % 3) + 1)} key={p.t}>
              <span className="mp-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="h3">{p.t}</h3>
                <p className="muted">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const people = [
    { id: 'team-1', n: 'Mira Vos', r: 'Founder · Creative Director', c: ['var(--c1)', 'var(--c3)'] },
    { id: 'team-2', n: 'Theo Lund', r: 'Lead Engine Engineer', c: ['var(--c2)', 'var(--c5)'] },
    { id: 'team-3', n: 'Ines Park', r: 'Art Director', c: ['var(--c4)', 'var(--c3)'] },
    { id: 'team-4', n: 'Kwame Adu', r: 'Technical Artist', c: ['var(--c5)', 'var(--c1)'] },
    { id: 'team-5', n: 'Sara Bianchi', r: 'Producer', c: ['var(--c3)', 'var(--c2)'] },
  ];
  return (
    <section className="section-pad team-sec" id="team">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow reveal">The flock</span>
          <h2 className="h2 reveal d1">A small studio of<br />artists and engineers.</h2>
          <p className="lead reveal d2">No anonymous “resources.” You work directly with the people building your world. Drop in real headshots whenever you like.</p>
        </div>
        <div className="team-grid">
          {people.map((p, i) => (
            <div className={'team-card reveal d' + ((i % 4) + 1)} key={p.id}>
              <div className="team-ava">
                <div className="team-ava-ring"><FacetSheep color={['sky', 'grass', 'sun', 'coral', 'plum'][i % 5]} size={46} /></div>
                <image-slot id={p.id} style={{ width: '108px', height: '108px', display: 'block' }} shape="circle" placeholder="photo"></image-slot>
              </div>
              <b className="team-name">{p.n}</b>
              <span className="team-role muted">{p.r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getCSS(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#cccccc';
}

Object.assign(window, { Stats, Mission, Team, getCSS });
