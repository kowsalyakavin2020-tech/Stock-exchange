import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("login");

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px", color: "#fff",
    fontFamily: "Outfit, sans-serif", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
    transition: "border 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#050A05",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Outfit, sans-serif", padding: "20px",
    }}>
      {/* BG glow */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%", maxWidth: "420px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,255,136,0.12)",
          borderRadius: "20px", padding: "40px",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <TrendingUp size={24} color="#00FF88" />
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "22px", color: "#00FF88" }}>STACKLY</span>
          </div>
          <p style={{ color: "#444", fontSize: "13px", margin: 0 }}>Institutional-grade trading terminal</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
          {["login", "register"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: "9px", border: "none", borderRadius: "8px",
                background: tab === t ? "rgba(0,255,136,0.12)" : "transparent",
                color: tab === t ? "#00FF88" : "#555",
                fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s",
              }}
            >
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {tab === "register" && (
            <input
              placeholder="Full Name"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          )}
          <input
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.4)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: "44px" }}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,136,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <button
              onClick={() => setShowPass(!showPass)}
              style={{
                position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#555", padding: 0,
              }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%", padding: "14px",
              background: loading ? "rgba(0,255,136,0.5)" : "#00FF88",
              color: "#050A05", border: "none", borderRadius: "10px",
              fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "15px",
              cursor: "pointer", marginTop: "4px", transition: "all 0.2s",
            }}
          >
            {loading ? "Connecting..." : tab === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#333", marginTop: "24px", lineHeight: 1.6 }}>
          By continuing you agree to Stackly's{" "}
          <span style={{ color: "#00FF88", cursor: "pointer" }}>Terms of Service</span>
        </p>
      </motion.div>
    </div>
  );
}