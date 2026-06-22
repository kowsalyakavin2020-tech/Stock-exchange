import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh", background: "#050A05",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "Outfit, sans-serif", color: "#e8f5e8",
      textAlign: "center", padding: "24px",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{
          width: 56, height: 56,
          background: "linear-gradient(135deg, #00FF88, #00CC66)",
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <BarChart2 size={28} color="#050A05" strokeWidth={2.5} />
        </div>

        <div style={{
          fontFamily: "JetBrains Mono, monospace", fontSize: "80px",
          fontWeight: 900, color: "#00FF88",
          lineHeight: 1, marginBottom: "16px",
          textShadow: "0 0 40px rgba(0,255,136,0.3)",
        }}>404</div>

        <h1 style={{
          fontSize: "24px", fontWeight: 700,
          color: "#e8f5e8", margin: "0 0 12px",
        }}>Page Not Found</h1>

        <p style={{
          fontSize: "14px", color: "rgba(232,245,232,0.45)",
          marginBottom: "36px", maxWidth: "320px",
        }}>
          This page is not available yet. Check back soon.
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "#00FF88", color: "#050A05",
            border: "none", padding: "14px 32px",
            borderRadius: "8px", fontSize: "15px",
            fontWeight: 700, cursor: "pointer",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}