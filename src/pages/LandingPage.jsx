import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart2, Shield, Zap, Globe, ChevronRight, ArrowUpRight, Menu, X } from "lucide-react";

function FallingLinesCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(0).map(() => Math.random() * -100);
    const chars = "01アイウエオカキクケコ▲▼◆ABCDEF0123456789";
    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 5, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.95 ? 1 : 0.15;
        ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
        ctx.font = `12px JetBrains Mono, monospace`;
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 0.5;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      zIndex: 0, opacity: 0.35, pointerEvents: "none",
    }} />
  );
}

const tickerData = [
  { sym: "AAPL", price: "189.43", change: "+1.24", up: true },
  { sym: "TSLA", price: "242.10", change: "-3.87", up: false },
  { sym: "NVDA", price: "875.65", change: "+12.40", up: true },
  { sym: "GOOGL", price: "141.22", change: "+0.98", up: true },
  { sym: "AMZN", price: "178.55", change: "-1.10", up: false },
  { sym: "MSFT", price: "415.30", change: "+2.75", up: true },
  { sym: "META", price: "512.88", change: "+6.33", up: true },
  { sym: "NIFTY", price: "22,450", change: "+145.2", up: true },
  { sym: "SENSEX", price: "73,812", change: "-230.4", up: false },
  { sym: "BTC", price: "67,204", change: "+1,420", up: true },
];

