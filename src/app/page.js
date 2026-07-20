"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── GLOBAL STYLES (original + new) ────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Climate+Crisis:YEAR@1979&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    @font-face {
      font-family: "PP Mori";
      font-weight: 400;
      src: local("Inter"), local("Helvetica Neue"), local("Arial"), sans-serif;
    }
    @font-face {
      font-family: "PP Mori";
      font-weight: 600;
      src: local("Inter"), local("Helvetica Neue"), local("Arial"), sans-serif;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }

    body {
      font-family: "PP Mori", "Inter", "Helvetica Neue", Arial, sans-serif;
      background: #050818;
      color: #ffffff;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #020B18; }
    ::-webkit-scrollbar-thumb { background: #F97316; border-radius: 3px; }
    ::selection { background: rgba(249,115,22,0.35); color: #fff; }

    /* ── Original utility classes ── */
    .glass {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .glass-orange {
      background: rgba(249,115,22,0.08);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(249,115,22,0.2);
    }
    .orange-glow { box-shadow: 0 0 40px rgba(249,115,22,0.25), 0 0 80px rgba(249,115,22,0.1); }
    .text-gradient {
      background: linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDBA74 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .text-gradient-white {
      background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .btn-primary {
      background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
      color: #fff;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .btn-primary:hover::after { opacity: 1; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(249,115,22,0.45); }
    .btn-outline {
      background: transparent;
      color: #fff;
      font-weight: 600;
      border: 1.5px solid rgba(255,255,255,0.25);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    }
    .btn-outline:hover { border-color: #F97316; color: #F97316; transform: translateY(-2px); }
    .section-eyebrow {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #F97316;
    }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent); }
    .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 8px; }
    .hamburger span { display: block; width: 24px; height: 2px; background: #e0e0e0; border-radius: 2px; transition: 0.3s; }
    .desktop-only { display: flex; }
    .mobile-only { display: none; }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .desktop-only { display: none !important; }
      .hamburger { display: flex; }
      .navbar { flex-wrap: wrap; padding: 12px 16px; }
      .navbar img { width: 100px; }
      .navbar .links {
        display: none !important; width: 100%; flex-direction: column; gap: 0;
        padding: 0 0 20px; margin-top: 16px;
        border-top: 1px solid rgba(255,255,255,0.1);
        background: #050818; position: absolute; top: 100%; left: 0; z-index: 100;
      }
      .navbar .links.mobile-open { display: flex !important; }
      .navbar .links a { padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 1rem; text-decoration: none; }
      .mobile-only { display: flex; padding: 0 20px; }
      .mobile-only .login-button { width: 100%; margin-top: 10px; padding: 12px; text-align: center; border-radius: 12px; }
      .hamburger { z-index: 101; }
    }
    @media (min-width: 769px) {
      .hide-desktop { display: none !important; }
    }

    @media (max-width: 640px) {
      /* ── Navbar ── */
      .navbar img { width: 80px; }

      /* ── Original hero ── */
      .home .page > h1 { font-size: clamp(1.8rem, 8vw, 2.5rem); padding-top: 24px; width: 92%; }
      .bodyside { padding-top: 16px; }
      .bodyside_left > p { font-size: 0.82rem; max-width: 100%; }
      .homepage_image > img { max-width: 100%; }

      /* ── Original scroll/gallery ── */
      .scroll { gap: 16px; padding: 32px 16px; min-height: auto; }
      .scroll > img { max-width: 60px; }
      .scroll > img:nth-child(6) { max-width: 60px; }
      .scroll > img:nth-child(7) { max-width: 80px; }

      /* ── Original socials ── */
      .socials { flex-direction: column; padding: 40px 24px; gap: 28px; }
      .socials > .socialText { width: 100%; }
      .socials > .socialImage { width: 80%; max-width: 320px; margin: 0 auto; }
      .socials > .socialImage > img:first-child { max-width: 100%; }
      .socials > .socialImage > img:nth-child(2),
      .socials > .socialImage > img:nth-child(3) { display: none; }
      .socialText > h1 { font-size: clamp(1.4rem, 5vw, 1.8rem); }
      .socialText > p { font-size: 0.92rem; max-width: 100%; }
      .specialKeys { flex-wrap: wrap; gap: 10px; }
      .btnPersonal, .btnBusiness, .btnEnterprise { padding: 8px 20px; font-size: 0.82rem; }

      /* ── Original services ── */
      .servicesSection { flex-direction: column; padding: 40px 16px; min-height: auto; }
      .servicesSection > .card { max-width: 100%; height: 340px; padding: 24px 16px 32px; }
      .servicesSection > .card > h1 { font-size: 1.1rem; }
      .servicesSection > .card > p { font-size: 0.8rem; }
      .servicesSection > .card > button { padding: 8px 24px; font-size: 0.78rem; }

      /* ── Original leftSection ── */
      .leftSection { width: 100%; padding: 40px 16px; }

      /* ── Original cards ── */
      .card { max-width: 100%; height: 340px; padding: 24px 16px 32px; }
      .card > h1 { font-size: 1.1rem; }
      .card > p { font-size: 0.8rem; }
      .card > button { padding: 8px 24px; font-size: 0.78rem; }

      /* ── Contact form grid → stack on mobile ── */
      form > div:first-of-type { grid-template-columns: 1fr !important; }
    }

    @media (max-width: 480px) {
      /* ── Navbar further reduction ── */
      .navbar { padding: 10px 12px; }
      .navbar img { width: 64px; }
      .navbar .links a { padding: 12px 0; font-size: 0.92rem; }

      /* ── Original hero ── */
      .home .page > h1 { font-size: clamp(1.4rem, 6vw, 1.8rem); padding-top: 20px; }
      .bodyside_left > p { font-size: 0.78rem; }

      /* ── Original socials ── */
      .socials { padding: 28px 16px; gap: 20px; }
      .socials > .socialImage { width: 90%; max-width: 200px; }
      .socialText > h1 { font-size: clamp(1.2rem, 5vw, 1.5rem); }
      .socialText > p { font-size: 0.85rem; }
      .specialKeys { gap: 8px; }

      /* ── Original services ── */
      .servicesSection > .card { height: 280px; gap: 8px; }
      .card { height: 280px; gap: 8px; }

      /* ── Original scroll ── */
      .scroll { gap: 10px; padding: 20px 12px; }

      /* ── New section overrides (reduce inline styles) ── */
      section[id]:not(#home) { padding: 48px 14px !important; }
      section[id]:not(#home) > div > h2 { font-size: clamp(1.5rem, 5vw, 1.8rem) !important; }
    

      /* ── Contact form ── */
      form > div:first-of-type { grid-template-columns: 1fr !important; }
      .glass { padding: 24px 16px !important; }

      /* ── Final CTA ── */
      section:last-of-type > div > div > div { padding: 32px 20px !important; }
    }

    @media (max-width: 360px) {
      .servicesSection > .card { height: 240px; }
      .card { height: 240px; }
      .navbar img { width: 50px; }
    }

    /* ── Original section styles ── */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin: 0 auto;
      max-width: 1800px;
      position: relative;
    }
    .navbar img { width: 150px; height: auto; }
    .navbar .links { display: flex; gap: 15px; padding-top: 10px; }
    .navbar > .links > a { text-decoration: none; color: #e0e0e0; }
    .navbar > .buttons .login-button {
      padding: 8px 16px;
      background-color: rgb(255, 136, 0);
      border: none;
      border-radius: 20px;
      color: #ffffff;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }
    .navbar > .buttons .login-button:hover { background-color: rgb(255, 168, 55); }

    .home { width: 100%; height: auto; }
    .home > .home_parent {
      width: 100%; min-height: 50vh;
      background-image: url('/transpqrentmtkkt.png');
      background-size: cover; background-repeat: no-repeat; background-position: center;
    }
    .home > .home_parent > .page {
      width: 100%; height: auto;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    }
    .home .page > h1 {
      width: 70%;
      font-family: 'Climate Crisis', cursive;
      font-size: clamp(3rem, 7.2vw, 7.5rem);
      line-height: 1.1;
      text-align: center;
      padding-top: 80px;
    }
    .homepage_image { width: 100%; min-height: auto; display: flex; align-items: center; justify-content: center; }
    .homepage_image > img { width: 100%; max-width: 626px; height: auto; }
    .bodyside {
      width: 100%; max-width: 1200px;
      display: flex; align-items: center; justify-content: center; gap: 20px;
      padding-top: 30px;
    }
    .bodyside_left > p {
      width: 100%; max-width: 780px;
      font-size: 1rem; line-height: 1.7;
      text-align: center; color: rgba(255,255,255,0.55);
    }
    .scroll {
      width: 100%; min-height: 30vh;
      display: flex; align-items: center; justify-content: center;
      padding: 80px 20px; gap: 54px;
    }
    .scroll > img { width: 100%; max-width: 150px; height: auto; mix-blend-mode: screen; }
    .scroll > img:nth-child(6) { max-width: 120px; }
    .scroll > img:nth-child(7) { max-width: 250px; }
    .socials {
      width: 100%;
      display: flex; align-items: center; justify-content: center;
      gap: 40px; padding: 80px 40px;
    }
    .socials > .socialText { width: 45%; max-width: 540px; }
    .socials > .socialImage { width: 45%; display: flex; align-items: center; justify-content: center; position: relative; }
    .socials > .socialImage > img { width: 100%; max-width: 800px; height: auto; }
    .socials > .socialImage > img:nth-child(2) {
      width: 100%; max-width: 120px; position: absolute; top: 20%; left: 16%;
      transform: rotate(19deg);
      animation: myAnimation 3s ease-in-out infinite;
    }
    .socials > .socialImage > img:nth-child(3) {
      width: 100%; max-width: 120px; position: absolute; bottom: 20%; right: 16%;
      transform: rotate(19deg);
      animation: myAnimation 3s ease-in-out infinite;
    }
    @keyframes myAnimation {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .socialText > h1 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); color: #fff; line-height: 1.2; text-align: left; font-weight: 700; letter-spacing: -0.02em; }
    .socialText > h1 > span { color: rgb(255, 136, 0); }
    .socialText > p { font-size: 1.05rem; line-height: 1.8; color: rgba(255,255,255,0.7); margin-top: 16px; max-width: 480px; }
    .specialKeys { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
    .btnPersonal, .btnBusiness, .btnEnterprise {
      border: 1px solid #e8e2ff; padding: 10px 30px; border-radius: 20px;
    }
    .servicesSection {
      width: 100%; min-height: 50vh; padding: 50px;
      display: flex; align-items: center; justify-content: center; gap: 20px;
    }
    .servicesSection > .card { width: 100%; max-width: 312px; height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 40px 24px 60px; gap: 12px; }
    .servicesSection > .card:nth-child(1) { background-image: url('/card.png'); background-repeat: no-repeat; background-size: cover; background-position: center; }
    .servicesSection > .card:nth-child(2) { background-image: url('/card2.png'); background-repeat: no-repeat; background-size: cover; background-position: center; }
    .servicesSection > .card:nth-child(3) { background-image: url('/card3.png'); background-repeat: no-repeat; background-size: cover; background-position: center; }
    .router { width: 100%; min-height: 60vh; background-size: cover; background-repeat: no-repeat; background-position: center; }
    .leftSection { width: 50%; display: flex; align-items: center; justify-content: center; padding: 120px 20px; }
    .leftSection > img { width: 100%; max-width: 1100px; height: auto; }
    .card {
      width: 100%; max-width: 280px; height: 480px;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 12px;
      padding: 40px 24px 60px;
    }
    .card > h1 { font-size: 1.3rem; color: #ffffff; line-height: 1.2; text-align: center; font-weight: 700; letter-spacing: -0.02em; }
    .card > p { font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.7; text-align: center; max-width: 220px; }
    .card > button {
      margin-top: 8px; padding: 10px 32px; border: none; border-radius: 100px;
      background: rgb(255, 136, 0); color: #fff; font-size: 0.85rem;
      font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
      cursor: pointer; transition: all 0.3s ease;
    }
    .card > button:hover { background: rgb(255, 168, 55); transform: translateY(-2px); }
  `}</style>
);

/* ─── ANIMATION VARIANTS ─────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease } },
});
const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease } },
});
const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease } },
});
const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, delay, ease } },
});

/* ─── REVEAL WRAPPER ─────────────────────────────────────────────────────── */
const Reveal = ({ children, variant, className = "", once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── NETWORK PARTICLES CANVAS ───────────────────────────────────────────── */
const NetworkCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 60;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,115,22,0.5)";
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(249,115,22,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  if (typeof document === "undefined") return null;
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} />;
};

/* ─── NEW SECTIONS (from pasted code) ───────────────────────────────────── */

/* ─── WHY HI-KONNECT ─────────────────────────────────────────────────────── */
const WhyHiKonnect = () => {
  const features = [
    { icon: "⚡", title: "Blazing-Fast Speeds", desc: "Up to enterprise-grade bandwidth for homes and businesses — buffer-free, lag-free, always on." },
    { icon: "🛡️", title: "Reliable Infrastructure", desc: "Built on resilient radio and fiber networks engineered for Nigerian terrain and urban density." },
    { icon: "📞", title: "24/7 Human Support", desc: "Real people pick up your call. No bots, no frustration — just fast, friendly help anytime." },
    { icon: "🔓", title: "Truly Unlimited Data", desc: "No caps, no throttling, no surprises. Use as much data as your life demands." },
    { icon: "💰", title: "Transparent Pricing", desc: "Clear monthly plans with no hidden charges. What you see is exactly what you pay." },
    { icon: "🚀", title: "Quick Installation", desc: "Our certified technicians get you online fast — most installs completed within 48 hours." },
  ];

  return (
    <section id="why" style={{ padding: "100px 24px", background: "#020B18" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal variant={fadeUp(0)}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-eyebrow" style={{ marginBottom: 16 }}>Why Choose Us</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Internet That Works <span className="text-gradient">As Hard As You Do</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: "1.05rem" }}>
              Hi-Konnect Network is built around one promise: keep you connected, no matter what.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <Reveal key={i} variant={fadeUp(i * 0.08)}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(249,115,22,0.35)" }}
                className="glass"
                style={{ borderRadius: 24, padding: "32px 28px", height: "100%", transition: "border-color 0.3s", cursor: "default" }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", marginBottom: 20,
                }}>{f.icon}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 12, color: "#fff" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: "0.92rem" }}>{f.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */
const AboutSection = () => (
  <section id="about" style={{
    padding: "100px 24px",
    background: "linear-gradient(180deg, #020B18 0%, #04111F 100%)",
    position: "relative",
  }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
        <Reveal variant={fadeLeft(0)}>
          <div>
            <p className="section-eyebrow" style={{ marginBottom: 16 }}>About Hi-Konnect</p>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.15 }}>
              Connecting Nigeria,<br /><span className="text-gradient">One Home At A Time</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 20, fontSize: "0.98rem" }}>
              Hi-Konnect Network Limited is a licensed Nigerian Internet Service Provider headquartered in Ikorodu, Lagos. Founded to bridge the digital divide in underserved communities, we deliver robust broadband through radio and fiber infrastructure — built to the standards modern Nigeria demands.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32, fontSize: "0.98rem" }}>
              From residential homes to enterprises, churches, schools, and SMEs — we design connectivity solutions that fit your life, your budget, and your ambitions.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#packages" className="btn-primary" style={{ padding: "13px 28px", borderRadius: 12, fontSize: "0.92rem", textDecoration: "none" }}>Our Packages</a>
              <a href="#contact" className="btn-outline" style={{ padding: "13px 28px", borderRadius: 12, fontSize: "0.92rem", textDecoration: "none" }}>Talk To Us</a>
            </div>
          </div>
        </Reveal>

        <Reveal variant={fadeRight(0.15)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Founded", value: "Lagos, NG", sub: "Ikorodu HQ" },
              { label: "Coverage", value: "Growing", sub: "Lagos & Beyond" },
              { label: "Uptime Focus", value: "100%", sub: "Service Commitment" },
              { label: "Support", value: "24 / 7", sub: "Always Available" },
            ].map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className={i === 0 ? "glass-orange" : "glass"}
                style={{ borderRadius: 20, padding: "28px 20px", textAlign: "center" }}
              >
                <div style={{ fontSize: "1.7rem", fontWeight: 700, color: "#F97316", marginBottom: 4 }}>{c.value}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{c.sub}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─── VISION & MISSION ───────────────────────────────────────────────────── */
const VisionMission = () => (
  <section id="vision" style={{ padding: "100px 24px", background: "#020B18", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
    <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <Reveal variant={fadeUp(0)}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-eyebrow" style={{ marginBottom: 16 }}>Our Purpose</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
            Vision & <span className="text-gradient">Mission</span>
          </h2>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {[
          { icon: "🌍", label: "Our Vision", headline: "A Digitally Empowered Nigeria", body: "We envision a Nigeria where every home, school, and business has access to fast, reliable, and affordable internet — powering education, commerce, creativity, and economic growth from every corner of the country." },
          { icon: "🎯", label: "Our Mission", headline: "Deliver World-Class Connectivity", body: "Our mission is to provide dependable, high-speed broadband services using cutting-edge infrastructure, exceptional customer care, and community-driven expansion that prioritises underserved and emerging Nigerian communities." },
          { icon: "💎", label: "Our Values", headline: "Integrity. Innovation. Impact.", body: "We operate with transparency, invest in infrastructure that lasts, and measure success not just in network uptime — but in the lives we improve, the businesses we power, and the communities we connect." },
        ].map((c, i) => (
          <Reveal key={i} variant={scaleIn(i * 0.1)}>
            <motion.div
              whileHover={{ y: -5 }}
              style={{
                borderRadius: 28, padding: "40px 32px", height: "100%",
                background: `linear-gradient(145deg, rgba(249,115,22,${0.05 + i * 0.02}) 0%, rgba(2,11,24,0.8) 100%)`,
                border: "1px solid rgba(249,115,22,0.15)",
                position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }} />
              <div style={{ fontSize: "2.2rem", marginBottom: 20 }}>{c.icon}</div>
              <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#F97316", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>{c.label}</p>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 16, color: "#fff" }}>{c.headline}</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: "0.93rem" }}>{c.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── PACKAGES ───────────────────────────────────────────────────────────── */
const Packages = () => {
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

  return (
    <section id="packages" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #04111F 0%, #020B18 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal variant={fadeUp(0)}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-eyebrow" style={{ marginBottom: 16 }}>Internet Packages</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Plans Built For <span className="text-gradient">Every Need</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24 }}>
          {plans.map((p, i) => (
            <Reveal key={i} variant={fadeUp(i * 0.1)}>
              <motion.div
                whileHover={{ y: -8 }}
                style={{
                  borderRadius: 28, padding: "40px 32px", height: "100%",
                  background: p.badge === "Most Popular" ? "linear-gradient(145deg, rgba(249,115,22,0.14) 0%, rgba(2,11,24,0.9) 100%)" : "rgba(255,255,255,0.03)",
                  border: p.badge === "Most Popular" ? "1.5px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  position: "relative", overflow: "hidden",
                  boxShadow: p.badge === "Most Popular" ? "0 0 60px rgba(249,115,22,0.15)" : "none",
                }}
              >
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
                <a href="#contact" style={{
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
      </div>
    </section>
  );
};

/* ─── COVERAGE ───────────────────────────────────────────────────────────── */
const Coverage = () => {
  const zones = [
    { name: "Ikorodu", status: "Active", color: "#22C55E" },
    { name: "Igbogbo", status: "Active", color: "#22C55E" },
    { name: "Pineapple Estate / Wagbare", status: "Active", color: "#22C55E" },
    { name: "Ijede", status: "Expanding", color: "#F97316" },
    { name: "Imota", status: "Expanding", color: "#F97316" },
    { name: "Bayeku", status: "Coming Soon", color: "#60A5FA" },
    { name: "Ipakodo", status: "Coming Soon", color: "#60A5FA" },
    { name: "Owutu", status: "Coming Soon", color: "#60A5FA" },
  ];

  return (
    <section id="coverage" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #020B18 0%, #04111F 50%, #020B18 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "start" }}>
          <Reveal variant={fadeLeft(0)}>
            <div>
              <p className="section-eyebrow" style={{ marginBottom: 16 }}>Coverage & Expansion</p>
              <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.15 }}>
                Growing Across<br /><span className="text-gradient">Lagos & Beyond</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32, fontSize: "0.98rem" }}>
                We're rapidly expanding our network infrastructure to cover more communities.
              </p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[{ color: "#22C55E", label: "Active Coverage" }, { color: "#F97316", label: "Expanding" }, { color: "#60A5FA", label: "Coming Soon" }].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                    <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36 }}>
                <a href="#contact" className="btn-primary" style={{ padding: "14px 28px", borderRadius: 14, fontSize: "0.92rem", textDecoration: "none", display: "inline-block" }}>Check My Area →</a>
              </div>
            </div>
          </Reveal>

          <Reveal variant={fadeRight(0.15)}>
            <div className="glass" style={{ borderRadius: 28, padding: "32px" }}>
              <h3 style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>Network Coverage — Lagos</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {zones.map((z, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease }}
                    viewport={{ once: true }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{z.name}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: z.color, padding: "4px 12px", borderRadius: 100, background: `${z.color}18`, border: `1px solid ${z.color}40` }}>{z.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ─── TESTIMONIALS ───────────────────────────────────────────────────────── */
const CustomerExperience = () => {
  const testimonials = [
    { name: "Adebayo O.", role: "SME Owner, Ikorodu", text: "Hi-Konnect completely changed how I run my business. Stable connection, no downtime, and their team was so professional.", rating: 5 },
    { name: "Ngozi E.", role: "Remote Worker, Igbogbo", text: "I've tried three ISPs before. Hi-Konnect is the first one that actually delivers what they promise.", rating: 5 },
    { name: "Pastor James A.", role: "Church Admin, Pineapple Estate", text: "We use Hi-Konnect for live streaming our services. The reliability is incredible.", rating: 5 },
    { name: "Chioma B.", role: "Student, Ikorodu", text: "Unlimited data and great speed for the price. I can study, stream, and game without worrying.", rating: 5 },
  ];

  return (
    <section id="testimonials" style={{ padding: "100px 24px", background: "#020B18" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal variant={fadeUp(0)}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-eyebrow" style={{ marginBottom: 16 }}>Customer Experience</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              Trusted By <span className="text-gradient">Real Nigerians</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <Reveal key={i} variant={fadeUp(i * 0.08)}>
              <motion.div whileHover={{ y: -5, borderColor: "rgba(249,115,22,0.3)" }} className="glass" style={{ borderRadius: 24, padding: "32px 28px", height: "100%", transition: "border-color 0.3s" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array(t.rating).fill(0).map((_, j) => (<span key={j} style={{ color: "#F97316", fontSize: "0.95rem" }}>★</span>))}
                </div>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75, fontSize: "0.93rem", marginBottom: 24, fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#EA580C)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── VISIT OFFICE ───────────────────────────────────────────────────────── */
const VisitOffice = () => (
  <section id="visit" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #020B18 0%, #04111F 100%)" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <Reveal variant={fadeUp(0)}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-eyebrow" style={{ marginBottom: 16 }}>Find Us</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>Visit Our <span className="text-gradient">Office</span></h2>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, alignItems: "stretch" }}>
        <Reveal variant={fadeLeft(0)}>
          <div className="glass" style={{ borderRadius: 28, padding: "40px 36px", display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: 24 }}>📍</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 20, color: "#fff" }}>Head Office</h3>
            <div style={{ color: "rgba(255,255,255,0.65)", lineHeight: 2, fontSize: "1rem" }}>
              9 Community Road,<br />Pineapple Estate Wagbare,<br />Igbogbo, Ikorodu,<br /><span style={{ color: "#F97316", fontWeight: 600 }}>Lagos State, Nigeria</span>
            </div>
            <div style={{ marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", marginBottom: 10 }}>
                <span>📞</span>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Office Line</div>
                  <a href="tel:09155004552" style={{ color: "#F97316", fontWeight: 600, textDecoration: "none", fontSize: "0.92rem" }}>0915-500-4552</a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)" }}>
                <span>✉️</span>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</div>
                  <a href="mailto:info@hikonnectng.com" style={{ color: "#F97316", fontWeight: 600, textDecoration: "none", fontSize: "0.92rem" }}>info@hikonnectng.com</a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ─── CONTACT FORM ───────────────────────────────────────────────────────── */
const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", plan: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontSize: "0.95rem", fontFamily: "inherit", outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <section id="contact" style={{ padding: "100px 24px", background: "#020B18", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
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
              <div style={{ marginTop: 32, padding: "20px 24px", borderRadius: 18, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}>
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
  );
};

/* ─── FINAL CTA ──────────────────────────────────────────────────────────── */
const FinalCTA = () => (
  <section id="cta" style={{ padding: "80px 24px", background: "#04111F" }}>
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <Reveal variant={scaleIn(0)}>
        <div style={{ borderRadius: 32, padding: "64px 48px", background: "linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(30,58,138,0.12) 100%)", border: "1.5px solid rgba(249,115,22,0.25)", position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🚀</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.15 }}>
            Ready To Go <span className="text-gradient">Lightning Fast?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 36px", fontSize: "1rem" }}>
            Join 1,000+ homes and businesses already enjoying fast, unlimited internet with Hi-Konnect Network Limited.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="tel:+2349155004551" className="btn-primary" style={{ padding: "15px 36px", borderRadius: 14, fontSize: "1rem", textDecoration: "none" }}>📞 Call Now: +234 915 500 4551</a>
            <a href="#contact" className="btn-outline" style={{ padding: "15px 36px", borderRadius: 14, fontSize: "1rem", textDecoration: "none" }}>Request Installation</a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── APP ────────────────────────────────────────────────────────────────── */
export default function HiKonnect() {
  return (
    <html lang='en'>
      <body cz-shortcut-listen='true'>
        <GlobalStyles />
        <Navbar />

        {/* ── ORIGINAL HOME SECTION ── */}
        <section className='home' id='home'>
          <div className='home_parent'>
            <div className='page'>
              <h1>Blazing Fast Internet</h1>
              <div className='bodyside'>
                <div className='bodyside_left'>
                  <p>
                    Experience the future of connectivity with our blazing fast
                    internet service. Say goodbye to buffering and hello to
                    seamless streaming, gaming, and browsing. Our cutting-edge
                    technology ensures lightning-fast speeds, reliable
                    connections, and a superior online experience.
                  </p>
                </div>
              </div>
              <div className='homepage_image'>
                <img src='/hiLayer2.png' alt='' />
              </div>
            </div>
          </div>

          <div className='socials'>
            <div className='socialText'>
              <h1>
                Reflect who you are with a blazing <span>fast internet</span>
              </h1>
              <p>
                In a world that moves fast, your internet should move even
                faster. Experience reliable connectivity, lightning-fast speeds,
                and a network built to support your daily digital needs — from
                work and learning to entertainment and communication.
              </p>
              <div className='specialKeys'>
                <div className='btnPersonal'>Personal</div>
                <div className='btnBusiness'>Business</div>
                <div className='btnEnterprise'>Enterprise</div>
              </div>
            </div>
            <div className='socialImage'>
              <img src='/scene 16 D_.png' alt='' />
              <img src='/Objectlove.png' alt='' />
              <img src='/Objectlove.png' alt='' />
            </div>
          </div>

          <div className='scroll'>
            <img src='./pngwing.com.png' alt='' />
            <img src='./pngegg.png' alt='' />
            <img src='./icons8-disney-logo.svg' alt='' />
            <img src='./icons8-hulu.svg' alt='' />
            <img src='./youtube.png' alt='' />
            <img src='./apple-tv-logo-svg-vector.svg' alt='' />
            <img src='/svgviewer-png-output(2).png' alt='' />
          </div>

          <div className='servicesSection'>
            <div className='card'>
              <h1>Personal</h1>
              <p>Perfect for your everyday needs.</p>
              <button>subscribe</button>
            </div>
            <div className='card'>
              <h1>Business</h1>
              <p>Designed for your professional requirements.</p>
              <button>subscribe</button>
            </div>
            <div className='card'>
              <h1>Enterprise</h1>
              <p>Scalable solutions for large organizations.</p>
              <button>subscribe</button>
            </div>
          </div>

        </section>

        {/* ── NEW SECTIONS ── */}
        <WhyHiKonnect />
        <AboutSection />
        <VisionMission />
        <Packages />
        <Coverage />
        <CustomerExperience />
        <VisitOffice />
        <Contact />
        <FinalCTA />
        <Footer />
      </body>
    </html>
  );
}
