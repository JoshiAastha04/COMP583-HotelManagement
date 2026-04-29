import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function LandingPage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const today = new Date().toISOString().split("T")[0]

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/rooms?${new URLSearchParams({ checkIn, checkOut, guests })}`)
  }

  return (
      <div style={{ background: "#0a0616", minHeight: "100vh", color: "white" }}>

        {/* ── Hero ── */}
        <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

          {/* Background gradient orbs */}
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,87,51,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(72,52,153,0.3) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "30%", left: "30%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,139,107,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Grid texture */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(255,139,107,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,139,107,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "8rem 2rem 4rem" }}>
            <div style={{ maxWidth: "700px" }}>
              {/* Eyebrow */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,87,51,0.12)", border: "1px solid rgba(255,87,51,0.3)", borderRadius: "999px", padding: "0.4rem 1rem", marginBottom: "2rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5733", display: "inline-block", boxShadow: "0 0 8px #FF5733" }} />
                <span style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#FF8B6B", fontWeight: "600" }}>
                Hotel HOLLYWOOD — Los Angeles
              </span>
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: "700", lineHeight: "1.05", margin: "0 0 1.5rem", letterSpacing: "-0.02em" }}>
                Experience<br />
                <span style={{ background: "linear-gradient(135deg, #FF8B6B 0%, #FF5733 50%, #FF8B6B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Luxury
              </span>{" "}
                Like Never<br />Before
              </h1>

              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", maxWidth: "480px", lineHeight: "1.7", marginBottom: "3rem" }}>
                World-class rooms, seamless booking, and unforgettable stays in the heart of Hollywood.
              </p>

              {/* Search bar */}
              <form onSubmit={handleSearch}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,139,107,0.2)",
                      borderRadius: "20px",
                      padding: "8px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                      maxWidth: "680px",
                    }}>
                <SearchField label="Check In">
                  <input type="date" min={today} value={checkIn}
                         onChange={e => setCheckIn(e.target.value)} required
                         style={{ background: "none", border: "none", color: "white", fontSize: "0.9rem", outline: "none", width: "100%" }} />
                </SearchField>
                <div style={{ width: "1px", background: "rgba(255,139,107,0.15)", alignSelf: "stretch" }} />
                <SearchField label="Check Out">
                  <input type="date" min={checkIn || today} value={checkOut}
                         onChange={e => setCheckOut(e.target.value)} required
                         style={{ background: "none", border: "none", color: "white", fontSize: "0.9rem", outline: "none", width: "100%" }} />
                </SearchField>
                <div style={{ width: "1px", background: "rgba(255,139,107,0.15)", alignSelf: "stretch" }} />
                <SearchField label="Guests">
                  <select value={guests} onChange={e => setGuests(e.target.value)}
                          style={{ background: "transparent", border: "none", color: "white", fontSize: "0.9rem", outline: "none", width: "100%" }}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: "#1a0a2e" }}>{n} Guest{n>1?"s":""}</option>)}
                  </select>
                </SearchField>
                <button type="submit" style={{
                  background: "linear-gradient(135deg, #FF8B6B, #FF5733)",
                  border: "none", color: "white", borderRadius: "14px",
                  padding: "0.85rem 2rem", fontWeight: "700", fontSize: "0.9rem",
                  cursor: "pointer", letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(255,87,51,0.5)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  margin: "4px",
                }}
                        onMouseEnter={e => { e.target.style.transform = "scale(1.03)"; e.target.style.boxShadow = "0 6px 30px rgba(255,87,51,0.7)" }}
                        onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(255,87,51,0.5)" }}>
                  Search →
                </button>
              </form>
            </div>

            {/* Floating stats */}
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "4rem", flexWrap: "wrap" }}>
              {[
                { num: "50+", label: "Luxury Rooms", icon: "🛏️" },
                { num: "4.9★", label: "Guest Rating", icon: "⭐" },
                { num: "24/7", label: "Concierge", icon: "🛎️" },
                { num: "10k+", label: "Happy Guests", icon: "🌟" },
              ].map(s => (
                  <div key={s.label} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "1rem 1.5rem",
                    backdropFilter: "blur(10px)",
                  }}>
                    <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "white", fontFamily: "Georgia, serif" }}>{s.num}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem", letterSpacing: "0.05em" }}>{s.label}</div>
                  </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.4 }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,139,107,0.8), transparent)" }} />
          </div>
        </div>

        {/* ── Room Types ── */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "6rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#FF8B6B", marginBottom: "0.5rem", fontWeight: "600" }}>Our Collection</p>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", fontWeight: "700", margin: 0 }}>
                Choose Your <span style={{ color: "#FF8B6B" }}>Room</span>
              </h2>
            </div>
            <Link to="/reservation" style={{ textDecoration: "none", color: "#FF8B6B", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "600", borderBottom: "1px solid rgba(255,139,107,0.4)", paddingBottom: "2px" }}>
              View All Rooms →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.5rem" }}>
            {[
              { emoji: "🛏️", type: "Standard", price: "$89", desc: "Cozy & comfortable", color: "rgba(255,87,51,0.08)", accent: "#FF5733" },
              { emoji: "🌅", type: "Deluxe", price: "$149", desc: "Spacious with a view", color: "rgba(2,136,209,0.08)", accent: "#0288D1" },
              { emoji: "🛋️", type: "Suite", price: "$249", desc: "Living room + luxury", color: "rgba(46,125,50,0.08)", accent: "#2E7D32" },
              { emoji: "👑", type: "Presidential", price: "$499", desc: "The full VIP experience", color: "rgba(255,143,0,0.08)", accent: "#FF8F00" },
            ].map(r => (
                <div key={r.type} onClick={() => navigate("/reservation")}
                     style={{
                       background: r.color,
                       border: `1px solid ${r.accent}22`,
                       borderRadius: "20px",
                       padding: "2rem",
                       cursor: "pointer",
                       transition: "all 0.3s",
                     }}
                     onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${r.accent}22`; e.currentTarget.style.borderColor = `${r.accent}55` }}
                     onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${r.accent}22` }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{r.emoji}</div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", margin: "0 0 0.3rem", color: "white" }}>{r.type}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", margin: "0 0 1rem" }}>{r.desc}</p>
                  <div style={{ fontSize: "1.4rem", fontWeight: "800", color: r.accent, fontFamily: "Georgia, serif" }}>{r.price}<span style={{ fontSize: "0.75rem", fontWeight: "400", color: "rgba(255,255,255,0.35)" }}>/night</span></div>
                </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem 8rem" }}>
          <div style={{
            borderRadius: "28px",
            padding: "4rem",
            background: "linear-gradient(135deg, rgba(255,87,51,0.15) 0%, rgba(72,52,153,0.3) 100%)",
            border: "1px solid rgba(255,87,51,0.2)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,87,51,0.12), transparent 70%)", pointerEvents: "none" }} />
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "2.2rem", margin: "0 0 1rem", position: "relative" }}>
              Ready for Your <span style={{ color: "#FF8B6B" }}>Dream Stay?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "2.5rem", position: "relative" }}>
              Sign up today and unlock exclusive member rates.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              {currentUser ? (
                  <Link to="/dashboard" style={{ textDecoration: "none", background: "linear-gradient(135deg, #FF8B6B, #FF5733)", color: "white", padding: "0.85rem 2.5rem", borderRadius: "999px", fontWeight: "700", fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(255,87,51,0.5)" }}>
                    My Dashboard →
                  </Link>
              ) : (
                  <>
                    <Link to="/register" style={{ textDecoration: "none", background: "linear-gradient(135deg, #FF8B6B, #FF5733)", color: "white", padding: "0.85rem 2.5rem", borderRadius: "999px", fontWeight: "700", fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(255,87,51,0.5)" }}>
                      Get Started Free →
                    </Link>
                    <Link to="/signin" style={{ textDecoration: "none", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", padding: "0.85rem 2.5rem", borderRadius: "999px", fontWeight: "600", fontSize: "0.95rem", border: "1px solid rgba(255,255,255,0.15)" }}>
                      Sign In
                    </Link>
                  </>
              )}
            </div>
          </div>
        </div>

        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>
          © 2026 Hotel HOLLYWOOD · COMP583 Project — Aastha, Bargavi, Kiran, Ryan
        </footer>
      </div>
  )
}

function SearchField({ label, children }) {
  return (
      <div style={{ flex: 1, minWidth: "110px", padding: "0.5rem 1rem" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,139,107,0.7)", marginBottom: "0.3rem" }}>{label}</div>
        {children}
      </div>
  )
}