function LiveTicker() {
  const items = [...tickerData, ...tickerData];
  return (
    <div style={{
      width: "100%", overflow: "hidden",
      background: "rgba(0,255,136,0.04)",
      borderTop: "1px solid rgba(0,255,136,0.2)",
      borderBottom: "1px solid rgba(0,255,136,0.2)",
      padding: "10px 0", position: "relative", zIndex: 10,
    }}>
      <motion.div
        style={{ display: "flex", gap: "48px", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "JetBrains Mono, monospace", fontSize: "13px",
          }}>
            <span style={{ color: "#888", letterSpacing: "0.1em" }}>{t.sym}</span>
            <span style={{ color: "#e8f5e8", fontWeight: 600 }}>{t.price}</span>
            <span style={{ color: t.up ? "#00FF88" : "#FF4466", display: "flex", alignItems: "center", gap: "2px" }}>
              {t.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{t.change}
            </span>
            <span style={{ color: "rgba(0,255,136,0.2)", marginLeft: "16px" }}>│</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function CountUp({ target, prefix = "", suffix = "", duration = 2000 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const isFloat = target % 1 !== 0;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target);
      setVal(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  const formatted = target >= 1000 ? val.toLocaleString("en-IN") : val;
  return <span ref={ref} style={{ fontFamily: "JetBrains Mono, monospace" }}>{prefix}{formatted}{suffix}</span>;
}

function CandlestickChart() {
  const candles = [
    { x: 30,  open: 120, close: 145, high: 155, low: 110, up: true  },
    { x: 80,  open: 145, close: 132, high: 150, low: 125, up: false },
    { x: 130, open: 132, close: 160, high: 168, low: 128, up: true  },
    { x: 180, open: 160, close: 155, high: 172, low: 148, up: false },
    { x: 230, open: 155, close: 178, high: 185, low: 150, up: true  },
    { x: 280, open: 178, close: 192, high: 200, low: 172, up: true  },
    { x: 330, open: 192, close: 175, high: 198, low: 168, up: false },
    { x: 380, open: 175, close: 210, high: 218, low: 170, up: true  },
  ];
  const scaleY = (val) => 250 - ((val - 100) / 130) * 200;
  return (
    <svg viewBox="0 0 430 260" style={{ width: "100%", maxWidth: "480px", height: "auto" }}>
      {[100, 140, 180, 220].map((v, i) => (
        <line key={i} x1="10" x2="420" y1={scaleY(v)} y2={scaleY(v)}
          stroke="rgba(0,255,136,0.08)" strokeWidth="1" strokeDasharray="4 4" />
      ))}
      {candles.map((c, i) => {
        const top = scaleY(Math.max(c.open, c.close));
        const bot = scaleY(Math.min(c.open, c.close));
        const h = Math.max(bot - top, 2);
        const color = c.up ? "#00FF88" : "#FF4466";
        const delay = i * 0.12;
        return (
          <g key={i}>
            <motion.line x1={c.x} x2={c.x} y1={scaleY(c.high)} y2={scaleY(c.low)}
              stroke={color} strokeWidth="1.5"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ delay, duration: 0.4, ease: "easeOut" }} />
            <motion.rect x={c.x - 12} y={top} width={24} height={h}
              fill={c.up ? "rgba(0,255,136,0.25)" : "rgba(255,68,102,0.25)"}
              stroke={color} strokeWidth="1.5" rx="1"
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${c.x}px ${top + h / 2}px` }}
              transition={{ delay: delay + 0.1, duration: 0.35, ease: "easeOut" }} />
          </g>
        );
      })}
      <motion.polyline
        points={candles.map((c) => `${c.x},${scaleY(c.close)}`).join(" ")}
        fill="none" stroke="rgba(0,255,136,0.5)" strokeWidth="1.5"
        strokeDasharray="600"
        initial={{ strokeDashoffset: 600 }} animate={{ strokeDashoffset: 0 }}
        transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }} />
    </svg>
  );
}

function GlassCard({ children, style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,255,136,0.15)",
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "28px",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── நான்கு nav items — AppRoutes-ல உள்ள paths-க்கு map பண்ணியிருக்கேன்
const navLinks = [
  { label: "Markets",   path: "/dashboard" },
  { label: "Portfolio", path: "/portfolio"  },
  { label: "Orders",    path: "/orders"     },
  { label: "Analytics", path: "/dashboard"  },
  { label: "Contact",   path: "/contact"    },
];

function Navbar() {
  const navigate = useNavigate(); // ✅ useNavigate add பண்ணியிருக்கேன்
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: "64px",
          background: scrolled || menuOpen ? "rgba(5,10,5,0.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(0,255,136,0.12)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => { window.location.href = "/"; }}
          style={{ display: "flex", alignItems: "center", gap: "10px", zIndex: 101, cursor: "pointer" }}
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
          }}>
            Stackly
          </span>
        </div>

        {/* Desktop Links — ✅ href="#" நீக்கி onClick navigate பண்ணியிருக்கேன் */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "36px" }}>
            {navLinks.map((item) => (
              <span
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{
                  fontFamily: "Outfit, sans-serif", fontSize: "14px",
                  color: "rgba(232,245,232,0.55)", textDecoration: "none",
                  letterSpacing: "0.02em", transition: "color 0.2s", cursor: "pointer",
                }}
                onMouseEnter={e => e.target.style.color = "#00FF88"}
                onMouseLeave={e => e.target.style.color = "rgba(232,245,232,0.55)"}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}

        {/* Desktop Buttons */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                fontFamily: "Outfit, sans-serif", fontSize: "13px",
                color: "#00FF88", background: "transparent",
                border: "1px solid rgba(0,255,136,0.3)",
                padding: "8px 20px", borderRadius: "6px", cursor: "pointer",
              }}>Login</button>
            <button
              onClick={() => navigate("/login")}
              style={{
                fontFamily: "Outfit, sans-serif", fontSize: "13px",
                color: "#050A05", background: "#00FF88",
                border: "none", padding: "8px 20px",
                borderRadius: "6px", cursor: "pointer", fontWeight: 600,
              }}>Get Started</button>
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent", border: "none",
              color: "#00FF88", cursor: "pointer", padding: "8px", zIndex: 101,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </motion.nav>

      {/* Mobile Drawer — ✅ href="#" நீக்கி onClick navigate பண்ணியிருக்கேன் */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "80%", maxWidth: "320px",
              background: "rgba(5,10,5,0.98)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(0,255,136,0.15)",
              zIndex: 99, display: "flex", flexDirection: "column",
              paddingTop: "80px", paddingLeft: "32px",
              paddingRight: "32px", paddingBottom: "40px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  onClick={() => { navigate(item.path); setMenuOpen(false); }}
                  style={{
                    fontFamily: "Outfit, sans-serif", fontSize: "22px", fontWeight: 600,
                    color: "rgba(232,245,232,0.7)", textDecoration: "none", cursor: "pointer",
                    padding: "14px 0", borderBottom: "1px solid rgba(0,255,136,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#00FF88"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(232,245,232,0.7)"}
                >
                  {item.label}
                  <ChevronRight size={16} color="rgba(0,255,136,0.4)" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                style={{
                  fontFamily: "Outfit, sans-serif", fontSize: "15px",
                  color: "#050A05", background: "#00FF88",
                  border: "none", padding: "16px", borderRadius: "8px",
                  cursor: "pointer", fontWeight: 700,
                }}>Get Started Free</button>
              <button
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                style={{
                  fontFamily: "Outfit, sans-serif", fontSize: "15px",
                  color: "#00FF88", background: "transparent",
                  border: "1px solid rgba(0,255,136,0.3)",
                  padding: "14px", borderRadius: "8px", cursor: "pointer",
                }}>Login</button>
            </motion.div>

            <div style={{
              marginTop: "24px", fontFamily: "JetBrains Mono, monospace",
              fontSize: "11px", color: "rgba(0,255,136,0.4)",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#00FF88", boxShadow: "0 0 6px #00FF88",
              }} />
              All systems operational
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 98 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const stats = [
  { label: "Active Traders", value: 2400000, suffix: "+", prefix: "" },
  { label: "Daily Volume",   value: 4.8,     suffix: "B", prefix: "₹" },
  { label: "Listed Stocks",  value: 8500,    suffix: "+", prefix: "" },
  { label: "Uptime SLA",     value: 99.9,    suffix: "%", prefix: "" },
];

const features = [
  { icon: <Zap size={20} />, title: "Sub-10ms Execution", desc: "Co-located servers with direct market access. Your orders reach the exchange before anyone else." },
  { icon: <BarChart2 size={20} />, title: "Advanced Charting", desc: "50+ technical indicators, multi-timeframe analysis, and real-time candlestick rendering." },
  { icon: <Shield size={20} />, title: "Bank-Grade Security", desc: "256-bit encryption, 2FA, and biometric authentication. Your capital is always protected." },
  { icon: <Globe size={20} />, title: "Global Markets", desc: "Trade NSE, BSE, NYSE, NASDAQ and 40+ global exchanges from one unified terminal." },
];

export default function LandingPage() {
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
      overflowX: "hidden", position: "relative",
    }}>
      <FallingLinesCanvas />

      <div style={{
        position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "500px",
        background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      <Navbar />

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: isMobile ? "0 20px" : "0 48px",
        paddingTop: isMobile ? "100px" : "80px", position: "relative", zIndex: 5,
        maxWidth: "1280px", margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "40px" : "60px",
          alignItems: "center",
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)",
                borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#00FF88",
                boxShadow: "0 0 6px #00FF88", animation: "pulse 2s infinite",
              }} />
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                color: "#00FF88", letterSpacing: "0.08em",
              }}>LIVE MARKET · NSE/BSE OPEN</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: isMobile ? "42px" : "clamp(42px, 5.5vw, 72px)",
                fontWeight: 900, lineHeight: 1.05,
                letterSpacing: "-0.03em", margin: "0 0 20px 0", color: "#e8f5e8",
              }}
            >
              Trade at the{" "}
              <span style={{
                background: "linear-gradient(135deg, #00FF88 0%, #00CCAA 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Speed of<br />Markets
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                fontSize: isMobile ? "15px" : "17px", lineHeight: 1.7,
                color: "rgba(232,245,232,0.55)", maxWidth: "480px", margin: "0 0 36px 0",
              }}
            >
              Institutional-grade execution. Real-time data feeds. Advanced analytics.
              Everything you need to trade NSE, BSE, and global markets — in one terminal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0,255,136,0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/login")}
                style={{
                  background: "#00FF88", color: "#050A05", border: "none",
                  padding: "15px 28px", borderRadius: "8px", fontSize: "15px",
                  fontWeight: 700, fontFamily: "Outfit, sans-serif", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                Open Free Account <ArrowUpRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ borderColor: "rgba(0,255,136,0.5)", color: "#00FF88" }}
                onClick={() => navigate("/dashboard")}
                style={{
                  background: "transparent", color: "rgba(232,245,232,0.6)",
                  border: "1px solid rgba(232,245,232,0.15)", padding: "15px 24px",
                  borderRadius: "8px", fontSize: "15px", fontFamily: "Outfit, sans-serif",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px", transition: "all 0.25s",
                }}
              >
                Live Demo <ChevronRight size={16} />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{
                marginTop: "28px", display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                color: "rgba(232,245,232,0.3)",
              }}
            >
              <Shield size={12} color="#00FF88" />
              <span>SEBI Registered · Encrypted · Zero Hidden Charges</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: isMobile ? 20 : 0, x: isMobile ? 0 : 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard style={{ padding: "24px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", marginBottom: "20px",
              }}>
                <div>
                  <div style={{
                    fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                    color: "rgba(0,255,136,0.6)", letterSpacing: "0.12em", marginBottom: "6px",
                  }}>NIFTY 50 · NSE</div>
                  <div style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: 700, color: "#e8f5e8", letterSpacing: "-0.02em",
                  }}>
                    22,450<span style={{ fontSize: "16px", color: "rgba(232,245,232,0.4)" }}>.30</span>
                  </div>
                </div>
                <div style={{
                  background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)",
                  borderRadius: "6px", padding: "6px 12px",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "13px",
                  color: "#00FF88", display: "flex", alignItems: "center", gap: "4px",
                }}>
                  <TrendingUp size={13} /> +1.24%
                </div>
              </div>
              <CandlestickChart />
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px", marginTop: "20px",
                borderTop: "1px solid rgba(0,255,136,0.08)", paddingTop: "16px",
              }}>
                {[
                  { label: "Volume", val: "₹4.2B" },
                  { label: "52W High", val: "23,110" },
                  { label: "52W Low", val: "18,834" },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: "JetBrains Mono, monospace", fontSize: "10px",
                      color: "rgba(232,245,232,0.3)", letterSpacing: "0.1em", marginBottom: "4px",
                    }}>{s.label}</div>
                    <div style={{
                      fontFamily: "JetBrains Mono, monospace", fontSize: "14px",
                      color: "#e8f5e8", fontWeight: 600,
                    }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <div style={{ position: "relative", zIndex: 10 }}>
        <LiveTicker />
      </div>

      {/* STATS */}
      <section style={{
        position: "relative", zIndex: 5,
        padding: isMobile ? "60px 20px" : "80px 48px",
        maxWidth: "1280px", margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "16px",
        }}>
          {stats.map((s, i) => (
            <GlassCard key={s.label} delay={i * 0.1} style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: isMobile ? "26px" : "36px",
                fontWeight: 700, color: "#00FF88",
                letterSpacing: "-0.02em", marginBottom: "8px",
                textShadow: "0 0 20px rgba(0,255,136,0.3)",
              }}>
                <CountUp target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div style={{
                fontSize: "11px", color: "rgba(232,245,232,0.45)",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        position: "relative", zIndex: 5,
        padding: isMobile ? "0 20px 80px" : "0 48px 100px",
        maxWidth: "1280px", margin: "0 auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: "40px" }}
        >
          <div style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
            color: "#00FF88", letterSpacing: "0.15em", marginBottom: "14px",
            textTransform: "uppercase",
          }}>Why Stackly</div>
          <h2 style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: isMobile ? "28px" : "clamp(28px, 3.5vw, 44px)",
            fontWeight: 800, letterSpacing: "-0.02em",
            lineHeight: 1.1, margin: 0, color: "#e8f5e8",
          }}>
            Built for serious traders,<br />
            <span style={{ color: "rgba(232,245,232,0.35)" }}>not casual investors.</span>
          </h2>
        </motion.div>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: "16px",
        }}>
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.1}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div style={{
                width: 40, height: 40, background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.2)", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#00FF88",
              }}>{f.icon}</div>
              <div style={{
                fontFamily: "Outfit, sans-serif", fontSize: "17px",
                fontWeight: 700, color: "#e8f5e8",
              }}>{f.title}</div>
              <div style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(232,245,232,0.5)" }}>
                {f.desc}
              </div>
              <div style={{
                marginTop: "auto", display: "flex", alignItems: "center", gap: "6px",
                fontFamily: "JetBrains Mono, monospace", fontSize: "12px",
                color: "#00FF88", cursor: "pointer",
              }}>
                Learn more <ChevronRight size={12} />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* IMAGE STRIP */}
      <section style={{
        position: "relative", zIndex: 5,
        padding: isMobile ? "0 20px 80px" : "0 48px 100px",
        maxWidth: "1280px", margin: "0 auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "16px", overflow: "hidden",
            border: "1px solid rgba(0,255,136,0.12)", position: "relative",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop"
            alt="Trading Terminal"
            style={{
              width: "100%", height: isMobile ? "280px" : "360px",
              objectFit: "cover", display: "block",
              filter: "brightness(0.4) saturate(0.6)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", padding: "24px",
            background: "linear-gradient(to right, rgba(5,10,5,0.8) 0%, transparent 50%, rgba(5,10,5,0.8) 100%)",
          }}>
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
              color: "#00FF88", letterSpacing: "0.15em", marginBottom: "12px",
            }}>STACKLY TERMINAL</div>
            <h3 style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: isMobile ? "22px" : "clamp(24px, 3vw, 38px)",
              fontWeight: 800, color: "#e8f5e8", textAlign: "center",
              letterSpacing: "-0.02em", margin: "0 0 24px 0",
            }}>Where Data Becomes Decisions</h3>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,136,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/login")}
              style={{
                background: "#00FF88", color: "#050A05", border: "none",
                padding: "14px 36px", borderRadius: "8px", fontSize: "15px",
                fontWeight: 700, fontFamily: "Outfit, sans-serif", cursor: "pointer",
              }}
            >Start Trading Free</motion.button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: "relative", zIndex: 5,
        borderTop: "1px solid rgba(0,255,136,0.08)",
        padding: isMobile ? "48px 20px 32px" : "64px 48px 40px",
        maxWidth: "1280px", margin: "0 auto",
      }}>
        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr",
          gap: isMobile ? "40px" : "48px",
          marginBottom: "48px",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: 32, height: 32,
                background: "linear-gradient(135deg, #00FF88, #00CC66)",
                borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <BarChart2 size={18} color="#050A05" strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: "Outfit, sans-serif", fontSize: "18px",
                fontWeight: 700, color: "#e8f5e8",
              }}>Stackly</span>
            </div>
            <p style={{
              fontSize: "13px", color: "rgba(232,245,232,0.4)",
              lineHeight: 1.7, maxWidth: "260px", margin: "0 0 20px 0",
            }}>
              Institutional-grade trading for everyone. NSE · BSE · Global markets in one terminal.
            </p>
            {/* Address */}
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
              color: "rgba(232,245,232,0.3)", lineHeight: 1.8,
            }}>
              <div>MMR Complex, Chinna Thirupathi,</div>
              <div>Near Chinna Muniyappan Kovil,</div>
              <div>Salem, Tamil Nadu – 636008</div>
              <div style={{ marginTop: "8px", color: "rgba(0,255,136,0.5)" }}>📞 +91 80 4567 8900</div>
              <div style={{ color: "rgba(0,255,136,0.5)" }}>✉ support@stackly.in</div>
            </div>
          </div>

          {/* Products */}
          <div>
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "10px",
              color: "rgba(0,255,136,0.5)", letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "16px",
            }}>Platform</div>
            {["Markets", "Portfolio", "Orders", "Analytics", "Live Demo"].map((item) => (
              <div key={item} style={{
                fontSize: "13px", color: "rgba(232,245,232,0.45)",
                marginBottom: "10px", cursor: "pointer", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#00FF88"}
                onMouseLeave={e => e.target.style.color = "rgba(232,245,232,0.45)"}
              >{item}</div>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "10px",
              color: "rgba(0,255,136,0.5)", letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "16px",
            }}>Company</div>
            {["About Us", "Careers", "Press", "Contact", "Blog"].map((item) => (
              <div key={item} style={{
                fontSize: "13px", color: "rgba(232,245,232,0.45)",
                marginBottom: "10px", cursor: "pointer", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#00FF88"}
                onMouseLeave={e => e.target.style.color = "rgba(232,245,232,0.45)"}
              >{item}</div>
            ))}
          </div>

          {/* Legal + Social */}
          <div>
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "10px",
              color: "rgba(0,255,136,0.5)", letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "16px",
            }}>Legal</div>
            {["Privacy Policy", "Terms of Service", "Risk Disclosure", "Grievance"].map((item) => (
              <div key={item} style={{
                fontSize: "13px", color: "rgba(232,245,232,0.45)",
                marginBottom: "10px", cursor: "pointer", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#00FF88"}
                onMouseLeave={e => e.target.style.color = "rgba(232,245,232,0.45)"}
              >{item}</div>
            ))}

            {/* Social Icons */}
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "10px",
              color: "rgba(0,255,136,0.5)", letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "12px", marginTop: "24px",
            }}>Follow Us</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { icon: "𝕏", label: "Twitter" },
                { icon: "in", label: "LinkedIn" },
                { icon: "▶", label: "YouTube" },
                { icon: "📷", label: "Instagram" },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => navigate("/404")}
                  title={s.label}
                  style={{
                    width: 36, height: 36,
                    background: "rgba(0,255,136,0.06)",
                    border: "1px solid rgba(0,255,136,0.15)",
                    borderRadius: "8px", cursor: "pointer",
                    color: "#e8f5e8", fontSize: "14px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,255,136,0.15)";
                    e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(0,255,136,0.06)";
                    e.currentTarget.style.borderColor = "rgba(0,255,136,0.15)";
                  }}
                >{s.icon}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(0,255,136,0.06)",
          paddingTop: "24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "12px",
        }}>
          <div style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
            color: "rgba(232,245,232,0.2)",
          }}>
            © 2025 Stackly Technologies Pvt. Ltd. · SEBI Reg: INZ000XXXXXX · CIN: U74999KA2024PTC000000
          </div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
            color: "rgba(0,255,136,0.4)", display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#00FF88", boxShadow: "0 0 6px #00FF88",
            }} />
            All systems operational
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00FF88; }
          50%       { opacity: 0.5; box-shadow: 0 0 12px #00FF88; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}