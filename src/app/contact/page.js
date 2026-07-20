"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    @font-face { font-family:"PP Mori";font-weight:400;src:local("Inter"),local("Helvetica Neue"),local("Arial"),sans-serif; }
    @font-face { font-family:"PP Mori";font-weight:600;src:local("Inter"),local("Helvetica Neue"),local("Arial"),sans-serif; }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;font-size:16px}
    body{font-family:"PP Mori","Inter","Helvetica Neue",Arial,sans-serif;background:#050818;color:#fff;overflow-x:hidden;-webkit-font-smoothing:antialiased}
    ::-webkit-scrollbar{width:6px}
    ::-webkit-scrollbar-track{background:#020B18}
    ::-webkit-scrollbar-thumb{background:#F97316;border-radius:3px}
    ::selection{background:rgba(249,115,22,0.35);color:#fff}
    .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
    .text-gradient{background:linear-gradient(135deg,#F97316 0%,#FB923C 50%,#FDBA74 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .btn-primary{background:linear-gradient(135deg,#F97316 0%,#EA580C 100%);color:#fff;font-weight:600;border:none;cursor:pointer;transition:all 0.3s}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(249,115,22,0.45)}
    .section-eyebrow{font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#F97316}
    .navbar{display:flex;justify-content:space-between;align-items:center;padding:20px;margin:0 auto;max-width:1800px}
    .navbar img{width:150px;height:auto}
    .navbar>.links{display:flex;gap:15px;padding-top:10px}
    .navbar>.links>a{text-decoration:none;color:#e0e0e0}
    .navbar>.buttons .login-button{padding:8px 16px;background-color:#FF8800;border:none;border-radius:20px;color:#fff;cursor:pointer;font-size:1rem}
    .navbar>.buttons .login-button:hover{background-color:#FFA837}
    @media(max-width:768px){.hide-mobile{display:none!important}}
    @media(min-width:769px){.hide-desktop{display:none!important}}
  `}</style>
);

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (d = 0) => ({ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease } } });
const fadeLeft = (d = 0) => ({ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: d, ease } } });
const fadeRight = (d = 0) => ({ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: d, ease } } });

const Reveal = ({ children, variant, className = "", once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return <motion.div ref={ref} variants={variant} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>{children}</motion.div>;
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", plan: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000); };

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontSize: "0.95rem", fontFamily: "inherit", outline: "none", transition: "border-color 0.3s",
  };

  return (
    <html lang='en'>
      <body cz-shortcut-listen='true'>
        <GlobalStyles />
        <Navbar />

        <section style={{ padding: "140px 24px 100px", background: "#020B18" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal variant={fadeUp(0)}>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <p className="section-eyebrow" style={{ marginBottom: 16 }}>Get Connected Today</p>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
                  Request <span className="text-gradient">Installation</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                  Fill out the form below and our team will contact you within 24 hours.
                </p>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
              <Reveal variant={fadeLeft(0)}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 28, color: "#fff" }}>Contact Information</h3>
                  {[
                    { icon: "📞", label: "Sales & New Connections", value: "+234 915 500 4551", href: "tel:+2349155004551" },
                    { icon: "☎️", label: "Office Line", value: "0915-500-4552", href: "tel:09155004552" },
                    { icon: "✉️", label: "Email Us", value: "info@hikonnectng.com", href: "mailto:info@hikonnectng.com" },
                    { icon: "📍", label: "Office Address", value: "9 Community Road, Pineapple Estate Wagbare, Igbogbo, Ikorodu, Lagos", href: null },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24, padding: "18px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{c.label}</div>
                        {c.href ? <a href={c.href} style={{ color: "#F97316", fontWeight: 600, textDecoration: "none", fontSize: "0.92rem" }}>{c.value}</a> : <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem" }}>{c.value}</span>}
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: "20px 24px", borderRadius: 18, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>🕐 Support Hours</div>
                    <div style={{ fontWeight: 600, color: "#fff" }}>24 / 7 — Always Available</div>
                  </div>
                </div>
              </Reveal>

              <Reveal variant={fadeRight(0.1)}>
                <div className="glass" style={{ borderRadius: 28, padding: "40px 36px" }}>
                  {sent ? (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                      <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎉</div>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>Request Sent!</h3>
                      <p style={{ color: "rgba(255,255,255,0.6)" }}>Our team will reach out within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={submit}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 28, color: "#fff" }}>Installation Request Form</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Full Name *</label>
                          <input name="name" value={form.name} onChange={handle} required placeholder="John Adeyemi" style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Phone *</label>
                          <input name="phone" value={form.phone} onChange={handle} required placeholder="0801 234 5678" style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Email</label>
                        <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@example.com" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Address *</label>
                        <input name="address" value={form.address} onChange={handle} required placeholder="Street, Area, Ikorodu, Lagos" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Plan *</label>
                        <select name="plan" value={form.plan} onChange={handle} required style={{ ...inputStyle, appearance: "none" }}
                          onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}>
                          <option value="" style={{ background: "#04111F" }}>Select a plan</option>
                          <option value="radio" style={{ background: "#04111F" }}>Radio Plan (5–15 Mbps)</option>
                          <option value="fiber" style={{ background: "#04111F" }}>Fiber Plan (10–20 Mbps)</option>
                          <option value="enterprise" style={{ background: "#04111F" }}>Enterprise Plan (Custom)</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: 28 }}>
                        <label style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Message</label>
                        <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="Tell us more..." style={{ ...inputStyle, resize: "vertical" }}
                          onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                      </div>
                      <button type="submit" className="btn-primary" style={{ width: "100%", padding: "15px", borderRadius: 14, fontSize: "1rem" }}>Submit Installation Request →</button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
