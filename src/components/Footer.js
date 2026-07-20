const Footer = () => (
  <footer style={{ background: "#010913", borderTop: "1px solid rgba(249,115,22,0.12)", padding: "64px 24px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#F97316,#EA580C)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>H</div>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Hi-Konnect <span style={{ color: "#F97316" }}>NG</span></span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 240 }}>Hi-Konnect Network Limited — Reliable broadband connectivity for modern Nigeria.</p>
        </div>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Services</h4>
          {["Home Broadband", "Business Internet", "Enterprise Solutions", "Technical Support", "Installation Services"].map((l, i) => (
            <a key={i} href="/packages" style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F97316"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{l}</a>
          ))}
        </div>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Contact</h4>
          <a href="tel:+2349155004551" style={{ color: "#F97316", textDecoration: "none", fontWeight: 600, display: "block", marginBottom: 10 }}>+234 915 500 4551</a>
          <a href="mailto:info@hikonnectng.com" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "block", marginBottom: 10 }}>info@hikonnectng.com</a>
          <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.8 }}>9 Community Road,<br />Pineapple Estate Wagbare,<br />Igbogbo, Ikorodu, Lagos</div>
        </div>
      </div>
      <div className="divider" style={{ marginBottom: 24 }} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>© {new Date().getFullYear()} Hi-Konnect Network Limited. All rights reserved.</p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>Licensed ISP · Lagos, Nigeria · <span style={{ color: "#F97316" }}>Connecting Communities</span></p>
      </div>
    </div>
  </footer>
);

export default Footer;
