import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StockCard({ stock, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/stock/${stock.symbol}`)}
      style={{
        background: hovered ? "rgba(0,255,136,0.06)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "14px", padding: "20px 22px",
        cursor: "pointer", transition: "all 0.25s",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "15px", fontWeight: 700, color: "#fff" }}>{stock.symbol}</div>
          <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#555", marginTop: "2px" }}>{stock.name}</div>
        </div>
        <div style={{
          background: stock.up ? "rgba(0,255,136,0.1)" : "rgba(255,77,77,0.1)",
          border: `1px solid ${stock.up ? "rgba(0,255,136,0.25)" : "rgba(255,77,77,0.25)"}`,
          borderRadius: "6px", padding: "4px 8px",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          {stock.up ? <TrendingUp size={12} color="#00FF88" /> : <TrendingDown size={12} color="#FF4D4D" />}
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: stock.up ? "#00FF88" : "#FF4D4D" }}>
            {stock.up ? "+" : ""}{stock.changePercent}%
          </span>
        </div>
      </div>

      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "24px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
        ${stock.price.toFixed(2)}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#444" }}>Vol: {stock.volume}</span>
        <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#444" }}>MCap: {stock.marketCap}</span>
      </div>
    </motion.div>
  );
}