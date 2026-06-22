import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart2, MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { label: "Markets",   path: "/dashboard" },
    { label: "Portfolio", path: "/portfolio"  },
    { label: "Orders",    path: "/orders"     },
    { label: "Analytics", path: "/dashboard"  },
    { label: "Contact",   path: "/contact"    },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: "64px",
        background: "rgba(5,10,5,0.96)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,136,0.12)",
        transition: "all 0.4s ease",
      }}
    >
      <div
        onClick={() => { window.location.href = "/"; }}
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
      >
        <div style={{
          width: 32, height: 32,
          background: "linear-gradient(135deg, #00FF88, #00CC66)",
          borderRadius: "6px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <BarChart2 size={18} color="#050A05" strokeWidth={2.5} />
        </div>
        <span style={{
          fontFamily: "Outfit, sans-serif", fontSize: "20px",
          fontWeight: 700, color: "#e8f5e8", letterSpacing: "-0.02em",
        }}>Stackly</span>
      </div>

      {!isMobile && (
        <div style={{ display: "flex", gap: "36px" }}>
          {navLinks.map((item) => (
            <span
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                fontFamily: "Outfit, sans-serif", fontSize: "14px",
                color: item.path === "/contact" ? "#00FF88" : "rgba(232,245,232,0.55)",
                letterSpacing: "0.02em", transition: "color 0.2s", cursor: "pointer",
              }}
              onMouseEnter={e => e.target.style.color = "#00FF88"}
              onMouseLeave={e => e.target.style.color = item.path === "/contact" ? "#00FF88" : "rgba(232,245,232,0.55)"}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}

      {!isMobile && (
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => navigate("/login")} style={{
            fontFamily: "Outfit, sans-serif", fontSize: "13px",
            color: "#00FF88", background: "transparent",
            border: "1px solid rgba(0,255,136,0.3)",
            padding: "8px 20px", borderRadius: "6px", cursor: "pointer",
          }}>Login</button>
          <button onClick={() => navigate("/login")} style={{
            fontFamily: "Outfit, sans-serif", fontSize: "13px",
            color: "#050A05", background: "#00FF88",
            border: "none", padding: "8px 20px",
            borderRadius: "6px", cursor: "pointer", fontWeight: 600,
          }}>Get Started</button>
        </div>
      )}
    </motion.nav>
  );
}

const contactInfo = [
  {
    icon: <MapPin size={20} />,
    title: "Address",
    lines: ["Stackly Technologies Pvt. Ltd.", "MMR Complex, Chinna Thirupathi,", "Near Chinna Muniyappan Kovil,", "Salem, Tamil Nadu – 636008"],
  },
  {
    icon: <Phone size={20} />,
    title: "Phone",
    lines: ["+91 80 4567 8900", "+91 80 4567 8901 (Support)"],
  },
  {
    icon: <Mail size={20} />,
    title: "Email",
    lines: ["support@stackly.in", "investor@stackly.in"],
  },
  {
    icon: <Clock size={20} />,
    title: "Market Hours",
    lines: ["Mon – Fri: 9:00 AM – 5:00 PM IST", "Sat – Sun: Closed"],
  },
];

const socialLinks = [
  { name: "Twitter / X", icon: "𝕏", path: "/404" },
  { name: "LinkedIn",    icon: "in", path: "/404" },
  { name: "Instagram",   icon: "📷", path: "/404" },
  { name: "YouTube",     icon: "▶", path: "/404" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#050A05",
      fontFamily: "Outfit, sans-serif", color: "#e8f5e8",
      overflowX: "hidden",
    }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: "120px", paddingBottom: "60px",
        padding: isMobile ? "120px 20px 60px" : "120px 48px 60px",
        maxWidth: "1280px", margin: "0 auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
            color: "#00FF88", letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: "14px",
          }}>Get in Touch</div>
          <h1 style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: isMobile ? "36px" : "clamp(36px, 5vw, 64px)",
            fontWeight: 900, letterSpacing: "-0.03em",
            lineHeight: 1.05, margin: "0 0 16px 0",
          }}>
            We're here to{" "}
            <span style={{
              background: "linear-gradient(135deg, #00FF88, #00CCAA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>help you trade</span>
          </h1>
          <p style={{
            fontSize: "16px", color: "rgba(232,245,232,0.5)",
            lineHeight: 1.7, maxWidth: "520px", margin: 0,
          }}>
            Reach out for account support, partnership enquiries, or anything else.
            Our team responds within one business day.
          </p>
        </motion.div>
      </section>

      {/* Contact Cards + Map */}
      <section style={{
        padding: isMobile ? "0 20px 80px" : "0 48px 100px",
        maxWidth: "1280px", margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "40px",
          alignItems: "start",
        }}>
          {/* Left — contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,255,136,0.12)",
                  borderRadius: "12px", padding: "20px 24px",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                }}
              >
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  background: "rgba(0,255,136,0.08)",
                  border: "1px solid rgba(0,255,136,0.2)",
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#00FF88",
                }}>{item.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                    color: "rgba(0,255,136,0.6)", letterSpacing: "0.1em",
                    textTransform: "uppercase", marginBottom: "6px",
                  }}>{item.title}</div>
                  {item.lines.map((line, j) => (
                    <div key={j} style={{
                      fontSize: "14px", color: "rgba(232,245,232,0.7)",
                      lineHeight: 1.7,
                    }}>{line}</div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,255,136,0.12)",
                borderRadius: "12px", padding: "20px 24px",
              }}
            >
              <div style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                color: "rgba(0,255,136,0.6)", letterSpacing: "0.1em",
                textTransform: "uppercase", marginBottom: "14px",
              }}>Follow Us</div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {socialLinks.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => navigate(s.path)}
                    style={{
                      background: "rgba(0,255,136,0.06)",
                      border: "1px solid rgba(0,255,136,0.2)",
                      borderRadius: "8px", padding: "10px 18px",
                      color: "#e8f5e8", cursor: "pointer",
                      fontFamily: "Outfit, sans-serif", fontSize: "14px",
                      display: "flex", alignItems: "center", gap: "8px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(0,255,136,0.12)";
                      e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)";
                      e.currentTarget.style.color = "#00FF88";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(0,255,136,0.06)";
                      e.currentTarget.style.borderColor = "rgba(0,255,136,0.2)";
                      e.currentTarget.style.color = "#e8f5e8";
                    }}
                  >
                    <span>{s.icon}</span> {s.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(0,255,136,0.12)",
              borderRadius: "12px", overflow: "hidden",
            }}
          >
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid rgba(0,255,136,0.08)",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <MapPin size={14} color="#00FF88" />
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                color: "rgba(0,255,136,0.7)", letterSpacing: "0.1em",
              }}>STACKLY HQ · BENGALURU</span>
            </div>
            <iframe
              title="Stackly Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.0!2d78.1460!3d11.6643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1a0a34c07e9%3A0x8e8c88e8b9e8f8a0!2sChinna%20Thirupathi%2C%20Salem%2C%20Tamil%20Nadu%20636008!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height={isMobile ? "300px" : "480px"}
              style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(140deg) saturate(0.6)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(0,255,136,0.08)",
        padding: isMobile ? "32px 20px" : "40px 48px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: "16px", maxWidth: "1280px", margin: "0 auto",
      }}>
        <div style={{
          fontFamily: "JetBrains Mono, monospace", fontSize: "12px",
          color: "rgba(232,245,232,0.25)",
        }}>
          © 2025 Stackly Technologies Pvt. Ltd. · SEBI Reg: INZ000XXXXXX
        </div>
        <div style={{
          fontFamily: "JetBrains Mono, monospace", fontSize: "12px",
          color: "rgba(0,255,136,0.4)", display: "flex", alignItems: "center", gap: "6px",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#00FF88", boxShadow: "0 0 6px #00FF88",
          }} />
          All systems operational
        </div>
      </footer>
    </div>
  );
}