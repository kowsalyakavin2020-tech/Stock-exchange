import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../components/Navbar";
import { mockPortfolio } from "../data/mockStocks";
import { TrendingUp, TrendingDown } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

const COLORS = ["#00FF88","#00CC6A","#009950","#FF4D4D","#FF8C00"];

export default function Portfolio() {
  const isMobile = useIsMobile();

  const rows = mockPortfolio.map(p => ({
    ...p,
    currentValue: p.shares * p.currentPrice,
    pnl: (p.currentPrice - p.avgPrice) * p.shares,
    pnlPct: ((p.currentPrice - p.avgPrice) / p.avgPrice) * 100,
  }));

  const total = rows.reduce((s, r) => s + r.currentValue, 0);
  const pieData = rows.map(r => ({ name: r.symbol, value: +r.currentValue.toFixed(2) }));

  return (
    <div style={{ minHeight: "100vh", background: "#050A05", color: "#fff", paddingTop: "64px" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 40px" }}>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "Outfit, sans-serif", fontSize: isMobile ? "26px" : "32px", fontWeight: 800, marginBottom: "6px" }}>
          My Portfolio
        </motion.h1>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "#444", marginBottom: "28px" }}>
          Total Value: <span style={{ color: "#00FF88" }}>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
          gap: "20px",
        }}>
          {/* Mobile Cards / Desktop Table */}
          <div>
            {isMobile ? (
              rows.map((r, i) => (
                <motion.div key={r.symbol}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(0,255,136,0.08)",
                    borderRadius: "12px", padding: "16px 18px", marginBottom: "10px",
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "16px", color: "#fff" }}>{r.symbol}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: r.pnl >= 0 ? "#00FF88" : "#FF4D4D", display: "flex", alignItems: "center", gap: "4px" }}>
                      {r.pnl >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {r.pnl >= 0 ? "+" : ""}${r.pnl.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                    {[
                      { label: "Shares",  value: r.shares },
                      { label: "Avg",     value: `$${r.avgPrice.toFixed(2)}` },
                      { label: "Current", value: `$${r.currentPrice.toFixed(2)}` },
                    ].map(item => (
                      <div key={item.label}>
                        <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "#444", marginBottom: "3px" }}>{item.label}</div>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "#999" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,255,136,0.08)",
                borderRadius: "16px", overflow: "hidden",
              }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  padding: "13px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  {["Symbol","Shares","Avg Price","Current","P&L"].map(h => (
                    <span key={h} style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "#333", textTransform: "uppercase", letterSpacing: "1.5px" }}>{h}</span>
                  ))}
                </div>
                {rows.map((r, i) => (
                  <motion.div key={r.symbol}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                      padding: "15px 24px", borderBottom: "1px solid rgba(255,255,255,0.03)",
                      alignItems: "center",
                    }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#fff" }}>{r.symbol}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#777" }}>{r.shares}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#777" }}>${r.avgPrice.toFixed(2)}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#fff" }}>${r.currentPrice.toFixed(2)}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: r.pnl >= 0 ? "#00FF88" : "#FF4D4D", display: "flex", alignItems: "center", gap: "4px" }}>
                      {r.pnl >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {r.pnl >= 0 ? "+" : ""}${r.pnl.toFixed(2)} ({r.pnlPct.toFixed(2)}%)
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,255,136,0.08)",
              borderRadius: "16px", padding: "22px",
              height: "fit-content",
            }}>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#444", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "2px" }}>Allocation</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={78} paddingAngle={3}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={v => `$${v.toLocaleString()}`}
                  contentStyle={{ background: "#0A0F0A", border: "1px solid #00FF88", borderRadius: "8px", fontFamily: "JetBrains Mono, monospace" }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "14px" }}>
              {pieData.map((p, i) => (
                <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS[i % COLORS.length] }} />
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#777" }}>{p.name}</span>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#fff" }}>
                    {((p.value / total) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}