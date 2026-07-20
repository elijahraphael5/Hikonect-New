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
    .glass-orange{background:rgba(249,115,22,0.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(249,115,22,0.2)}
    .text-gradient{background:linear-gradient(135deg,#F97316 0%,#FB923C 50%,#FDBA74 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .btn-primary{background:linear-gradient(135deg,#F97316 0%,#EA580C 100%);color:#fff;font-weight:600;border:none;cursor:pointer;padding:13px 28px;border-radius:12;font-size:0.92rem;text-decoration:none;display:inline-block;transition:all 0.3s cubic-bezier(0.22,1,0.36,1)}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(249,115,22,0.45)}
    .btn-outline{background:transparent;color:#fff;font-weight:600;border:1.5px solid rgba(255,255,255,0.25);cursor:pointer;padding:13px 28px;border-radius:12;font-size:0.92rem;text-decoration:none;display:inline-block;transition:all 0.3s cubic-bezier(0.22,1,0.36,1)}
    .btn-outline:hover{border-color:#F97316;color:#F97316;transform:translateY(-2px)}
    .section-eyebrow{font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#F97316}
    .navbar{display:flex;justify-content:space-between;align-items:center;padding:20px;margin:0 auto;max-width:1800px}
    .navbar img{width:150px;height:auto}
    .navbar>.links{display:flex;gap:15px;padding-top:10px}
    .navbar>.links>a{text-decoration:none;color:#e0e0e0}
    .navbar>.buttons .login-button{padding:8px 16px;background-color:#FF8800;border:none;border-radius:20px;color:#fff;cursor:pointer;font-size:1rem;transition:background-color 0.3s ease}
    .navbar>.buttons .login-button:hover{background-color:#FFA837}
    .navbar{display:flex;justify-content:space-between;align-items:center;padding:20px;margin:0 auto;max-width:1800px}
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

export default function AboutPage() {
  return (
    <html lang='en'>
      <body cz-shortcut-listen='true'>
        <GlobalStyles />
        <Navbar />

        <section style={{ padding: "140px 24px 100px", background: "linear-gradient(180deg, #020B18 0%, #04111F 100%)" }}>
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
                    From residential homes to enterprises, churches, schools, and SMEs — we design connectivity solutions that fit your life, your budget, and your ambitions. Our local team understands Lagos, and we're growing fast.
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <a href="/packages" className="btn-primary">Our Packages</a>
                    <a href="/contact" className="btn-outline">Talk To Us</a>
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
                    <motion.div key={i} whileHover={{ scale: 1.03 }} className={i === 0 ? "glass-orange" : "glass"}
                      style={{ borderRadius: 20, padding: "28px 20px", textAlign: "center" }}>
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
        <Footer />
      </body>
    </html>
  );
}
