/* app.jsx — assembly, theme/tweak wiring, reveal observer */

const FONT_OPTIONS = {
  'Fredoka': "'Fredoka', system-ui, sans-serif",
  'Baloo 2': "'Baloo 2', system-ui, sans-serif",
  'Space Grotesk': "'Space Grotesk', system-ui, sans-serif",
  'Bricolage Grotesque': "'Bricolage Grotesque', system-ui, sans-serif",
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "pasture",
  "hero": "split",
  "primary": "",
  "font": "Fredoka",
  "density": "regular",
  "flock": "calm"
}/*EDITMODE-END*/;

function useReveal(deps) {
  React.useEffect(() => {
    const show = (el) => { el.style.opacity = '1'; el.style.transform = 'none'; el.dataset.shown = '1'; };
    const sweep = () => {
      const vh = window.innerHeight || 800;
      document.querySelectorAll('.reveal:not([data-shown])').forEach(el => {
        if (el.getBoundingClientRect().top < vh * 0.92) show(el);
      });
    };
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      document.querySelectorAll('.reveal:not([data-shown])').forEach(el => io.observe(el));
    }
    sweep();
    const mo = new MutationObserver(() => {
      if (io) document.querySelectorAll('.reveal:not([data-shown])').forEach(el => io.observe(el));
      sweep();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);
    return () => { if (io) io.disconnect(); mo.disconnect(); window.removeEventListener('scroll', sweep); window.removeEventListener('resize', sweep); };
  }, deps);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply theme synchronously so low-poly scene reads fresh CSS vars on render
  const root = document.documentElement;
  root.setAttribute('data-direction', t.direction);
  root.setAttribute('data-density', t.density);
  root.style.setProperty('--font-display', FONT_OPTIONS[t.font] || FONT_OPTIONS['Fredoka']);
  const prim = (t.primary && String(t.primary).startsWith('#')) ? t.primary : null;
  if (prim) root.style.setProperty('--primary', prim); else root.style.removeProperty('--primary');

  useReveal([t.direction, t.hero, t.density, t.primary, t.font]);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const goContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
  };

  const flockCount = { off: 0, calm: 16, lots: 28 }[t.flock] ?? 16;

  return (
    <div key={t.direction + t.hero} style={{ position: 'relative' }}>
      <GlobalFlock count={flockCount} />
      <Nav onContact={goContact} direction={t.direction} />
      <main>
        <Hero heroStyle={t.hero} direction={t.direction} onContact={goContact} />
        <Services />
        <Portfolio />
        <Stats />
        <Mission />
        <Team />
        <Journal />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Visual direction" />
        <TweakSelect label="Whole look" value={t.direction}
          options={[{ value: 'pasture', label: 'Pasture · sunny day' }, { value: 'nightfall', label: 'Nightfall · dark glow' }, { value: 'paper', label: 'Wool & Paper · cozy' }]}
          onChange={(v) => setTweak('direction', v)} />
        <TweakSelect label="Hero style" value={t.hero}
          options={[{ value: 'split', label: 'Scene split' }, { value: 'stage', label: 'Full stage' }, { value: 'showcase', label: 'Image showcase' }]}
          onChange={(v) => setTweak('hero', v)} />

        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.primary}
          options={['#2f9ee0', '#4fbf6a', '#ff7a5c', '#8a6cff']}
          onChange={(v) => setTweak('primary', v)} />
        <TweakButton label="Reset accent to theme" secondary onClick={() => setTweak('primary', '')} />

        <TweakSection label="Type & spacing" />
        <TweakSelect label="Display font" value={t.font}
          options={Object.keys(FONT_OPTIONS).map(f => ({ value: f, label: f }))}
          onChange={(v) => setTweak('font', v)} />
        <TweakRadio label="Density" value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Flock" />
        <TweakRadio label="Floating sheep" value={t.flock}
          options={['off', 'calm', 'lots']}
          onChange={(v) => setTweak('flock', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
