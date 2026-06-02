/* sections4.jsx — Journal teaser + Contact + Footer */

function Journal() {
  const posts = [
    { tag: 'Devlog', t: 'Why our sheep have exactly 14 faces', d: 'A short note on the poly budget behind our mascot — and why low-poly is a feature, not a limitation.' },
    { tag: 'Studio', t: 'How we keep a digital twin at 60fps', d: 'The performance rules we hold every real-time build to, from draw calls to data streaming.' },
    { tag: 'Release', t: 'Sheepfold Saga enters playtest', d: 'Our signature title opens its pasture gates to a first wave of testers this season.' },
  ];
  return (
    <section className="section-pad journal-sec" id="journal">
      <div className="wrap">
        <div className="sec-head row">
          <div>
            <span className="eyebrow reveal">Journal</span>
            <h2 className="h2 reveal d1">Studio notes &amp;<br />devlogs, soon.</h2>
          </div>
          <p className="lead reveal d2">The journal is where the team will post devlogs, release news, and promos. Here’s the shape of what’s coming — your team fills these in.</p>
        </div>
        <div className="journal-grid">
          {posts.map((p, i) => (
            <article className={'card card-hover journal-card reveal d' + ((i % 3) + 1)} key={p.t}>
              <span className="chip">{p.tag}</span>
              <h3 className="h3">{p.t}</h3>
              <p className="muted">{p.d}</p>
              <span className="journal-soon">Coming soon</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', company: '', type: '', budget: '', message: '' });
  const [touched, setTouched] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched(t => ({ ...t, [k]: true }));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const errors = {
    name: !form.name.trim() ? 'Tell us who you are' : '',
    email: !form.email.trim() ? 'We need an address to reply' : (!emailOk ? 'That email looks off' : ''),
    message: !form.message.trim() ? 'A sentence or two helps' : '',
  };
  const valid = !errors.name && !errors.email && !errors.message;
  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!valid) return;
    // Mock send — wire this to your inbox / form service later.
    setSent(true);
  };
  const types = ['Original game', 'Digital twin', 'VR / AR simulation', 'Interactive 3D', 'Not sure yet'];
  const budgets = ['Under €25k', '€25k–75k', '€75k–200k', '€200k+', 'Let’s talk'];

  return (
    <section className="section-pad contact-sec" id="contact">
      <div className="wrap">
        <div className="contact-plate">
          <div className="contact-left">
            <span className="eyebrow reveal" style={{ color: 'var(--c3)' }}>Start a project</span>
            <h2 className="h2 reveal d1">Tell us about<br />your world.</h2>
            <p className="lead reveal d2">Send a few details and we’ll get back within two working days to set up a call. No pitch deck required.</p>
            <ul className="contact-meta reveal d3">
              <li><i data-lucide="mail"></i> hello@shippysheep.studio</li>
              <li><i data-lucide="clock"></i> Mon–Fri · 9:00–18:00</li>
              <li><i data-lucide="map-pin"></i> Remote-first · EU hours</li>
            </ul>
            <div className="contact-blob"><FacetSheep color="sky" size={180} /></div>
          </div>

          <div className="contact-right">
            {sent ? (
              <div className="contact-done">
                <div className="contact-done-mark"><ShippyMark size={64} /></div>
                <h3 className="h3">Message received 🎉</h3>
                <p className="muted">Thanks, {form.name.split(' ')[0] || 'friend'} — your note is on its way to the flock. We’ll reply to <b>{form.email}</b> within two working days.</p>
                <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', type: '', budget: '', message: '' }); setTouched({}); }}>Send another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <div className="field-row">
                  <Field label="Your name" req error={touched.name && errors.name}>
                    <input value={form.name} onChange={set('name')} onBlur={blur('name')} placeholder="Jamie Shepherd" autoComplete="name" />
                  </Field>
                  <Field label="Email" req error={touched.email && errors.email}>
                    <input type="email" value={form.email} onChange={set('email')} onBlur={blur('email')} placeholder="jamie@studio.com" autoComplete="email" />
                  </Field>
                </div>
                <Field label="Company (optional)">
                  <input value={form.company} onChange={set('company')} placeholder="Your studio or company" autoComplete="organization" />
                </Field>
                <div className="field-row">
                  <Field label="Project type">
                    <select value={form.type} onChange={set('type')}>
                      <option value="">Pick one…</option>
                      {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget">
                    <select value={form.budget} onChange={set('budget')}>
                      <option value="">Pick one…</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="What are you building?" req error={touched.message && errors.message}>
                  <textarea rows="4" value={form.message} onChange={set('message')} onBlur={blur('message')} placeholder="A sentence or two about the world you want to build…"></textarea>
                </Field>
                <button className="btn btn-primary contact-submit" type="submit">Send to the flock <span className="arr">→</span></button>
                <p className="contact-fine muted">We reply within two working days. No spam, no newsletters unless you ask.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, req, error, children }) {
  return (
    <label className={'field' + (error ? ' field-err' : '')}>
      <span className="field-label">{label}{req && <i className="req">*</i>}</span>
      {children}
      {error && <span className="field-msg">{error}</span>}
    </label>
  );
}

function Footer() {
  const cols = [
    ['Studio', [['Work', '#work'], ['What we do', '#services'], ['Team', '#team'], ['Journal', '#journal']]],
    ['Connect', [['Start a project', '#contact'], ['hello@shippysheep.studio', '#contact'], ['Press kit', '#'], ['Careers', '#']]],
  ];
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a href="#top" className="brand brand-foot"><span className="brand-mark"><ShippyMark size={42} dark /></span>
            <span className="brand-name">Shippy&nbsp;Sheep<span className="brand-sub">studio</span></span></a>
          <p className="footer-tag">We build low-poly worlds that actually run — games, digital twins, and VR simulations.</p>
        </div>
        {cols.map(([h, links]) => (
          <nav className="footer-col" key={h} aria-label={h}>
            <span className="footer-h">{h}</span>
            {links.map(([l, href]) => <a key={l} href={href}>{l}</a>)}
          </nav>
        ))}
      </div>
      <div className="footer-bar"><FacetBand color={getCSS('--c1')} height={8} /></div>
      <div className="wrap footer-legal">
        <span>© {new Date().getFullYear()} Shippy Sheep Studio. Made with wool and frame-rate.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Journal, Contact, Field, Footer });
