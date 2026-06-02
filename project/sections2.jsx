/* sections2.jsx — Services + Portfolio */

function Services() {
  const items = [
    { icon: 'gamepad-2', t: 'Game Development', d: 'Original titles end-to-end — gameplay systems, level design, and that signature stylized feel players remember.' },
    { icon: 'box', t: 'Digital Twins', d: 'Living real-time 3D replicas of factories, sites, and machines — synced to live data so teams can see, test, and decide.' },
    { icon: 'glasses', t: 'VR / AR Simulation', d: 'Hands-on training and visualization in headset — safe to fail, cheap to repeat, measurable to improve.' },
    { icon: 'mouse-pointer-click', t: 'Real-time Interactive', d: 'Product configurators, web 3D, and interactive experiences that run smooth on the devices people actually own.' },
    { icon: 'palette', t: 'Art & Animation', d: 'Low-poly characters, props, and environments with a cohesive art bible — modelled, rigged, and ready for engine.' },
    { icon: 'wrench', t: 'Engine & Tools', d: 'Custom pipelines, editor tooling, and performance work that keep big real-time projects fast and shippable.' },
  ];
  return (
    <section className="section-pad" id="services">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow reveal">What we do</span>
          <h2 className="h2 reveal d1">One flock, the whole<br />real-time pipeline.</h2>
          <p className="lead reveal d2">From first sketch to a build that runs at frame-rate. We pick the right engine for the job and keep the craft playful all the way through.</p>
        </div>
        <div className="svc-grid">
          {items.map((it, i) => (
            <div className={'card card-hover svc-card reveal d' + ((i % 3) + 1)} key={it.t}>
              <span className="svc-icon"><i data-lucide={it.icon}></i></span>
              <h3 className="h3">{it.t}</h3>
              <p className="muted">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const work = [
    { id: 'work-1', tag: 'Original Game', t: 'Sheepfold Saga', d: 'Our signature low-poly herding adventure. Wishlisted by a flock of 40k before launch.', metric: '40k', metricLabel: 'wishlists', cats: ['Unreal', 'PC · Console'] },
    { id: 'work-2', tag: 'Digital Twin', t: 'Foundry Live', d: 'A real-time twin of a metal-casting line, streaming sensor data into a walkable 3D plant.', metric: '60fps', metricLabel: 'on-site tablets', cats: ['Unity', 'Industrial'] },
    { id: 'work-3', tag: 'VR Simulation', t: 'SafeWeld Trainer', d: 'Headset welding trainer that scores form and repeatability — no sparks, no scrap.', metric: '−38%', metricLabel: 'onboarding time', cats: ['Quest', 'Training'] },
    { id: 'work-4', tag: 'Interactive 3D', t: 'Configurator One', d: 'A browser product configurator with live materials and lighting that loads in under two seconds.', metric: '1.8s', metricLabel: 'time to first frame', cats: ['WebGL', 'Web'] },
  ];
  return (
    <section className="section-pad work-sec" id="work">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow reveal">Selected work</span>
          <h2 className="h2 reveal d1">Worlds we’ve<br />shipped lately.</h2>
          <p className="lead reveal d2">Four from the pasture — a game, a twin, a trainer, and a configurator. Drop your own stills into any slot.</p>
        </div>
        <div className="work-grid">
          {work.map((w, i) => (
            <article className={'card card-hover work-card reveal d' + ((i % 2) + 1)} key={w.id}>
              <div className="work-media">
                <image-slot id={w.id} style={{ width: '100%', height: '100%', display: 'block' }} shape="rounded" radius="20" placeholder={'Drop a still — ' + w.t}></image-slot>
                <span className="work-tag chip">{w.tag}</span>
              </div>
              <div className="work-body">
                <div className="work-metric"><b className="grad-text">{w.metric}</b><span>{w.metricLabel}</span></div>
                <h3 className="h3">{w.t}</h3>
                <p className="muted">{w.d}</p>
                <div className="work-cats">{w.cats.map(c => <span key={c} className="work-cat">{c}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Services, Portfolio });
