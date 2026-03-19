import { useState, useEffect, useRef } from "react";

const GUMROAD_URL = "https://getfluxe.gumroad.com/l/ezstu";
const BEEHIIV_PUB_ID = "pub_4e440ce5-0b46-463f-87b0-548e55c4df19";

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((v) => ({ ...v, [e.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const ref = (id) => (el) => {
    refs.current[id] = el;
    if (el) el.dataset.id = id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    window.open(`https://getfluxe.beehiiv.com/subscribe?email=${encodeURIComponent(email)}`, "_blank");
    setSubmitted(true);
  };

  const steps = [
    { n: "01", title: "Find the idea", body: "Spot a problem people already pay to solve. No guessing." },
    { n: "02", title: "Build the product", body: "Create it with AI in hours, not months. Ship before you're ready." },
    { n: "03", title: "Write the page", body: "Copy that converts strangers into buyers. Every word earns its place." },
    { n: "04", title: "Drive traffic", body: "Get eyes on your offer without paid ads or a big following." },
    { n: "05", title: "Automate the sales", body: "Set it up once. Let it run while you sleep." },
  ];

  const faqs = [
    { q: "Do I need tech experience?", a: "No. If you can send an email, you can follow these steps. Every tool used is free or nearly free." },
    { q: "How long does this take?", a: "Most people have their first product live within a weekend. The steps are built for action, not theory." },
    { q: "What if it doesn't work for me?", a: "Keep it. If you go through the steps and get nothing, the $17 was worth the lesson. But it will work if you work it." },
    { q: "Is this another AI make money scheme?", a: "No. This is a step-by-step system for building a real digital product business. AI is just the tool that makes it faster." },
  ];return (
    <div style={styles.root}>
      <style>{css}</style>
      <nav style={styles.nav}>
        <span style={styles.logo}>FLUXE</span>
        <a href={GUMROAD_URL} target="_blank" rel="noreferrer" style={styles.navCta}>
          Get the Blueprint →
        </a>
      </nav>
      <section style={styles.hero}>
        <div style={styles.heroNoise} />
        <div style={styles.heroInner}>
          <div className="fade-up" style={{ animationDelay: "0ms" }}>
            <span style={styles.eyebrow}>The Side Hustle Blueprint</span>
          </div>
          <h1 className="fade-up" style={{ ...styles.h1, animationDelay: "80ms" }}>
            Build your first<br />
            <em style={styles.accent}>online income stream.</em><br />
            From scratch.
          </h1>
          <p className="fade-up" style={{ ...styles.heroSub, animationDelay: "160ms" }}>
            50 steps. Zero startup cost. No experience needed.<br />
            Find the product. Build it. Sell it. Automate it.
          </p>
          <div className="fade-up" style={{ ...styles.heroButtons, animationDelay: "240ms" }}>
            <a href={GUMROAD_URL} target="_blank" rel="noreferrer" style={styles.btnPrimary}>
              Get instant access — $17
            </a>
            <span style={styles.heroMeta}>Also available at $7 · $37 · Instant download</span>
          </div>
        </div>
      </section>
      <section ref={ref("pain")} style={{ ...styles.section, ...styles.painSection }} className={visible["pain"] ? "reveal" : "pre-reveal"}>
        <div style={styles.container}>
          <p style={styles.painLead}>Atlassian just cut 1,600 jobs to fund AI investment. They won't be the last.</p>
          <p style={styles.painBody}>The people who survive this shift aren't the most educated. They're the ones who build fastest. A side income stream isn't a backup plan anymore — it's the plan.</p>
          <p style={styles.painClose}>This blueprint is for the ones who are done waiting.</p>
        </div>
      </section>
      <section ref={ref("steps")} style={styles.section} className={visible["steps"] ? "reveal" : "pre-reveal"}>
        <div style={styles.container}>
          <h2 style={styles.h2}>What's inside</h2>
          <p style={styles.sectionSub}>50 steps across 5 phases. Every step is an action, not advice.</p>
          <div style={styles.stepsGrid}>
            {steps.map((s, i) => (
              <div key={i} style={styles.stepCard} className="step-card">
                <span style={styles.stepNum}>{s.n}</span>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section ref={ref("email")} style={{ ...styles.section, ...styles.emailSection }} className={visible["email"] ? "reveal" : "pre-reveal"}>
        <div style={{ ...styles.container, textAlign: "center" }}>
          <h2 style={styles.h2}>Get the free checklist first</h2>
          <p style={styles.sectionSub}>The First Step Checklist — the exact 5 things to do before you build anything. Free. Instant. No fluff.</p>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={styles.emailForm}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.emailInput} />
              <button type="submit" style={styles.btnPrimary}>Send it to me →</button>
            </form>
          ) : (
            <div style={styles.thankYou}>
              <span style={styles.checkmark}>✓</span>
              <p style={styles.thankYouText}>
                You're in. Check your inbox.<br />
                <a href={GUMROAD_URL} target="_blank" rel="noreferrer" style={styles.upsellLink}>Ready for the full blueprint? Get it here →</a>
              </p>
            </div>
          )}
        </div>
      </section>
      <section ref={ref("pricing")} style={styles.section} className={visible["pricing"] ? "reveal" : "pre-reveal"}>
        <div style={styles.container}>
          <h2 style={{ ...styles.h2, textAlign: "center" }}>Pick your tier</h2>
          <div style={styles.pricingGrid}>
            {[
              { price: "$7", name: "Starter", desc: "The full 50-step blueprint. Everything you need to start." },
              { price: "$17", name: "Builder", desc: "Blueprint + bonus resource pack. The most popular tier.", featured: true },
              { price: "$37", name: "Complete", desc: "Everything above + the automation toolkit for hands-off sales." },
            ].map((t, i) => (
              <a key={i} href={GUMROAD_URL} target="_blank" rel="noreferrer" style={{ ...styles.pricingCard, ...(t.featured ? styles.pricingFeatured : {}) }} className="pricing-card">
                {t.featured && <span style={styles.popularBadge}>Most Popular</span>}
                <span style={styles.pricingPrice}>{t.price}</span>
                <span style={styles.pricingName}>{t.name}</span>
                <p style={styles.pricingDesc}>{t.desc}</p>
                <span style={styles.pricingCta}>Get instant access →</span>
              </a>
            ))}
          </div>
          <p style={styles.guarantee}>Instant download. Keep it forever. If you go through it and get nothing — you still learned something worth more than $17.</p>
        </div>
      </section>
      <section ref={ref("faq")} style={styles.section} className={visible["faq"] ? "reveal" : "pre-reveal"}>
        <div style={styles.container}>
          <h2 style={styles.h2}>Questions</h2>
          <div style={styles.faqList}>
            {faqs.map((f, i) => (
              <div key={i} style={styles.faqItem}>
                <p style={styles.faqQ}>{f.q}</p>
                <p style={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section ref={ref("final")} style={{ ...styles.section, ...styles.finalSection }} className={visible["final"] ? "reveal" : "pre-reveal"}>
        <div style={{ ...styles.container, textAlign: "center" }}>
          <h2 style={{ ...styles.h2, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>The window is open.<br />Build while it is.</h2>
          <a href={GUMROAD_URL} target="_blank" rel="noreferrer" style={{ ...styles.btnPrimary, marginTop: "2rem", display: "inline-block" }}>
            Get The Side Hustle Blueprint →
          </a>
        </div>
      </section>
      <footer style={styles.footer}>
        <span style={styles.logo}>FLUXE</span>
        <p style={styles.footerText}>© 2026 Fluxe · Built for builders · Part of Eightland</p>
      </footer>
    </div>
  );
}const styles = {
  root: { background: "#0a0a0a", color: "#f0ece4", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(240,236,228,0.08)", position: "sticky", top: 0, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", zIndex: 100 },
  logo: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.15em", color: "#f0ece4" },
  navCta: { color: "#c8f060", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 },
  hero: { position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 2rem 4rem", overflow: "hidden" },
  heroNoise: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,240,96,0.07) 0%, transparent 70%)", pointerEvents: "none" },
  heroInner: { maxWidth: "820px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 },
  eyebrow: { fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8f060", fontWeight: 600, display: "block", marginBottom: "1.5rem" },
  h1: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 9vw, 7rem)", lineHeight: 1.0, letterSpacing: "0.02em", margin: "0 0 1.5rem", color: "#f0ece4" },
  accent: { fontStyle: "normal", color: "#c8f060" },
  heroSub: { fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, color: "rgba(240,236,228,0.65)", marginBottom: "2.5rem", maxWidth: "520px" },
  heroButtons: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem" },
  heroMeta: { fontSize: "0.8rem", color: "rgba(240,236,228,0.4)", letterSpacing: "0.05em" },
  btnPrimary: { display: "inline-block", background: "#c8f060", color: "#0a0a0a", padding: "0.9rem 2rem", borderRadius: "4px", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", letterSpacing: "0.02em", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  section: { padding: "6rem 2rem", transition: "opacity 0.6s ease, transform 0.6s ease" },
  container: { maxWidth: "820px", margin: "0 auto", width: "100%" },
  painSection: { borderTop: "1px solid rgba(240,236,228,0.08)", borderBottom: "1px solid rgba(240,236,228,0.08)", background: "rgba(200,240,96,0.03)" },
  painLead: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.02em", marginBottom: "1.5rem", lineHeight: 1.2, color: "#f0ece4" },
  painBody: { fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(240,236,228,0.7)", marginBottom: "1.5rem", maxWidth: "640px" },
  painClose: { fontSize: "1.1rem", fontWeight: 600, color: "#c8f060" },
  h2: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", letterSpacing: "0.03em", marginBottom: "0.5rem", color: "#f0ece4" },
  sectionSub: { color: "rgba(240,236,228,0.55)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" },
  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" },
  stepCard: { border: "1px solid rgba(240,236,228,0.1)", borderRadius: "8px", padding: "2rem", background: "rgba(240,236,228,0.03)" },
  stepNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "rgba(200,240,96,0.25)", display: "block", lineHeight: 1, marginBottom: "0.75rem" },
  stepTitle: { fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#f0ece4" },
  stepBody: { fontSize: "0.9rem", color: "rgba(240,236,228,0.55)", lineHeight: 1.6 },
  emailSection: { background: "rgba(200,240,96,0.04)", borderTop: "1px solid rgba(200,240,96,0.12)", borderBottom: "1px solid rgba(200,240,96,0.12)" },
  emailForm: { display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" },
  emailInput: { background: "rgba(240,236,228,0.07)", border: "1px solid rgba(240,236,228,0.2)", borderRadius: "4px", padding: "0.9rem 1.25rem", color: "#f0ece4", fontSize: "0.95rem", width: "280px", fontFamily: "'DM Sans', sans-serif", outline: "none" },
  thankYou: { display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "2rem" },
  checkmark: { fontSize: "2.5rem", color: "#c8f060" },
  thankYouText: { color: "rgba(240,236,228,0.7)", lineHeight: 1.8, textAlign: "center" },
  upsellLink: { color: "#c8f060", textDecoration: "none", fontWeight: 600 },
  pricingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginTop: "2.5rem" },
  pricingCard: { border: "1px solid rgba(240,236,228,0.12)", borderRadius: "8px", padding: "2rem 1.5rem", background: "rgba(240,236,228,0.03)", display: "flex", flexDirection: "column", gap: "0.5rem", textDecoration: "none", color: "#f0ece4", position: "relative" },
  pricingFeatured: { border: "1px solid rgba(200,240,96,0.4)", background: "rgba(200,240,96,0.06)" },
  popularBadge: { position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", background: "#c8f060", color: "#0a0a0a", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.75rem", borderRadius: "99px", letterSpacing: "0.08em", whiteSpace: "nowrap" },
  pricingPrice: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "#c8f060", lineHeight: 1 },
  pricingName: { fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,236,228,0.5)" },
  pricingDesc: { fontSize: "0.9rem", color: "rgba(240,236,228,0.6)", lineHeight: 1.6, marginTop: "0.5rem", flexGrow: 1 },
  pricingCta: { fontSize: "0.85rem", color: "#c8f060", fontWeight: 600, marginTop: "0.75rem" },
  guarantee: { textAlign: "center", fontSize: "0.85rem", color: "rgba(240,236,228,0.35)", marginTop: "2rem", lineHeight: 1.7 },
  faqList: { display: "flex", flexDirection: "column", gap: "0" },
  faqItem: { borderBottom: "1px solid rgba(240,236,228,0.08)", padding: "1.75rem 0" },
  faqQ: { fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", color: "#f0ece4" },
  faqA: { fontSize: "0.95rem", color: "rgba(240,236,228,0.6)", lineHeight: 1.7 },
  finalSection: { background: "rgba(200,240,96,0.04)", borderTop: "1px solid rgba(200,240,96,0.12)" },
  footer: { padding: "2rem", borderTop: "1px solid rgba(240,236,228,0.08)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" },
  footerText: { fontSize: "0.8rem", color: "rgba(240,236,228,0.3)" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  .fade-up { animation: fadeUp 0.7s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .pre-reveal { opacity: 0; transform: translateY(32px); }
  .reveal { opacity: 1 !important; transform: translateY(0) !important; }
  .step-card:hover { border-color: rgba(200,240,96,0.3) !important; background: rgba(200,240,96,0.05) !important; }
  .pricing-card:hover { border-color: rgba(200,240,96,0.5) !important; transform: translateY(-3px); }
  input:focus { border-color: rgba(200,240,96,0.5) !important; }
  ::selection { background: rgba(200,240,96,0.3); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: rgba(200,240,96,0.3); border-radius: 3px; }
`;