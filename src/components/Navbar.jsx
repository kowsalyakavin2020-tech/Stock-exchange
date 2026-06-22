import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart2, Briefcase, ShoppingCart, Settings, LogOut, Menu, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: BarChart2 },
  { label: "Portfolio",  path: "/portfolio", icon: Briefcase },
  { label: "Orders",     path: "/orders",    icon: ShoppingCart },
  { label: "Settings",   path: "/settings",  icon: Settings },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "64px",
        background: "rgba(5,10,5,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,136,0.1)",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}>
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{
            fontFamily: "Outfit, sans-serif", fontWeight: 800,
            fontSize: "20px", color: "#00FF88", cursor: "pointer",
            letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          <TrendingUp size={20} color="#00FF88" />
          STACKLY
        </div>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "4px" }}>
            {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
              const active = pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  style={{
                    display: "flex", alignItems: "center", gap: "7px",
                    padding: "8px 16px", borderRadius: "8px", border: "none",
                    background: active ? "rgba(0,255,136,0.12)" : "transparent",
                    color: active ? "#00FF88" : "#666",
                    fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 500,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#aaa"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#666"; }}
                >
                  <Icon size={15} /> {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* LIVE badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(0,255,136,0.06)",
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "8px", padding: "5px 10px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#00FF88", display: "inline-block",
              boxShadow: "0 0 6px #00FF88",
              animation: "pulse 1.5s infinite",
            }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#00FF88" }}>LIVE</span>
          </div>

          {/* Desktop logout */}
          {!isMobile && (
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                color: "#666", borderRadius: "8px", padding: "7px 14px",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                fontFamily: "Outfit, sans-serif", fontSize: "13px",
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: menuOpen ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${menuOpen ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "8px", padding: "8px",
                cursor: "pointer", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              {menuOpen ? <X size={20} color="#00FF88" /> : <Menu size={20} color="#888" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 150,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed", top: "64px", left: 0, right: 0,
                zIndex: 160,
                background: "rgba(5,10,5,0.98)",
                borderBottom: "1px solid rgba(0,255,136,0.12)",
                padding: "12px 16px 20px",
              }}
            >
              {NAV_ITEMS.map(({ label, path, icon: Icon }, i) => {
                const active = pathname === path;
                return (
                  <motion.button
                    key={path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(path)}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      width: "100%", padding: "14px 16px",
                      background: active ? "rgba(0,255,136,0.08)" : "transparent",
                      border: "none",
                      borderLeft: `3px solid ${active ? "#00FF88" : "transparent"}`,
                      borderRadius: "10px",
                      color: active ? "#00FF88" : "#888",
                      fontFamily: "Outfit, sans-serif", fontSize: "15px", fontWeight: active ? 600 : 400,
                      cursor: "pointer", textAlign: "left", marginBottom: "4px",
                      transition: "all 0.2s",
                    }}
                  >
                    <Icon size={18} /> {label}
                  </motion.button>
                );
              })}

              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "8px 0 12px" }} />

              <button
                onClick={() => navigate("/login")}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  width: "100%", padding: "14px 16px",
                  background: "transparent", border: "none",
                  color: "#555", fontFamily: "Outfit, sans-serif",
                  fontSize: "15px", cursor: "pointer", borderRadius: "10px",
                }}
              >
                <LogOut size={18} /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}