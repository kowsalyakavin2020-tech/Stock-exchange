import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Briefcase, ShoppingCart, TrendingUp, Settings, LogOut } from "lucide-react";

const ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Markets",   path: "/",          icon: TrendingUp },
  { label: "Portfolio", path: "/portfolio", icon: Briefcase },
  { label: "Orders",    path: "/orders",    icon: ShoppingCart },
  { label: "Settings",  path: "/settings",  icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside style={{
      position: "fixed", top: "64px", left: 0, bottom: 0,
      width: "220px", zIndex: 100,
      background: "rgba(5,10,5,0.95)",
      borderRight: "1px solid rgba(0,255,136,0.08)",
      display: "flex", flexDirection: "column",
      padding: "24px 12px",
      gap: "4px",
    }}>
      {ITEMS.map(({ label, path, icon: Icon }) => {
        const active = pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "11px 14px", borderRadius: "10px", border: "none",
              background: active ? "rgba(0,255,136,0.1)" : "transparent",
              borderLeft: active ? "2px solid #00FF88" : "2px solid transparent",
              color: active ? "#00FF88" : "#555",
              fontFamily: "Outfit, sans-serif", fontSize: "14px", fontWeight: active ? 600 : 400,
              cursor: "pointer", transition: "all 0.2s", textAlign: "left", width: "100%",
            }}
          >
            <Icon size={17} />
            {label}
          </button>
        );
      })}

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "11px 14px", borderRadius: "10px", border: "none",
            background: "transparent", color: "#444",
            fontFamily: "Outfit, sans-serif", fontSize: "14px",
            cursor: "pointer", width: "100%",
          }}
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
}