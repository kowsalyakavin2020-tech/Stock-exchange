import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Activity, Percent } from "lucide-react";
import Navbar from "../components/Navbar";
import StockCard from "../components/StockCard";
import { mockStocks, chartData, mockPortfolio } from "../data/mockStocks";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

const totalValue = mockPortfolio.reduce((s, p) => s + p.shares * p.currentPrice, 0);
const totalCost  = mockPortfolio.reduce((s, p) => s + p.shares * p.avgPrice, 0);
const totalPnL   = totalValue - totalCost;

const STAT_CARDS = [
  { label: "Portfolio Value", value: `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: DollarSign },
  { label: "Total P&L",       value: `+$${totalPnL.toFixed(2)}`, icon: TrendingUp },
  { label: "Day Change",      value: "+2.34%", icon: Percent },
  { label: "Positions",       value: `${mockPortfolio.length}`, icon: Activity },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(5,10,5,0.95)", border: "1px solid rgba(0,255,136,0.2)",
      borderRadius: "8px", padding: "10px 14px",
    }}>
      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#555" }}>{label}</div>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "16px", color: "#00FF88", fontWeight: 700 }}>
        ${payload[0].value}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? mockStocks
    : mockStocks.filter(s => activeTab === "gainers" ? s.up : !s.up);

  return (
    <div style={{ minHeight: "100vh", background: "#050A05", color: "#fff", paddingTop: "64px" }}>
      <Navbar />
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 40px" }}>

        {/* Stat Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
          gap: "12px", marginBottom: "24px",
        }}>
          {STAT_CARDS.map((card, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,255,136,0.1)",
                borderRadius: "14px", padding: isMobile ? "16px" : "22px 24px",
                backdropFilter: "blur(10px)",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "12px", color: "#444" }}>{card.label}</span>
                <card.icon size={14} color="#00FF88" />
              </div>
              <div style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: isMobile ? "16px" : "20px",
                fontWeight: 700, color: "#fff",
              }}>{card.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,255,136,0.1)",
            borderRadius: "16px", padding: isMobile ? "18px 16px" : "28px",
            marginBottom: "24px",
          }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", color: "#444", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px" }}>NVDA · Today</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: isMobile ? "22px" : "28px", color: "#fff", fontWeight: 700 }}>$875.33</div>
            </div>
            <div style={{ color: "#00FF88", fontFamily: "JetBrains Mono, monospace", fontSize: "13px", display: "flex", alignItems: "center", gap: "5px" }}>
              <TrendingUp size={14} /> +12.54 (1.45%)
            </div>
          </div>
          <ResponsiveContainer width="100%" height={isMobile ? 160 : 220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00FF88" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#222" tick={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fill: "#444" }} />
              <YAxis stroke="#222" tick={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fill: "#444" }} domain={["auto","auto"]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#00FF88" strokeWidth={2} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {["all","gainers","losers"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "7px 18px", borderRadius: "8px", border: "none",
              background: activeTab === tab ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.03)",
              color: activeTab === tab ? "#00FF88" : "#444",
              fontFamily: "Outfit, sans-serif", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s",
            }}>{tab}</button>
          ))}
        </div>

        {/* Stock Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px,1fr))",
          gap: "14px",
        }}>
          {filtered.map((s, i) => <StockCard key={s.id} stock={s} delay={i * 0.05} />)}
        </div>
      </div>
    </div>
  );
}