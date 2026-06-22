import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Bell, Shield, Monitor, User } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

const SECTIONS = [
  { id: "profile",        label: "Profile",       icon: User },
  { id: "appearance",    label: "Appearance",    icon: Monitor },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security",      label: "Security",      icon: Shield },
];

function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: "44px", height: "24px",
      background: value ? "#00FF88" : "rgba(255,255,255,0.08)",
      borderRadius: "100px", cursor: "pointer",
      position: "relative", transition: "background 0.25s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: "3px",
        left: value ? "23px" : "3px",
        width: "18px", height: "18px",
        background: value ? "#050A05" : "#555",
        borderRadius: "50%", transition: "left 0.25s",
      }} />
    </div>
  );
}

export default function Settings() {
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("profile");
  const [notifs, setNotifs] = useState({ price: true, orders: true, news: false });
  const [theme, setTheme] = useState("terminal");

  const inputStyle = {
    width: "100%", padding: "12px 14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px", color: "#fff",
    fontFamily: "Outfit, sans-serif", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
  };

  const SectionContent = () => (
    <motion.div key={activeSection}
      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(0,255,136,0.08)",
        borderRadius: "14px", padding: "24px",
      }}>
      {activeSection === "profile" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontFamily: "Outfit, sans-serif", margin: "0 0 4px", fontSize: "18px" }}>Profile</h2>
          {["Full Name","Email","Username"].map(f => (
            <div key={f}>
              <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "#444", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{f}</label>
              <input placeholder={f} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.35)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
            </div>
          ))}
          <button style={{
            marginTop: "4px", padding: "12px 24px", width: "fit-content",
            background: "#00FF88", color: "#050A05", border: "none",
            borderRadius: "10px", fontFamily: "Outfit, sans-serif",
            fontWeight: 700, fontSize: "14px", cursor: "pointer",
          }}>Save Changes</button>
        </div>
      )}

      {activeSection === "appearance" && (
        <div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", margin: "0 0 18px", fontSize: "18px" }}>Appearance</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
            {["terminal","midnight","carbon"].map(t => (
              <div key={t} onClick={() => setTheme(t)} style={{
                padding: "16px 18px", borderRadius: "12px", cursor: "pointer",
                border: `1px solid ${theme === t ? "#00FF88" : "rgba(255,255,255,0.06)"}`,
                background: theme === t ? "rgba(0,255,136,0.06)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
              }}>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: theme === t ? "#00FF88" : "#fff", fontWeight: 600, textTransform: "capitalize" }}>{t}</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#444", marginTop: "3px" }}>Bloomberg {t} style</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "notifications" && (
        <div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", margin: "0 0 20px", fontSize: "18px" }}>Notifications</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { key: "price",  label: "Price Alerts",  desc: "Get notified when a stock hits your target" },
              { key: "orders", label: "Order Updates",  desc: "Filled, cancelled, and pending order alerts" },
              { key: "news",   label: "Market News",   desc: "Breaking news and market updates" },
            ].map(item => (
              <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ paddingRight: "16px" }}>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "14px", color: "#fff" }}>{item.label}</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#444", marginTop: "3px" }}>{item.desc}</div>
                </div>
                <Toggle value={notifs[item.key]} onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "security" && (
        <div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", margin: "0 0 18px", fontSize: "18px" }}>Security</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {["Current Password","New Password","Confirm Password"].map(f => (
              <div key={f}>
                <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "#444", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>{f}</label>
                <input type="password" placeholder="••••••••" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.35)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              </div>
            ))}
            <button style={{
              marginTop: "4px", padding: "12px 24px", width: "fit-content",
              background: "#00FF88", color: "#050A05", border: "none",
              borderRadius: "10px", fontFamily: "Outfit, sans-serif",
              fontWeight: 700, fontSize: "14px", cursor: "pointer",
            }}>Update Password</button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#050A05", color: "#fff", paddingTop: "64px" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 40px" }}>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "Outfit, sans-serif", fontSize: isMobile ? "26px" : "32px", fontWeight: 800, marginBottom: "24px" }}>
          Settings
        </motion.h1>

        {isMobile ? (
          /* Mobile: horizontal tab scroll + content below */
          <div>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", marginBottom: "16px", paddingBottom: "4px" }}>
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveSection(id)} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "9px 14px", borderRadius: "8px", border: "none",
                  background: activeSection === id ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.03)",
                  color: activeSection === id ? "#00FF88" : "#555",
                  fontFamily: "Outfit, sans-serif", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", whiteSpace: "nowrap",
                }}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
            <SectionContent />
          </div>
        ) : (
          /* Desktop: sidebar + content */
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px" }}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,255,136,0.08)",
              borderRadius: "14px", padding: "10px",
              height: "fit-content",
            }}>
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveSection(id)} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%", padding: "11px 13px",
                  background: activeSection === id ? "rgba(0,255,136,0.1)" : "transparent",
                  border: "none",
                  borderLeft: `2px solid ${activeSection === id ? "#00FF88" : "transparent"}`,
                  borderRadius: "10px",
                  color: activeSection === id ? "#00FF88" : "#555",
                  fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: activeSection === id ? 600 : 400,
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                }}>
                  <Icon size={16} /> {label}
                </button>
              ))}
            </div>
            <SectionContent />
          </div>
        )}
      </div>
    </div>
  );
}