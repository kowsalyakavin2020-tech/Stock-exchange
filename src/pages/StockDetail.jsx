import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "../components/Navbar";
import { mockStocks, chartData } from "../data/mockStocks";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

export default function StockDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const stock = mockStocks.find(s => s.symbol === symbol) || mockStocks[0];

  return (
    <div style={{ minHeight: "100vh", background: "#050A05", color: "#fff", paddingTop: "64px" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 40px" }}>

        <button onClick={() => navigate(-1)} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "none", border: "none", color: "#555",
          fontFamily: "Outfit, sans-serif", fontSize: "14px",
          cursor: "pointer", marginBottom: "20px", padding: 0,
        }}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-start",
            gap: isMobile ? "12px" : "0",
            marginBottom: "28px",
          }}>
          <div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: isMobile ? "28px" : "36px", fontWeight: 800, color: "#fff" }}>{stock.symbol}</div>
            <div style={{ fontFamily: "Outfit, sans-serif", color: "#444", fontSize: "14px", marginTop: "4px" }}>{stock.name}</div>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right" }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: isMobile ? "30px" : "40px", fontWeight: 700, color: "#fff" }}>
              ${stock.price.toFixed(2)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: isMobile ? "flex-start" : "flex-end", marginTop: "4px" }}>
              {stock.up ? <TrendingUp size={15} color="#00FF88" /> : <TrendingDown size={15} color="#FF4D4D" />}
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: stock.up ? "#00FF88" : "#FF4D4D" }}>
                {stock.up ? "+" : ""}{stock.change} ({stock.changePercent}%)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,255,136,0.1)",
            borderRadius: "16px", padding: isMobile ? "16px" : "24px",
            marginBottom: "20px",
          }}>
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00FF88" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#222" tick={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fill: "#444" }} />
              <YAxis stroke="#222" tick={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fill: "#444" }} domain={["auto","auto"]} />
              <Tooltip contentStyle={{ background: "#0A0F0A", border: "1px solid #00FF88", borderRadius: "8px", fontFamily: "JetBrains Mono, monospace" }} />
              <Area type="monotone" dataKey="value" stroke="#00FF88" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Info Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap: "12px",
        }}>
          {[
            { label: "Volume",    value: stock.volume },
            { label: "Mkt Cap",   value: stock.marketCap },
            { label: "Sector",    value: stock.sector },
            { label: "52W High",  value: `$${(stock.price * 1.18).toFixed(2)}` },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px", padding: "16px",
              }}>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "#444", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "7px" }}>{item.label}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: isMobile ? "15px" : "17px", color: "#fff", fontWeight: 600 }}>{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}