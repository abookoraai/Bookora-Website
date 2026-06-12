import { useState, useEffect, useCallback } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const RETELL_COST_PER_MIN = 0.15;
const MONTHLY_COSTS = { "Cal.com": 12.0, "Make.com": 9.0, GHL: 15.0 };

// ── Supabase helpers ──────────────────────────────────────
async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${options.token || SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || "Login failed");
  return data;
}

async function signOut(token) {
  await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
  });
}

// ── Airtable helper ───────────────────────────────────────
async function airtableFetch(table) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}?pageSize=100`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } });
  if (!res.ok) throw new Error(`Airtable error: ${res.status}`);
  return (await res.json()).records.map((r) => ({ id: r.id, ...r.fields }));
}

// ── Simple bar chart ──────────────────────────────────────
function BarChart({ data, labels }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120, paddingTop: 8 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: Math.round((v / max) * 100), background: v > 0 ? "#378ADD" : "#B5D4F4", borderRadius: "3px 3px 0 0", minHeight: 2 }} />
          <span style={{ fontSize: 10, color: "#6b6b67" }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────
export default function Dashboard() {
  const [screen, setScreen] = useState("login"); // login | admin | client
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allCalls, setAllCalls] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeClient, setActiveClient] = useState(null);
  const [chartPeriod, setChartPeriod] = useState("weekly");
  const [modal, setModal] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  // ── Login ─────────────────────────────────────────────
  async function handleLogin() {
    setLoginError("");
    setLoading(true);
    try {
      const data = await signIn(email, password);
      const token = data.access_token;
      const userId = data.user.id;
      const roles = await supabaseFetch(`/user_roles?user_id=eq.${userId}&select=role,client_name`, { token });
      if (!roles.length) throw new Error("No role assigned. Contact your administrator.");
      const { role, client_name } = roles[0];
      setSession({ token, userId });
      setUserRole(role);
      setClientName(client_name || "");
      sessionStorage.setItem("session", JSON.stringify({ token, userId, role, client_name: client_name || "" }));
      await loadData(token, role, client_name || "");
      setScreen(role === "admin" ? "admin" : "client");
    } catch (e) {
      setLoginError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Load data ─────────────────────────────────────────
  const loadData = useCallback(async (token, role, cn) => {
    setDataLoading(true);
    try {
      const [c, calls, jobs] = await Promise.all([
        airtableFetch("Clients"),
        airtableFetch("Calls"),
        airtableFetch("Jobs"),
      ]);
      setClients(c);
      setAllCalls(calls);
      setAllJobs(jobs);
      if (role === "admin" && c.length > 0) setActiveClient(c[0].client_name);
      if (role === "client") setActiveClient(cn);
    } catch (e) {
      console.error(e);
    } finally {
      setDataLoading(false);
    }
  }, []);

  // ── Restore session ───────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem("session");
    if (saved) {
      const s = JSON.parse(saved);
      setSession({ token: s.token, userId: s.userId });
      setUserRole(s.role);
      setClientName(s.client_name);
      loadData(s.token, s.role, s.client_name).then(() => {
        setScreen(s.role === "admin" ? "admin" : "client");
      });
    }
  }, [loadData]);

  // ── Logout ────────────────────────────────────────────
  async function handleLogout() {
    if (session) await signOut(session.token).catch(() => {});
    sessionStorage.clear();
    setSession(null); setScreen("login"); setAllCalls([]); setAllJobs([]); setClients([]);
    setEmail(""); setPassword(""); setActiveClient(null);
  }

  // ── Computed metrics ──────────────────────────────────
  const now = new Date();
  const clientCalls = allCalls.filter((c) => c.client === activeClient);
  const monthCalls = clientCalls.filter((c) => {
    if (!c.timestamp) return false;
    const d = new Date(c.timestamp);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const booked = monthCalls.filter((c) => c.outcome === "Booked").length;
  const total = monthCalls.length;
  const clientJobs = allJobs.filter((j) => j.client === activeClient);
  const monthJobs = clientJobs.filter((j) => {
    if (!j.completed_date) return false;
    const d = new Date(j.completed_date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const aiCost = monthCalls.reduce((s, c) => s + (parseFloat(c.cost_usd) || 0), 0);
  const totalCost = aiCost + Object.values(MONTHLY_COSTS).reduce((a, b) => a + b, 0);
  const clientInfo = clients.find((c) => c.client_name === activeClient) || {};

  // Chart data
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyData = weekDays.map((_, i) => clientCalls.filter((c) => c.timestamp && new Date(c.timestamp).getDay() === i).length);
  const monthLabels = Array.from({ length: 6 }, (_, i) => { const d = new Date(); d.setMonth(d.getMonth() - (5 - i)); return d.toLocaleString("default", { month: "short" }); });
  const monthlyData = monthLabels.map((_, i) => { const d = new Date(); d.setMonth(d.getMonth() - (5 - i)); return clientCalls.filter((c) => { if (!c.timestamp) return false; const cd = new Date(c.timestamp); return cd.getMonth() === d.getMonth() && cd.getFullYear() === d.getFullYear(); }).length; });

  const s = {
    page: { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f5f5f3", minHeight: "100vh", color: "#1a1a18" },
    loginWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f3" },
    loginCard: { background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 40, width: "100%", maxWidth: 400 },
    logo: { fontSize: 20, fontWeight: 700, marginBottom: 6 },
    sub: { fontSize: 13, color: "#6b6b67", marginBottom: 28 },
    label: { fontSize: 12, fontWeight: 500, color: "#6b6b67", marginBottom: 6, display: "block" },
    input: { width: "100%", padding: "10px 12px", fontSize: 14, border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 8, background: "#f5f5f3", color: "#1a1a18", marginBottom: 14, outline: "none", boxSizing: "border-box" },
    btn: { width: "100%", padding: 11, fontSize: 14, fontWeight: 600, background: "#378ADD", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" },
    err: { fontSize: 12, color: "#A32D2D", marginTop: 10, textAlign: "center" },
    header: { background: "#fff", borderBottom: "0.5px solid rgba(0,0,0,0.08)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    headerLeft: { display: "flex", alignItems: "center", gap: 12 },
    logoSm: { fontSize: 15, fontWeight: 600 },
    select: { fontSize: 13, border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 8, padding: "6px 10px", background: "#f5f5f3", color: "#1a1a18", cursor: "pointer" },
    liveBadge: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 500, background: "#EAF3DE", color: "#3B6D11", padding: "4px 10px", borderRadius: 20 },
    liveDot: { width: 6, height: 6, borderRadius: "50%", background: "#3B6D11" },
    logoutBtn: { fontSize: 12, padding: "5px 12px", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 20, background: "none", color: "#6b6b67", cursor: "pointer" },
    roleBadge: (r) => ({ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, background: r === "admin" ? "#FAEEDA" : "#E6F1FB", color: r === "admin" ? "#BA7517" : "#378ADD" }),
    main: { padding: "24px 32px", maxWidth: 1200, margin: "0 auto" },
    title: { fontSize: 20, fontWeight: 600, marginBottom: 4 },
    titleSub: { fontSize: 13, color: "#6b6b67", marginBottom: 20 },
    metrics: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 },
    metric: { background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "16px 18px" },
    metLabel: { fontSize: 12, color: "#6b6b67", marginBottom: 6 },
    metVal: { fontSize: 26, fontWeight: 600 },
    metSub: (up) => ({ fontSize: 11, color: up ? "#3B6D11" : "#6b6b67", marginTop: 4 }),
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
    card: { background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "18px 20px" },
    cardTitle: { fontSize: 13, fontWeight: 600, marginBottom: 14 },
    periodTabs: { display: "flex", gap: 4, marginBottom: 14 },
    periodTab: (active) => ({ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "0.5px solid rgba(0,0,0,0.08)", background: active ? "#f5f5f3" : "none", color: active ? "#1a1a18" : "#6b6b67", cursor: "pointer", fontWeight: active ? 500 : 400 }),
    funnelRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
    funnelLabel: { fontSize: 12, color: "#6b6b67", width: 120, flexShrink: 0 },
    funnelTrack: { flex: 1, background: "#f5f5f3", borderRadius: 4, height: 24, overflow: "hidden" },
    funnelFill: (pct, bg) => ({ height: "100%", width: `${pct}%`, background: bg, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 11, fontWeight: 600, transition: "width 0.6s ease" }),
    funnelCount: { fontSize: 12, fontWeight: 600, width: 32, textAlign: "right" },
    callRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)" },
    callIcon: (o) => ({ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, background: o === "Booked" ? "#EAF3DE" : o === "Missed" ? "#FCEBEB" : "#E6F1FB", color: o === "Booked" ? "#3B6D11" : o === "Missed" ? "#A32D2D" : "#378ADD" }),
    callInfo: { flex: 1, minWidth: 0 },
    callName: { fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    callDetail: { fontSize: 11, color: "#6b6b67", marginTop: 1 },
    badge: (o) => ({ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, flexShrink: 0, background: o === "Booked" ? "#EAF3DE" : o === "Missed" ? "#FCEBEB" : "#E6F1FB", color: o === "Booked" ? "#3B6D11" : o === "Missed" ? "#A32D2D" : "#378ADD" }),
    playBtn: { fontSize: 11, padding: "4px 10px", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 20, background: "none", color: "#6b6b67", cursor: "pointer", flexShrink: 0 },
    costRow: { display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)", fontSize: 13 },
    costLabel: { color: "#6b6b67" },
    costVal: { fontWeight: 500 },
    costTotal: { display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.15)", fontSize: 14, fontWeight: 600 },
    clientsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginBottom: 24 },
    clientCard: { background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "16px 18px", cursor: "pointer" },
    clientCardName: { fontSize: 14, fontWeight: 600, marginBottom: 2 },
    clientCardType: { fontSize: 12, color: "#6b6b67", marginBottom: 12 },
    clientStats: { display: "flex", gap: 16 },
    cstatVal: { fontSize: 18, fontWeight: 600 },
    cstatLabel: { fontSize: 11, color: "#6b6b67" },
    backBtn: { fontSize: 13, padding: "6px 14px", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 20, background: "none", color: "#6b6b67", cursor: "pointer", marginBottom: 16 },
    modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" },
    modalBox: { background: "#fff", borderRadius: 12, padding: 24, width: "90%", maxWidth: 560, maxHeight: "80vh", overflowY: "auto" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    modalTitle: { fontSize: 15, fontWeight: 600 },
    modalClose: { background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b6b67" },
    bubble: { fontSize: 13, lineHeight: 1.6, background: "#f5f5f3", borderRadius: 8, padding: "12px 14px", marginBottom: 8 },
    bubbleSpeaker: { fontSize: 11, fontWeight: 600, color: "#6b6b67", marginBottom: 4 },
    spinner: { width: 24, height: 24, border: "2px solid rgba(0,0,0,0.08)", borderTopColor: "#378ADD", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" },
  };

  const recentCalls = clientCalls.slice().reverse().slice(0, 8);

  // ── Login screen ──────────────────────────────────────
  if (screen === "login") return (
    <div style={s.page}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={s.loginWrap}>
        <div style={s.loginCard}>
          <div style={s.logo}>AI<span style={{ color: "#378ADD" }}>Receptionist</span></div>
          <div style={s.sub}>Sign in to your dashboard</div>
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin()} />
          <button style={s.btn} onClick={handleLogin} disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          {loginError && <div style={s.err}>{loginError}</div>}
        </div>
      </div>
    </div>
  );

  // ── App shell ─────────────────────────────────────────
  return (
    <div style={s.page}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; }`}</style>

      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <div style={s.logoSm}>AI<span style={{ color: "#378ADD" }}>Receptionist</span></div>
          {userRole === "admin" && screen === "client" && (
            <select style={s.select} value={activeClient || ""} onChange={e => setActiveClient(e.target.value)}>
              {clients.map(c => <option key={c.client_name} value={c.client_name}>{c.client_name}</option>)}
            </select>
          )}
          {userRole === "client" && <span style={{ fontSize: 13, color: "#6b6b67" }}>{clientName}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#6b6b67" }}>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <span style={s.roleBadge(userRole)}>{userRole === "admin" ? "Admin" : "Client"}</span>
          <span style={s.liveBadge}><span style={s.liveDot} />Live</span>
          <button style={s.logoutBtn} onClick={handleLogout}>Sign out</button>
        </div>
      </div>

      {/* Admin overview */}
      {userRole === "admin" && screen === "admin" && (
        <div style={s.main}>
          <div style={s.title}>All clients</div>
          <div style={s.titleSub}>{clients.length} active client{clients.length !== 1 ? "s" : ""} · {now.toLocaleString("default", { month: "long" })} {now.getFullYear()}</div>
          {dataLoading ? <div style={{ textAlign: "center", padding: 40 }}><div style={s.spinner} /></div> : (
            <div style={s.clientsGrid}>
              {clients.map(c => {
                const mc = allCalls.filter(x => { if (x.client !== c.client_name || !x.timestamp) return false; const d = new Date(x.timestamp); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); });
                const b = mc.filter(x => x.outcome === "Booked").length;
                const cost = mc.reduce((sum, x) => sum + (parseFloat(x.cost_usd) || 0), 0);
                return (
                  <div key={c.client_name} style={s.clientCard} onClick={() => { setActiveClient(c.client_name); setScreen("client"); }}>
                    <div style={s.clientCardName}>{c.client_name}</div>
                    <div style={s.clientCardType}>{c.business_type || "Business"}</div>
                    <div style={s.clientStats}>
                      <div><div style={s.cstatVal}>{mc.length}</div><div style={s.cstatLabel}>Calls</div></div>
                      <div><div style={s.cstatVal}>{b}</div><div style={s.cstatLabel}>Booked</div></div>
                      <div><div style={s.cstatVal}>${cost.toFixed(2)}</div><div style={s.cstatLabel}>Cost</div></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Client dashboard */}
      {screen === "client" && (
        <div style={s.main}>
          {userRole === "admin" && <button style={s.backBtn} onClick={() => setScreen("admin")}>← All clients</button>}
          {dataLoading ? <div style={{ textAlign: "center", padding: 40 }}><div style={s.spinner} /></div> : (
            <>
              <div style={s.title}>{activeClient}</div>
              <div style={s.titleSub}>{clientInfo.business_type || "Business"} · AI Receptionist Dashboard · {now.toLocaleString("default", { month: "long" })} {now.getFullYear()}</div>

              {/* Metrics */}
              <div style={s.metrics}>
                <div style={s.metric}><div style={s.metLabel}>Calls answered</div><div style={s.metVal}>{total}</div><div style={s.metSub(false)}>this month</div></div>
                <div style={s.metric}><div style={s.metLabel}>Appointments booked</div><div style={s.metVal}>{booked}</div><div style={s.metSub(true)}>{total > 0 ? Math.round(booked / total * 100) : 0}% book rate</div></div>
                <div style={s.metric}><div style={s.metLabel}>Jobs completed</div><div style={s.metVal}>{monthJobs.length}</div><div style={s.metSub(false)}>{booked > 0 ? Math.round(monthJobs.length / booked * 100) : 0}% completion</div></div>
                <div style={s.metric}><div style={s.metLabel}>AI usage cost</div><div style={s.metVal}>${aiCost.toFixed(2)}</div><div style={s.metSub(false)}>this month</div></div>
              </div>

              {/* Charts row */}
              <div style={s.grid2}>
                <div style={s.card}>
                  <div style={s.cardTitle}>Call volume</div>
                  <div style={s.periodTabs}>
                    <button style={s.periodTab(chartPeriod === "weekly")} onClick={() => setChartPeriod("weekly")}>Weekly</button>
                    <button style={s.periodTab(chartPeriod === "monthly")} onClick={() => setChartPeriod("monthly")}>Monthly</button>
                  </div>
                  <BarChart data={chartPeriod === "weekly" ? weeklyData : monthlyData} labels={chartPeriod === "weekly" ? weekDays : monthLabels} />
                </div>
                <div style={s.card}>
                  <div style={s.cardTitle}>Conversion funnel</div>
                  {[
                    { label: "Calls answered", val: total, pct: 100, bg: "#B5D4F4", fg: "#0C447C" },
                    { label: "Appts booked", val: booked, pct: total > 0 ? Math.round(booked / total * 100) : 0, bg: "#9FE1CB", fg: "#085041" },
                    { label: "Jobs completed", val: monthJobs.length, pct: total > 0 ? Math.round(monthJobs.length / total * 100) : 0, bg: "#C0DD97", fg: "#27500A" },
                  ].map(r => (
                    <div key={r.label} style={s.funnelRow}>
                      <div style={s.funnelLabel}>{r.label}</div>
                      <div style={s.funnelTrack}><div style={s.funnelFill(r.pct, r.bg)}><span style={{ color: r.fg }}>{r.val}</span></div></div>
                      <div style={s.funnelCount}>{r.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost + calls row */}
              <div style={s.grid2}>
                <div style={s.card}>
                  <div style={s.cardTitle}>Usage &amp; cost this month</div>
                  <div style={s.costRow}><span style={s.costLabel}>Retell AI (call minutes)</span><span style={s.costVal}>${aiCost.toFixed(2)}</span></div>
                  {Object.entries(MONTHLY_COSTS).map(([n, v]) => <div key={n} style={s.costRow}><span style={s.costLabel}>{n}</span><span style={s.costVal}>${v.toFixed(2)}</span></div>)}
                  <div style={s.costTotal}><span>Total billed</span><span>${totalCost.toFixed(2)}</span></div>
                </div>
                <div style={s.card}>
                  <div style={s.cardTitle}>Recent calls</div>
                  {recentCalls.length === 0 ? <div style={{ fontSize: 13, color: "#6b6b67", padding: "8px 0" }}>No calls yet.</div> : recentCalls.map((c, i) => (
                    <div key={c.id || i} style={{ ...s.callRow, borderBottom: i === recentCalls.length - 1 ? "none" : "0.5px solid rgba(0,0,0,0.08)" }}>
                      <div style={s.callIcon(c.outcome)}>{c.outcome === "Booked" ? "✓" : c.outcome === "Missed" ? "✗" : "i"}</div>
                      <div style={s.callInfo}>
                        <div style={s.callName}>{c.caller_name || "Unknown"} — {c.service_requested || "General inquiry"}</div>
                        <div style={s.callDetail}>{c.timestamp ? new Date(c.timestamp).toLocaleDateString() : ""}{c.duration_seconds ? " · " + Math.round(c.duration_seconds / 60) + " min" : ""}</div>
                      </div>
                      <span style={s.badge(c.outcome)}>{c.outcome || "Inquiry"}</span>
                      {(c.recording_url || c.transcript) && <button style={s.playBtn} onClick={() => setModal(c)}>▶ View</button>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Transcript modal */}
      {modal && (
        <div style={s.modalOverlay} onClick={() => setModal(null)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div style={s.modalTitle}>{modal.caller_name || "Unknown"} — {modal.service_requested || "Call"}</div>
              <button style={s.modalClose} onClick={() => setModal(null)}>×</button>
            </div>
            {modal.recording_url && <audio controls src={modal.recording_url} style={{ width: "100%", marginBottom: 16 }} />}
            {modal.transcript ? modal.transcript.split("\n").filter(Boolean).map((line, i) => {
              const parts = line.match(/^(AI|Agent|Caller|Customer|.*?):\s*(.+)$/i);
              return <div key={i} style={s.bubble}>{parts ? <><div style={s.bubbleSpeaker}>{parts[1]}</div>{parts[2]}</> : line}</div>;
            }) : <p style={{ fontSize: 13, color: "#6b6b67" }}>No transcript available.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
