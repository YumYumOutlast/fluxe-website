import { useState, useEffect, useRef } from "react";

const BLUEPRINT_URL = "https://getfluxe.gumroad.com/l/launchpad";
const ISTREAMCODE_URL = "https://getfluxe.gumroad.com/l/iSteamCode";
const BEEHIIV_PUB_ID = "pub_4e440ce5-0b46-463f-87b0-548e55c4df19";

export default function App() {
  const [visible, setVisible] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
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
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach((r) => r && observer.observe(r));
    fetch("/blogs.json")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]));
    return () => observer.disconnect();
  }, []);

  const ref = (id) => (el) => {
    refs.current[id] = el;
    if (el) el.dataset.id = id;
  };

  const scrollTo = (id) => {
    const el = refs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={s.root}>
      <style>{globalCSS}</style>

      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo}>FLUXE</span>
        <div style={s.navLinks}>
          <a onClick={() => scrollTo("products")} style={s.navLink}>Products</a>
          <a onClick={() => scrollTo("blog")} style={s.navLink}>Blog</a>
          <a onClick={() => scrollTo("newsletter")} style={s.navLink}>Newsletter</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroGlow} />
        <div style={s.heroContent}>
          <div className="fade-up" style={{ animationDelay: "0ms" }}>
            <span style={s.tag}>Digital products for people who build</span>
          </div>
          <h1 className="fade-up" style={{ ...s.h1, animationDelay: "100ms" }}>
            Stop trading time<br />
            for money.
          </h1>
          <p className="fade-up" style={{ ...s.heroSub, animationDelay: "200ms" }}>
            Two systems. One for building your first income stream.<br />
            One for building your streaming career. Pick your path.
          </p>
          <div className="fade-up" style={{ ...s.heroCtas, animationDelay: "300ms" }}>
            <button onClick={() => { setActiveProduct("blueprint"); scrollTo("products"); }} style={s.btnPrimary}>
              Side Hustle Blueprint
            </button>
            <button onClick={() => { setActiveProduct("stream"); scrollTo("products"); }} style={s.btnOutline}>
              iStreamCode
            </button>
          </div>
        </div>
        <div style={s.heroScroll} className="fade-up" onClick={() => scrollTo("proof")}>
          <span style={s.scrollText}>Scroll</span>
          <div style={s.scrollLine} />
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section ref={ref("proof")} style={s.proofBar} className={visible["proof"] ? "reveal" : "pre-reveal"}>
        <div style={s.proofInner}>
          <div style={s.proofStat}>
            <span style={s.proofNum}>75K+</span>
            <span style={s.proofLabel}>Reddit views in 24hrs</span>
          </div>
          <div style={s.proofDivider} />
          <div style={s.proofStat}>
            <span style={s.proofNum}>180+</span>
            <span style={s.proofLabel}>Upvotes on first post</span>
          </div>
          <div style={s.proofDivider} />
          <div style={s.proofStat}>
            <span style={s.proofNum}>Verified</span>
            <span style={s.proofLabel}>Twitch Partner engaged</span>
          </div>
        </div>
      </section>

      {/* PRODUCT PICKER */}
      <section ref={ref("products")} style={s.section} className={visible["products"] ? "reveal" : "pre-reveal"}>
        <div style={s.container}>
          <h2 style={s.h2}>Choose your path</h2>
          <p style={s.subtext}>Two different goals. Two complete systems. Pick the one that fits.</p>

          <div style={s.productGrid}>
            {/* BLUEPRINT CARD */}
            <div
              style={{
                ...s.productCard,
                ...(activeProduct === "blueprint" ? s.productCardActive : {}),
              }}
              className="product-card"
              onClick={() => setActiveProduct("blueprint")}
            >
              <div style={s.productTag}>Side Hustle</div>
              <h3 style={s.productTitle}>The Side Hustle Blueprint</h3>
              <p style={s.productDesc}>
                Build your first online income stream from scratch. Find the product. Build it. Sell it. Automate it.
                50 steps. Zero startup cost. No experience needed.
              </p>
              <div style={s.productPricing}>
                <span style={s.productPrice}>$37</span>
                <span style={s.productPriceSub}>Also available at $37 · $47 · $67</span>
              </div>
              <div style={s.productFeatures}>
                <span style={s.feature}>✦ 50-step action system</span>
                <span style={s.feature}>✦ AI-powered product creation</span>
                <span style={s.feature}>✦ Traffic without paid ads</span>
                <span style={s.feature}>✦ Automation toolkit</span>
              </div>
              <a href={BLUEPRINT_URL} target="_blank" rel="noreferrer" style={s.productCta}>
                Get The Blueprint →
              </a>
            </div>

            {/* iSTREAMCODE CARD */}
            <div
              style={{
                ...s.productCard,
                ...(activeProduct === "stream" ? s.productCardActive : {}),
              }}
              className="product-card"
              onClick={() => setActiveProduct("stream")}
            >
              <div style={{ ...s.productTag, background: "rgba(90,144,255,0.15)", color: "#5a90ff" }}>Streaming</div>
              <h3 style={s.productTitle}>iStreamCode</h3>
              <p style={s.productDesc}>
                The complete streaming system. 12 documents across 4 tiers. Identity, setup, launch, community,
                monetization, growth — built on how TheBurntPeanut went from zero to 886K followers.
              </p>
              <div style={s.productPricing}>
                <span style={{ ...s.productPrice, color: "#5a90ff" }}>$23 – $109</span>
                <span style={s.productPriceSub}>4 tiers · Start where you are</span>
              </div>
              <div style={s.productFeatures}>
                <span style={s.feature}>💎 Sapphire — Identity System ($23)</span>
                <span style={s.feature}>💎 Emerald — Tech Setup ($56)</span>
                <span style={s.feature}>💎 Ruby — Launch + Community ($79)</span>
                <span style={s.feature}>💎 Diamond — Full System ($109)</span>
              </div>
              <a href={ISTREAMCODE_URL} target="_blank" rel="noreferrer" style={{ ...s.productCta, background: "#5a90ff" }}>
                Get iStreamCode →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLUEPRINT DETAIL */}
      <section ref={ref("blueprintDetail")} style={{ ...s.section, ...s.detailSection }} className={visible["blueprintDetail"] ? "reveal" : "pre-reveal"}>
        <div style={s.container}>
          <span style={s.detailEyebrow}>The Side Hustle Blueprint</span>
          <h2 style={s.h2}>What's inside</h2>
          <p style={s.subtext}>50 steps across 5 phases. Every step is an action, not advice.</p>
          <div style={s.stepsGrid}>
            {[
              { n: "01", title: "Find the idea", body: "Spot a problem people already pay to solve. No guessing." },
              { n: "02", title: "Build the product", body: "Create it with AI in hours, not months. Ship before you're ready." },
              { n: "03", title: "Write the page", body: "Copy that converts strangers into buyers. Every word earns its place." },
              { n: "04", title: "Drive traffic", body: "Get eyes on your offer without paid ads or a big following." },
              { n: "05", title: "Automate the sales", body: "Set it up once. Let it run while you sleep." },
            ].map((step, i) => (
              <div key={i} style={s.stepCard} className="step-card">
                <span style={s.stepNum}>{step.n}</span>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href={BLUEPRINT_URL} target="_blank" rel="noreferrer" style={s.btnPrimary}>
              Get The Blueprint — $37 →
            </a>
          </div>
        </div>
      </section>

      {/* iSTREAMCODE DETAIL */}
      <section ref={ref("streamDetail")} style={{ ...s.section, ...s.detailSectionAlt }} className={visible["streamDetail"] ? "reveal" : "pre-reveal"}>
        <div style={s.container}>
          <span style={{ ...s.detailEyebrow, color: "#5a90ff" }}>iStreamCode</span>
          <h2 style={s.h2}>The streaming system</h2>
          <p style={s.subtext}>
            TheBurntPeanut has 886,000 Twitch followers. He built 80% of his production himself.
            He didn't go viral. He built an identity so specific that when the moment came, 400,000 people showed up.
          </p>
          <div style={s.tierGrid}>
            {[
              {
                gem: "Sapphire", price: "$23", color: "#5a90ff",
                title: "Identity System",
                items: "Streamer Identity Workbook · Catchphrase + Voice Guide · Brand Mood Board",
              },
              {
                gem: "Emerald", price: "$56", color: "#3dd870",
                title: "Tech Setup",
                items: "Complete Technical Setup Guide · Platform Selection · Software Stack Guide",
              },
              {
                gem: "Ruby", price: "$79", color: "#ff4070",
                title: "Launch + Community",
                items: "30-Day Launch Roadmap · Community Playbook · Monetization Breakdown",
              },
              {
                gem: "Diamond", price: "$109", color: "#c0c0ff",
                title: "Full System",
                items: "Complete Blueprint · Growth Tracker + Analytics · Collab + Networking Playbook",
              },
            ].map((tier, i) => (
              <a key={i} href={ISTREAMCODE_URL} target="_blank" rel="noreferrer" style={s.tierCard} className="tier-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ ...s.tierGem, color: tier.color }}>{tier.gem}</span>
                  <span style={{ ...s.tierPrice, color: tier.color }}>{tier.price}</span>
                </div>
                <h3 style={s.tierTitle}>{tier.title}</h3>
                <p style={s.tierItems}>{tier.items}</p>
              </a>
            ))}
          </div>
          <p style={s.tierNote}>Start where you are. Upgrade when you're ready. Instant download. No fluff. Yours forever.</p>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a href={ISTREAMCODE_URL} target="_blank" rel="noreferrer" style={{ ...s.btnPrimary, background: "#5a90ff" }}>
              Get iStreamCode →
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section ref={ref("newsletter")} style={{ ...s.section, ...s.newsletterSection }} className={visible["newsletter"] ? "reveal" : "pre-reveal"}>
        <div style={{ ...s.container, textAlign: "center" }}>
          <h2 style={s.h2}>Get the free checklist first</h2>
          <p style={s.subtext}>The First Step Checklist — the exact 5 things to do before you build anything. Free. Instant. No fluff.</p>
          <iframe
            src="https://subscribe-forms.beehiiv.com/c362bd35-1548-4a0c-9ca0-b483426f7be3"
            frameBorder="0"
            scrolling="no"
            style={{ width: "100%", maxWidth: "560px", height: "207px", margin: "2rem auto 0", display: "block", backgroundColor: "transparent" }}
          />
        </div>
      </section>

      {/* BLOG */}
      {posts.length > 0 && (
        <section ref={ref("blog")} style={s.section} className={visible["blog"] ? "reveal" : "pre-reveal"}>
          <div style={s.container}>
            <h2 style={s.h2}>Latest from Fluxe</h2>
            <p style={s.subtext}>Insights on building income streams, AI tools, and the creator economy.</p>
            {selectedPost ? (
              <div>
                <button onClick={() => setSelectedPost(null)} style={s.backBtn}>← Back to posts</button>
                <article style={s.blogArticle}>
                  <h3 style={s.blogPostTitle}>{selectedPost.title}</h3>
                  <div style={s.blogBody} dangerouslySetInnerHTML={{ __html: selectedPost.body?.replace(/\n/g, "<br/>") }} />
                </article>
              </div>
            ) : (
              <div style={s.blogGrid}>
                {posts.slice(0, 6).map((post, i) => (
                  <div key={i} style={s.blogCard} className="blog-card" onClick={() => setSelectedPost(post)}>
                    <span style={s.blogDate}>{post.date}</span>
                    <h3 style={s.blogCardTitle}>{post.title}</h3>
                    <span style={s.blogRead}>Read →</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section ref={ref("faq")} style={s.section} className={visible["faq"] ? "reveal" : "pre-reveal"}>
        <div style={s.container}>
          <h2 style={s.h2}>Questions</h2>
          <div style={s.faqList}>
            {[
              { q: "Do I need tech experience?", a: "No. If you can send an email, you can follow these steps. Every tool used is free or nearly free." },
              { q: "How long does this take?", a: "Most people have their first product live within a weekend. The steps are built for action, not theory." },
              { q: "What's the refund policy?", a: "All sales are final. Due to the digital nature of these products, we do not offer refunds, exchanges, or transfers under any circumstances. If you have questions, reach out before purchasing." },
              { q: "Is this another AI money scheme?", a: "No. These are step-by-step systems for building real things. AI is just the tool that makes it faster." },
              { q: "What's the difference between the two products?", a: "The Side Hustle Blueprint teaches you to build and sell digital products online. iStreamCode is specifically for people building a streaming career — identity, setup, launch, community, and monetization." },
            ].map((f, i) => (
              <div key={i} style={s.faqItem}>
                <p style={s.faqQ}>{f.q}</p>
                <p style={s.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={ref("final")} style={{ ...s.section, ...s.finalSection }} className={visible["final"] ? "reveal" : "pre-reveal"}>
        <div style={{ ...s.container, textAlign: "center" }}>
          <h2 style={{ ...s.h2, fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            The window is open.<br />Build while it is.
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
            <a href={BLUEPRINT_URL} target="_blank" rel="noreferrer" style={s.btnPrimary}>
              Side Hustle Blueprint →
            </a>
            <a href={ISTREAMCODE_URL} target="_blank" rel="noreferrer" style={{ ...s.btnPrimary, background: "#5a90ff" }}>
              iStreamCode →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <span style={s.logo}>FLUXE</span>
        <p style={s.footerText}>© 2026 Fluxe · Built for builders · Part of Eightland</p>
        <p style={s.footerPolicy}>All sales final. No refunds on digital products.</p>
      </footer>
    </div>
  );
}

const s = {
  root: { background: "#08080a", color: "#e8e4dc", fontFamily: "'Outfit', sans-serif", minHeight: "100vh", overflowX: "hidden" },

  // Nav
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2.5rem", borderBottom: "1px solid rgba(232,228,220,0.06)", position: "sticky", top: 0, background: "rgba(8,8,10,0.92)", backdropFilter: "blur(16px)", zIndex: 100 },
  logo: { fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "0.18em", color: "#e8e4dc", textTransform: "uppercase" },
  navLinks: { display: "flex", gap: "2rem" },
  navLink: { color: "rgba(232,228,220,0.5)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.06em", cursor: "pointer", transition: "color 0.2s" },

  // Hero
  hero: { position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "8rem 2rem 4rem", overflow: "hidden", textAlign: "center" },
  heroGlow: { position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "140%", height: "80%", background: "radial-gradient(ellipse 50% 70% at 50% 30%, rgba(200,240,96,0.06) 0%, rgba(90,144,255,0.03) 40%, transparent 70%)", pointerEvents: "none" },
  heroContent: { position: "relative", zIndex: 1, maxWidth: "800px" },
  tag: { fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,228,220,0.4)", fontWeight: 600, display: "block", marginBottom: "2rem" },
  h1: { fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1.0, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 1.5rem", color: "#e8e4dc" },
  heroSub: { fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.8, color: "rgba(232,228,220,0.5)", marginBottom: "3rem", maxWidth: "520px", margin: "0 auto 3rem" },
  heroCtas: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { display: "inline-block", background: "#c8f060", color: "#08080a", padding: "0.85rem 2rem", borderRadius: "3px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", letterSpacing: "0.01em", border: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "transform 0.15s, box-shadow 0.15s" },
  btnOutline: { display: "inline-block", background: "transparent", color: "#5a90ff", padding: "0.85rem 2rem", borderRadius: "3px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", letterSpacing: "0.01em", border: "1px solid rgba(90,144,255,0.4)", cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "transform 0.15s" },
  heroScroll: { position: "absolute", bottom: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", cursor: "pointer", animationDelay: "600ms" },
  scrollText: { fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,228,220,0.25)" },
  scrollLine: { width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(232,228,220,0.25), transparent)" },

  // Proof bar
  proofBar: { borderTop: "1px solid rgba(232,228,220,0.06)", borderBottom: "1px solid rgba(232,228,220,0.06)", padding: "2rem", background: "rgba(200,240,96,0.02)" },
  proofInner: { maxWidth: "700px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "2.5rem", flexWrap: "wrap" },
  proofStat: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" },
  proofNum: { fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#c8f060" },
  proofLabel: { fontSize: "0.75rem", color: "rgba(232,228,220,0.4)", letterSpacing: "0.05em" },
  proofDivider: { width: "1px", height: "32px", background: "rgba(232,228,220,0.1)" },

  // Sections
  section: { padding: "7rem 2rem", transition: "opacity 0.7s ease, transform 0.7s ease" },
  container: { maxWidth: "900px", margin: "0 auto", width: "100%" },
  h2: { fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.01em", marginBottom: "0.75rem", color: "#e8e4dc" },
  subtext: { color: "rgba(232,228,220,0.45)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem", maxWidth: "600px" },

  // Product picker
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" },
  productCard: { border: "1px solid rgba(232,228,220,0.08)", borderRadius: "6px", padding: "2.5rem 2rem", background: "rgba(232,228,220,0.02)", cursor: "pointer", transition: "all 0.25s ease", display: "flex", flexDirection: "column", gap: "1rem" },
  productCardActive: { border: "1px solid rgba(200,240,96,0.35)", background: "rgba(200,240,96,0.04)", transform: "translateY(-2px)" },
  productTag: { display: "inline-block", width: "fit-content", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.3rem 0.8rem", borderRadius: "2px", background: "rgba(200,240,96,0.12)", color: "#c8f060" },
  productTitle: { fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#e8e4dc", lineHeight: 1.2 },
  productDesc: { fontSize: "0.9rem", color: "rgba(232,228,220,0.5)", lineHeight: 1.7 },
  productPricing: { display: "flex", flexDirection: "column", gap: "0.15rem" },
  productPrice: { fontFamily: "'Syne', sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "#c8f060" },
  productPriceSub: { fontSize: "0.75rem", color: "rgba(232,228,220,0.35)", letterSpacing: "0.03em" },
  productFeatures: { display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.5rem" },
  feature: { fontSize: "0.85rem", color: "rgba(232,228,220,0.55)", lineHeight: 1.5 },
  productCta: { display: "inline-block", width: "100%", textAlign: "center", background: "#c8f060", color: "#08080a", padding: "0.8rem 1.5rem", borderRadius: "3px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", marginTop: "auto", transition: "transform 0.15s" },

  // Blueprint detail
  detailSection: { background: "rgba(200,240,96,0.02)", borderTop: "1px solid rgba(200,240,96,0.08)", borderBottom: "1px solid rgba(200,240,96,0.08)" },
  detailSectionAlt: { background: "rgba(90,144,255,0.02)", borderTop: "1px solid rgba(90,144,255,0.08)", borderBottom: "1px solid rgba(90,144,255,0.08)" },
  detailEyebrow: { fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8f060", fontWeight: 600, display: "block", marginBottom: "1rem" },
  stepsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem" },
  stepCard: { border: "1px solid rgba(232,228,220,0.07)", borderRadius: "6px", padding: "2rem", background: "rgba(232,228,220,0.02)" },
  stepNum: { fontFamily: "'Syne', sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "rgba(200,240,96,0.2)", display: "block", lineHeight: 1, marginBottom: "0.75rem" },
  stepTitle: { fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem", color: "#e8e4dc" },
  stepBody: { fontSize: "0.85rem", color: "rgba(232,228,220,0.45)", lineHeight: 1.6 },

  // iStreamCode tiers
  tierGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" },
  tierCard: { border: "1px solid rgba(232,228,220,0.08)", borderRadius: "6px", padding: "1.75rem 1.5rem", background: "rgba(232,228,220,0.02)", textDecoration: "none", color: "#e8e4dc", display: "flex", flexDirection: "column", gap: "0.5rem", transition: "all 0.2s" },
  tierGem: { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" },
  tierPrice: { fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", fontWeight: 800 },
  tierTitle: { fontSize: "1rem", fontWeight: 700, color: "#e8e4dc" },
  tierItems: { fontSize: "0.8rem", color: "rgba(232,228,220,0.45)", lineHeight: 1.6 },
  tierNote: { textAlign: "center", fontSize: "0.85rem", color: "rgba(232,228,220,0.35)", marginTop: "2.5rem", lineHeight: 1.7, fontStyle: "italic" },

  // Newsletter
  newsletterSection: { background: "rgba(232,228,220,0.02)", borderTop: "1px solid rgba(232,228,220,0.06)", borderBottom: "1px solid rgba(232,228,220,0.06)" },

  // Blog
  blogGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" },
  blogCard: { border: "1px solid rgba(232,228,220,0.08)", borderRadius: "6px", padding: "1.75rem", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", gap: "0.5rem" },
  blogDate: { fontSize: "0.7rem", color: "rgba(232,228,220,0.3)", letterSpacing: "0.05em" },
  blogCardTitle: { fontSize: "1rem", fontWeight: 700, color: "#e8e4dc", lineHeight: 1.4 },
  blogRead: { fontSize: "0.8rem", color: "#c8f060", fontWeight: 600, marginTop: "auto" },
  backBtn: { background: "none", border: "none", color: "#c8f060", fontSize: "0.9rem", cursor: "pointer", fontFamily: "'Outfit', sans-serif", marginBottom: "2rem", padding: 0 },
  blogArticle: { maxWidth: "640px" },
  blogPostTitle: { fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem", color: "#e8e4dc" },
  blogBody: { fontSize: "1rem", color: "rgba(232,228,220,0.6)", lineHeight: 1.9 },

  // FAQ
  faqList: { display: "flex", flexDirection: "column", gap: "0" },
  faqItem: { borderBottom: "1px solid rgba(232,228,220,0.06)", padding: "1.75rem 0" },
  faqQ: { fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem", color: "#e8e4dc" },
  faqA: { fontSize: "0.9rem", color: "rgba(232,228,220,0.5)", lineHeight: 1.7 },

  // Final
  finalSection: { background: "linear-gradient(180deg, rgba(200,240,96,0.04) 0%, rgba(8,8,10,1) 100%)", borderTop: "1px solid rgba(200,240,96,0.1)" },

  // Footer
  footer: { padding: "2.5rem 2rem", borderTop: "1px solid rgba(232,228,220,0.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" },
  footerText: { fontSize: "0.75rem", color: "rgba(232,228,220,0.25)" },
  footerPolicy: { fontSize: "0.7rem", color: "rgba(232,228,220,0.18)" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  .fade-up { animation: fadeUp 0.8s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  .pre-reveal { opacity: 0; transform: translateY(36px); }
  .reveal { opacity: 1 !important; transform: translateY(0) !important; }
  .product-card:hover { border-color: rgba(232,228,220,0.2) !important; }
  .step-card:hover { border-color: rgba(200,240,96,0.25) !important; background: rgba(200,240,96,0.03) !important; }
  .tier-card:hover { border-color: rgba(90,144,255,0.3) !important; transform: translateY(-2px); }
  .blog-card:hover { border-color: rgba(200,240,96,0.25) !important; background: rgba(200,240,96,0.02) !important; }
  .pricing-card:hover { transform: translateY(-3px); }
  button:hover { transform: translateY(-1px); }
  a[style*="btnPrimary"]:hover, a[style*="productCta"]:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(200,240,96,0.15); }
  ::selection { background: rgba(200,240,96,0.25); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #08080a; }
  ::-webkit-scrollbar-thumb { background: rgba(200,240,96,0.2); border-radius: 3px; }
  @media (max-width: 640px) {
    nav { padding: 1rem 1.25rem !important; }
    section { padding: 4rem 1.25rem !important; }
  }
`;
