import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { mockOrders } from "../data/mockStocks";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

const STATUS_COLOR = { FILLED: "#00FF88", PENDING: "#FF8C00", CANCELLED: "#FF4D4D" };

export default function Orders() {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? mockOrders : mockOrders.filter(o => o.status === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#050A05", color: "#fff", paddingTop: "64px" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 40px" }}>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "Outfit, sans-serif", fontSize: isMobile ? "26px" : "32px", fontWeight: 800, marginBottom: "22px" }}>
          Order History
        </motion.h1>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {["ALL","FILLED","PENDING","CANCELLED"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "7px 16px", borderRadius: "8px", border: "none",
              background: filter === f ? "rgba(0,255,136,0.12)" : "rgba(255,255,255,0.03)",
              color: filter === f ? "#00FF88" : "#444",
              fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
              cursor: "pointer", transition: "all 0.2s",
            }}>{f}</button>
          ))}
        </div>

        {/* Mobile Cards */}
        {isMobile ? (
          filtered.map((o, i) => (
            <motion.div key={o.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px", padding: "16px 18px", marginBottom: "10px",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#fff", fontSize: "15px" }}>{o.symbol}</span>
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace", fontSize: "11px", fontWeight: 700,
                    color: o.type === "BUY" ? "#00FF88" : "#FF4D4D",
                    background: o.type === "BUY" ? "rgba(0,255,136,0.1)" : "rgba(255,77,77,0.1)",
                    border: `1px solid ${o.type === "BUY" ? "rgba(0,255,136,0.3)" : "rgba(255,77,77,0.3)"}`,
                    padding: "2px 8px", borderRadius: "5px",
                  }}>{o.type}</span>
                </div>
                <span style={{
                  fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                  color: STATUS_COLOR[o.status],
                  background: `${STATUS_COLOR[o.status]}15`,
                  border: `1px solid ${STATUS_COLOR[o.status]}40`,
                  padding: "3px 10px", borderRadius: "6px",
                }}>{o.status}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: "#555" }}>
                  Qty: {o.qty} · ${o.price.toFixed(2)}
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#333" }}>{o.time}</span>
              </div>
            </motion.div>
          ))
        ) : (
          /* Desktop Table */
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,255,136,0.08)",
            borderRadius: "16px", overflow: "hidden",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
              padding: "13px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              {["Order ID","Symbol","Type","Qty","Price","Status"].map(h => (
                <span key={h} style={{ fontFamily: "Outfit, sans-serif", fontSize: "11px", color: "#333", textTransform: "uppercase", letterSpacing: "1.5px" }}>{h}</span>
              ))}
            </div>
            {filtered.map((o, i) => (
              <motion.div key={o.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                  padding: "15px 24px", borderBottom: "1px solid rgba(255,255,255,0.03)",
                  alignItems: "center",
                }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#444" }}>{o.id}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: "#fff" }}>{o.symbol}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: o.type === "BUY" ? "#00FF88" : "#FF4D4D", fontWeight: 700 }}>{o.type}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#777" }}>{o.qty}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#fff" }}>${o.price.toFixed(2)}</span>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  background: `${STATUS_COLOR[o.status]}15`,
                  border: `1px solid ${STATUS_COLOR[o.status]}40`,
                  color: STATUS_COLOR[o.status],
                  borderRadius: "6px", padding: "3px 10px",
                  fontFamily: "JetBrains Mono, monospace", fontSize: "11px",
                  width: "fit-content",
                }}>{o.status}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}