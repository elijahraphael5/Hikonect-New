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
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(249,115,22,0.3),transparent)}
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

const Reveal = ({ children, variant, className = "", once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return <motion.div ref={ref} variants={variant} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>{children}</motion.div>;
};

const plans = [
  {
    name: "Radio Plan", speed: "5–15 Mbps", icon: "📡", badge: null, price: "Affordable", color: "#60A5FA",
    features: ["Up to 15 Mbps download", "Unlimited data", "Ideal for browsing & streaming", "Single-household use", "Quick installation", "24/7 support"],
    cta: "Get Radio Plan",
  },
  {
    name: "Fiber Plan", speed: "10–20 Mbps", icon: "🔆", badge: "Most Popular", price: "Premium", color: "#F97316",
    features: ["Up to 20 Mbps download", "Truly unlimited data", "Streaming + gaming + remote work", "Multiple device support", "Priority installation", "Dedicated support line"],
    cta: "Get Fiber Plan",
  },
  {
    name: "Enterprise Plan", speed: "Custom Speeds", icon: "🏢", badge: "Business", price: "Custom", color: "#A78BFA",
    features: ["Custom speed & SLA", "Dedicated bandwidth", "Business-grade uptime", "Multi-location support", "Account manager", "Priority SLA & escalation"],
    cta: "Request Quote",
  },
];

export default function PackagesPage() {
  return (
    <html lang='en'>
      <body cz-shortcut-listen='true'>
        <GlobalStyles />
        <Navbar />

        <section style={{ padding: "140px 24px 100px", background: "linear-gradient(180deg, #04111F 0%, #020B18 100%)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal variant={fadeUp(0)}>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <p className="section-eyebrow" style={{ marginBottom: 16 }}>Internet Packages</p>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
                  Plans Built For <span className="text-gradient">Every Need</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                  Transparent, flexible broadband packages — from households to high-demand enterprises.
                </p>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24 }}>
              {plans.map((p, i) => (
                <Reveal key={i} variant={fadeUp(i * 0.1)}>
                  <motion.div whileHover={{ y: -8 }} style={{
                    borderRadius: 28, padding: "40px 32px", height: "100%",
                    background: p.badge === "Most Popular" ? "linear-gradient(145deg, rgba(249,115,22,0.14) 0%, rgba(2,11,24,0.9) 100%)" : "rgba(255,255,255,0.03)",
                    border: p.badge === "Most Popular" ? "1.5px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    position: "relative", overflow: "hidden",
                    boxShadow: p.badge === "Most Popular" ? "0 0 60px rgba(249,115,22,0.15)" : "none",
                  }}>
                    {p.badge && (
                      <div style={{
                        position: "absolute", top: 20, right: 20,
                        background: p.badge === "Most Popular" ? "linear-gradient(135deg,#F97316,#EA580C)" : "rgba(167,139,250,0.2)",
                        color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em",
                        padding: "5px 12px", borderRadius: 100,
                        border: p.badge !== "Most Popular" ? "1px solid rgba(167,139,250,0.4)" : "none",
                      }}>{p.badge}</div>
                    )}
                    <div style={{ fontSize: "2rem", marginBottom: 16 }}>{p.icon}</div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>{p.name}</h3>
                    <div style={{ fontSize: "2.2rem", fontWeight: 700, color: p.color, marginBottom: 4, letterSpacing: "-0.02em" }}>{p.speed}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: 28, fontWeight: 500 }}>{p.price} Tier</div>
                    <div className="divider" style={{ marginBottom: 24 }} />
                    <ul style={{ listStyle: "none", marginBottom: 32 }}>
                      {p.features.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                          <span style={{ color: p.color, fontSize: "0.85rem", flexShrink: 0 }}>✓</span>
                          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" style={{
                      display: "block", textAlign: "center", padding: "14px",
                      borderRadius: 14, fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
                      background: p.badge === "Most Popular" ? "linear-gradient(135deg,#F97316,#EA580C)" : "transparent",
                      border: p.badge === "Most Popular" ? "none" : `1.5px solid ${p.color}`,
                      color: p.badge === "Most Popular" ? "#fff" : p.color,
                      transition: "all 0.3s",
                    }}
                      onMouseEnter={e => { if (p.badge !== "Most Popular") { e.target.style.background = p.color; e.target.style.color = "#fff"; } }}
                      onMouseLeave={e => { if (p.badge !== "Most Popular") { e.target.style.background = "transparent"; e.target.style.color = p.color; } }}
                    >{p.cta}</a>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Reveal variant={fadeUp(0.3)}>
              <p style={{ textAlign: "center", marginTop: 40, color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                All plans include free consultation. Contact us on <span style={{ color: "#F97316" }}>+234 915 500 4551</span> to discuss your specific needs.
              </p>
            </Reveal>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
