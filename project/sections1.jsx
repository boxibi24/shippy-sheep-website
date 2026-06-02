/* sections1.jsx — Nav + Hero */

function Nav({ onContact, direction }) {
  const [solid, setSolid] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['Work', '#work'], ['Studio', '#studio'], ['What we do', '#services'], ['Team', '#team'], ['Journal', '#journal']];
  return (
    <header className={'nav' + (solid ? ' nav-solid' : '')}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand" aria-label="Shippy Sheep Studio — home">
          <span className="brand-mark"><ShippyMark size={40} dark={direction === 'nightfall'} /></span>
          <span className="brand-name">Shippy&nbsp;Sheep<span className="brand-sub">studio</span></span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-primary nav-btn" onClick={onContact}>Start a project <span className="arr">→</span></button>
          <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-drawer">
          {links.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          <button className="btn btn-primary" onClick={() => { setOpen(false); onContact(); }}>Start a project →</button>
        </div>
      )}
    </header>
  );
}

function Hero({ heroStyle, direction, onContact }) {
  const stats = [['1500+', 'builds shipped'], ['12', 'years in real-time 3D'], ['4', 'platforms']];
  const headline = (
    <h1 className="h-display hero-h1">
      We build <span className="grad-text">low-poly worlds</span><br />that actually run.
    </h1>
  );
  const lead = (
    <p className="lead hero-lead">
      Shippy Sheep is a game &amp; real-time 3D studio. We craft original games, living digital twins, and VR simulations — stylized, friendly, and engineered to perform on real hardware.
    </p>
  );
  const ctas = (
    <div className="hero-ctas">
      <button className="btn btn-primary" onClick={onContact}>Start a project <span className="arr">→</span></button>
      <a className="btn btn-ghost" href="#work">See the flock’s work</a>
    </div>
  );

  if (heroStyle === 'stage') {
    return (
      <section className="hero hero-stage" id="top">
        <div className="hero-stage-bg"><LowPolyScene direction={direction} variant="scene" /></div>
        <div className="hero-stage-scrim" />
        <div className="wrap hero-stage-inner">
          <span className="eyebrow reveal in" style={{ color: '#fff' }}>Game &amp; Real-time 3D Studio</span>
          <div className="reveal in d1">{headline}</div>
          <div className="reveal in d2">{lead}</div>
          <div className="reveal in d3">{ctas}</div>
        </div>
      </section>
    );
  }

  if (heroStyle === 'showcase') {
    return (
      <section className="hero hero-showcase" id="top">
        <div className="wrap">
          <span className="eyebrow reveal in">Game &amp; Real-time 3D Studio</span>
          <div className="reveal in d1">{headline}</div>
          <div className="hero-showcase-grid">
            <div className="reveal in d2">{lead}{ctas}
              <div className="hero-mini-stats">
                {stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
              </div>
            </div>
            <div className="hero-showcase-media reveal in d3">
              <image-slot id="hero-showcase" style={{ width: '100%', height: '100%', display: 'block' }} shape="rounded" radius="28" placeholder="Drop your hero render / gameplay still"></image-slot>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // default: split scene
  return (
    <section className="hero hero-split" id="top">
      <div className="wrap hero-split-grid">
        <div className="hero-copy">
          <span className="eyebrow reveal in">Game &amp; Real-time 3D Studio</span>
          <div className="reveal in d1">{headline}</div>
          <div className="reveal in d2">{lead}</div>
          <div className="reveal in d3">{ctas}</div>
          <div className="hero-mini-stats reveal in d4">
            {stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
        </div>
        <div className="hero-media reveal in d2">
          <div className="hero-frame">
            <LowPolyScene direction={direction} variant="scene" />
            <div className="hero-frame-badge"><span className="dot" /> built in-engine</div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero });
