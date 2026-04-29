import { Link } from "react-router-dom"

// Navbar
export function Navbar({ currentUser, onLogout }) {
    return (
        <nav style={{
            background: "rgba(15, 10, 31, 0.96)",
            borderBottom: "1px solid rgba(255,139,107,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
        }} className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between">
            <Link to="/" style={{ textDecoration: "none" }} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                     style={{ background: "linear-gradient(135deg, #FF8B6B, #FF5733)", boxShadow: "0 4px 15px rgba(255,87,51,0.5)" }}>
                    🏨
                </div>
                <span style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #fff 40%, #FF8B6B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.02em",
                }}>
          Hotel HOLLYWOOD
        </span>
            </Link>

            <div className="flex items-center gap-6">
                {["Book", "Check In"].map((label, i) => (
                    <Link key={label} to={["/reservation", "/find-booking"][i]}
                          style={{ textDecoration: "none", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "500", transition: "color 0.2s" }}
                          onMouseEnter={e => e.target.style.color = "#FF8B6B"}
                          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>
                        {label}
                    </Link>
                ))}
                {currentUser ? (
                    <>
                        {["Profile", "My Bookings"].map((label, i) => (
                            <Link key={label} to={["/profile", "/dashboard"][i]}
                                  style={{ textDecoration: "none", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "500" }}
                                  onMouseEnter={e => e.target.style.color = "#FF8B6B"}
                                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>
                                {label}
                            </Link>
                        ))}
                        <button onClick={onLogout}
                                style={{ background: "none", border: "1px solid rgba(255,139,107,0.4)", color: "rgba(255,139,107,0.9)", padding: "0.4rem 1.1rem", borderRadius: "999px", fontSize: "0.8rem", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s" }}
                                onMouseEnter={e => { e.target.style.background = "rgba(255,139,107,0.12)"; e.target.style.borderColor = "#FF8B6B" }}
                                onMouseLeave={e => { e.target.style.background = "none"; e.target.style.borderColor = "rgba(255,139,107,0.4)" }}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signin"
                              style={{ textDecoration: "none", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "500" }}
                              onMouseEnter={e => e.target.style.color = "#FF8B6B"}
                              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}>
                            Sign In
                        </Link>
                        <Link to="/register"
                              style={{
                                  textDecoration: "none", fontSize: "0.82rem", fontWeight: "700",
                                  padding: "0.5rem 1.4rem", borderRadius: "999px",
                                  background: "linear-gradient(135deg, #FF8B6B, #FF5733)",
                                  color: "white", letterSpacing: "0.06em", textTransform: "uppercase",
                                  boxShadow: "0 4px 20px rgba(255,87,51,0.45)",
                                  transition: "transform 0.2s, box-shadow 0.2s",
                              }}
                              onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 25px rgba(255,87,51,0.6)" }}
                              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 20px rgba(255,87,51,0.45)" }}>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

// ── Layout wrappers ──────────────────────────────────────────────────────────
export function Page({ title, subtitle, children }) {
    return (
        <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center"
             style={{ background: "linear-gradient(135deg, #0f0a1f 0%, #1a0a2e 50%, #0d1a2e 100%)" }}>
            <div className="w-full max-w-md">
                <div className="rounded-3xl p-8 shadow-2xl"
                     style={{
                         background: "rgba(255,255,255,0.04)",
                         border: "1px solid rgba(255,139,107,0.2)",
                         backdropFilter: "blur(20px)",
                         boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                     }}>
                    {title && (
                        <div className="text-center mb-7">
                            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: "700", color: "white", margin: "0 0 0.4rem" }}>{title}</h1>
                            {subtitle && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", margin: 0 }}>{subtitle}</p>}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}

export function WidePage({ title, subtitle, children }) {
    return (
        <div className="min-h-screen pt-20 pb-10 px-4"
             style={{ background: "linear-gradient(135deg, #0f0a1f 0%, #1a0a2e 50%, #0d1a2e 100%)" }}>
            <div className="w-full max-w-4xl mx-auto">
                <div className="rounded-3xl p-8 shadow-2xl"
                     style={{
                         background: "rgba(255,255,255,0.04)",
                         border: "1px solid rgba(255,139,107,0.2)",
                         backdropFilter: "blur(20px)",
                         boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                     }}>
                    {title && (
                        <div className="mb-7">
                            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: "700", color: "white", margin: "0 0 0.3rem" }}>{title}</h1>
                            {subtitle && <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", margin: 0 }}>{subtitle}</p>}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}

// ── Buttons ──────────────────────────────────────────────────────────────────
const btnStyles = {
    coral: { background: "linear-gradient(135deg, #FF8B6B, #FF5733)", color: "white", border: "none", boxShadow: "0 4px 20px rgba(255,87,51,0.4)" },
    sky: { background: "linear-gradient(135deg, #4FC3F7, #0288D1)", color: "white", border: "none", boxShadow: "0 4px 20px rgba(2,136,209,0.4)" },
    mint: { background: "linear-gradient(135deg, #66BB6A, #2E7D32)", color: "white", border: "none", boxShadow: "0 4px 20px rgba(46,125,50,0.4)" },
    sand: { background: "linear-gradient(135deg, #FFD54F, #FF8F00)", color: "#1a0a2e", border: "none", boxShadow: "0 4px 20px rgba(255,143,0,0.4)" },
    outline: { background: "transparent", color: "#FF8B6B", border: "1.5px solid rgba(255,139,107,0.5)", boxShadow: "none" },
    danger: { background: "linear-gradient(135deg, #EF5350, #B71C1C)", color: "white", border: "none", boxShadow: "0 4px 20px rgba(183,28,28,0.4)" },
}

export function Button({ children, variant = "coral", onClick, disabled, type = "button", small = false }) {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
                style={{ ...btnStyles[variant], opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                className={`w-full rounded-full font-semibold transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] ${small ? "py-2 text-xs" : "py-3 text-sm"}`}>
            {children}
        </button>
    )
}

export function ButtonLink({ to, children, variant = "coral", small = false }) {
    return (
        <Link to={to}
              style={{ ...btnStyles[variant], display: "block", textAlign: "center", textDecoration: "none" }}
              className={`w-full rounded-full font-semibold transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] ${small ? "py-2 text-xs" : "py-3 text-sm"}`}>
            {children}
        </Link>
    )
}

// ── Form fields ───────────────────────────────────────────────────────────────
export function Input({ placeholder, value, onChange, type = "text", required, min, max }) {
    return (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
               required={required} min={min} max={max}
               style={{
                   width: "100%", borderRadius: "12px", padding: "0.75rem 1rem",
                   background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,139,107,0.25)",
                   color: "white", fontSize: "0.9rem", outline: "none", boxSizing: "border-box",
               }}
               onFocus={e => e.target.style.borderColor = "#FF8B6B"}
               onBlur={e => e.target.style.borderColor = "rgba(255,139,107,0.25)"}
               className="placeholder-white/30"
        />
    )
}

export function Select({ value, onChange, children }) {
    return (
        <select value={value} onChange={onChange}
                style={{
                    width: "100%", borderRadius: "12px", padding: "0.75rem 1rem",
                    background: "rgba(30,15,50,0.9)", border: "1px solid rgba(255,139,107,0.25)",
                    color: "white", fontSize: "0.9rem", outline: "none",
                }}>
            {children}
        </select>
    )
}

export function Field({ label, children }) {
    return (
        <label className="grid gap-1.5">
            <span style={{ fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,139,107,0.8)" }}>{label}</span>
            {children}
        </label>
    )
}

export function Row({ children }) {
    return <div className="grid gap-4">{children}</div>
}

export function ErrorMsg({ message }) {
    if (!message) return null
    return (
        <div style={{ background: "rgba(239,83,80,0.15)", border: "1px solid rgba(239,83,80,0.4)", color: "#FF8A80", borderRadius: "12px", padding: "0.75rem 1rem", fontSize: "0.85rem" }}>
            {message}
        </div>
    )
}

export function SuccessMsg({ message }) {
    if (!message) return null
    return (
        <div style={{ background: "rgba(102,187,106,0.15)", border: "1px solid rgba(102,187,106,0.4)", color: "#A5D6A7", borderRadius: "12px", padding: "0.75rem 1rem", fontSize: "0.85rem" }}>
            {message}
        </div>
    )
}

export function StatusBadge({ status }) {
    const styles = {
        CONFIRMED: { background: "rgba(102,187,106,0.15)", color: "#A5D6A7", border: "1px solid rgba(102,187,106,0.3)" },
        PENDING: { background: "rgba(255,213,79,0.15)", color: "#FFD54F", border: "1px solid rgba(255,213,79,0.3)" },
        CHECKED_IN: { background: "rgba(79,195,247,0.15)", color: "#81D4FA", border: "1px solid rgba(79,195,247,0.3)" },
        CHECKED_OUT: { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)" },
        CANCELLED: { background: "rgba(239,83,80,0.15)", color: "#FF8A80", border: "1px solid rgba(239,83,80,0.3)" },
    }
    const labels = { CONFIRMED: "✓ Confirmed", PENDING: "⏳ Pending", CHECKED_IN: "🏨 Checked In", CHECKED_OUT: "👋 Checked Out", CANCELLED: "✗ Cancelled" }
    return (
        <span style={{ ...styles[status], padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.06em" }}>
      {labels[status] || status}
    </span>
    )
}

export function SmallLinksRow({ left, right }) {
    return (
        <div className="flex items-center justify-between text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            {left}{right}
        </div>
    )
}

export function Divider({ label }) {
    return (
        <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px" style={{ background: "rgba(255,139,107,0.2)" }} />
            {label && <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>}
            <div className="flex-1 h-px" style={{ background: "rgba(255,139,107,0.2)" }} />
        </div>
    )
}