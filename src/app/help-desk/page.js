"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
    .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
    .text-gradient{background:linear-gradient(135deg,#F97316 0%,#FB923C 50%,#FDBA74 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .section-eyebrow{font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#F97316}
    .navbar{display:flex;justify-content:space-between;align-items:center;padding:20px;margin:0 auto;max-width:1800px}
    .navbar img{width:150px;height:auto}
    .navbar>.links{display:flex;gap:15px;padding-top:10px}
    .navbar>.links>a{text-decoration:none;color:#e0e0e0}
    .navbar>.buttons .login-button{padding:8px 16px;background-color:#FF8800;border:none;border-radius:20px;color:#fff;cursor:pointer;font-size:1rem}
    .navbar>.buttons .login-button:hover{background-color:#FFA837}
    @media(max-width:768px){.hide-mobile{display:none!important}}
  `}</style>
);

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (d = 0) => ({ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease } } });

const Reveal = ({ children, variant, className = "", once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  return <motion.div ref={ref} variants={variant} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>{children}</motion.div>;
};

const faqs = [
  { q: "How do I subscribe to a plan?", a: "You can subscribe by calling our sales line at +234 915 500 4551 or by filling out the installation request form on our Contact page. Our team will get back to you within 24 hours." },
  { q: "What areas are currently covered?", a: "We currently serve Ikorodu, Igbogbo, and Pineapple Estate / Wagbare with active coverage. We are expanding to Ijede, Imota, and other areas soon." },
  { q: "Is the data truly unlimited?", a: "Yes! Our Radio and Fiber plans come with truly unlimited data — no caps, no throttling, and no hidden charges." },
  { q: "How long does installation take?", a: "Most installations are completed within 48 hours. Our certified technicians will schedule a visit at your convenience." },
  { q: "What if I experience a service issue?", a: "Our support team is available 24/7. Call our office line at 0915-500-4552 or email us at info@hikonnectng.com and we'll resolve it promptly." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade your plan at any time. Contact our support team to discuss the best option for your needs." },
];

export default function HelpDeskPage() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <html lang='en'>
      <body cz-shortcut-listen='true'>
        <GlobalStyles />
        <Navbar />

        <section style={{ padding: "140px 24px 100px", background: "#020B18" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Reveal variant={fadeUp(0)}>
              <div style={{ textAlign: "center", marginBottom: 64 }}>
                <p className="section-eyebrow" style={{ marginBottom: 16 }}>Help & Support</p>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 20 }}>
                  We're Here To <span className="text-gradient">Help</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                  Find answers to common questions or reach out to our 24/7 support team.
                </p>
              </div>
            </Reveal>

            {/* Contact cards */}
            <Reveal variant={fadeUp(0.1)}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 64 }}>
                <a href="tel:+2349155004551" className="glass" style={{ borderRadius: 20, padding: "24px", textAlign: "center", textDecoration: "none" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>📞</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Sales Line</div>
                  <div style={{ color: "#F97316", fontWeight: 600, fontSize: "0.95rem" }}>+234 915 500 4551</div>
                </a>
                <a href="tel:09155004552" className="glass" style={{ borderRadius: 20, padding: "24px", textAlign: "center", textDecoration: "none" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>☎️</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Office Line</div>
                  <div style={{ color: "#F97316", fontWeight: 600, fontSize: "0.95rem" }}>0915-500-4552</div>
                </a>
                <a href="mailto:info@hikonnectng.com" className="glass" style={{ borderRadius: 20, padding: "24px", textAlign: "center", textDecoration: "none" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>✉️</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Email</div>
                  <div style={{ color: "#F97316", fontWeight: 600, fontSize: "0.95rem" }}>info@hikonnectng.com</div>
                </a>
              </div>
            </Reveal>

            {/* FAQ */}
            <Reveal variant={fadeUp(0.2)}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 24, color: "#fff", textAlign: "center" }}>Frequently Asked Questions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {faqs.map((faq, i) => (
                  <div key={i} className="glass" style={{ borderRadius: 16, overflow: "hidden" }}>
                    <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                      width: "100%", padding: "18px 24px", background: "none", border: "none",
                      color: "#fff", fontSize: "0.95rem", fontWeight: 600, textAlign: "left",
                      cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      {faq.q}
                      <span style={{ color: "#F97316", transform: openIdx === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                    </button>
                    {openIdx === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.2 }}
                        style={{ padding: "0 24px 18px", color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                        {faq.a}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
