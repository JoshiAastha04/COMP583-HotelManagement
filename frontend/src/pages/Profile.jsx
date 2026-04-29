import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { WidePage, Button, ButtonLink, StatusBadge } from "../components/ui"
import { getMyBookings } from "../api/bookingApi"

export default function Profile() {
    const { currentUser, userProfile, logout } = useAuth()
    const navigate = useNavigate()

    const { data: bookings = [] } = useQuery({
        queryKey: ["myBookings"],
        queryFn: getMyBookings,
        retry: false,
        placeholderData: [],
    })

    const stats = {
        total: bookings.length,
        upcoming: bookings.filter(b => ["CONFIRMED", "CHECKED_IN"].includes(b.status)).length,
        completed: bookings.filter(b => b.status === "CHECKED_OUT").length,
        spent: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    }

    async function handleLogout() {
        await logout()
        navigate("/")
    }

    const initials = (userProfile?.name || currentUser?.displayName || "G")
        .split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

    return (
        <WidePage>
            <div className="grid md:grid-cols-3 gap-6">

                {/* Left: Profile card */}
                <div className="md:col-span-1">
                    <div className="rounded-3xl p-6 text-center"
                         style={{ background: "linear-gradient(135deg, #FFE8E0, #E8F4FF)", border: "1px solid rgba(255,139,107,0.2)" }}>
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4"
                             style={{ background: "linear-gradient(135deg, #FF8B6B, #7EC8E3)" }}>
                            {initials}
                        </div>
                        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "Georgia, serif", color: "#3D3229" }}>
                            {userProfile?.name || currentUser?.displayName || "Guest"}
                        </h2>
                        <p className="text-sm mb-4" style={{ color: "#7A6658" }}>{currentUser?.email}</p>

                        <div className="rounded-2xl p-3 mb-4"
                             style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,139,107,0.15)" }}>
                            <p className="text-xs" style={{ color: "#B0A090" }}>Member since</p>
                            <p className="text-sm font-semibold" style={{ color: "#3D3229" }}>
                                {userProfile?.createdAt
                                    ? new Date(userProfile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                                    : "2026"}
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <ButtonLink to="/dashboard" variant="coral">My Bookings</ButtonLink>
                            <ButtonLink to="/reservation" variant="sky">New Booking</ButtonLink>
                            <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
                        </div>
                    </div>
                </div>

                {/* Right: Stats + recent */}
                <div className="md:col-span-2 grid gap-5">
                    {/* Stats */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#7A6658" }}>Your Stats</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { label: "Total Bookings", value: stats.total, emoji: "📋", color: "#FFE8E0" },
                                { label: "Upcoming", value: stats.upcoming, emoji: "🌟", color: "#E8F4FF" },
                                { label: "Completed", value: stats.completed, emoji: "✅", color: "#E8F8EF" },
                                { label: "Total Spent", value: `$${stats.spent}`, emoji: "💰", color: "#F0E8FF" },
                            ].map(s => (
                                <div key={s.label} className="rounded-2xl p-4 text-center"
                                     style={{ background: s.color, border: "1px solid rgba(0,0,0,0.05)" }}>
                                    <div className="text-2xl mb-1">{s.emoji}</div>
                                    <div className="text-xl font-bold" style={{ color: "#3D3229", fontFamily: "Georgia, serif" }}>{s.value}</div>
                                    <div className="text-xs mt-0.5" style={{ color: "#7A6658" }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent bookings */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#7A6658" }}>Recent Bookings</h3>
                        {bookings.length === 0 ? (
                            <div className="rounded-2xl p-8 text-center"
                                 style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,139,107,0.15)" }}>
                                <p className="text-2xl mb-2">🌴</p>
                                <p className="text-sm" style={{ color: "#7A6658" }}>No bookings yet — time to plan your trip!</p>
                                <div className="mt-4 max-w-xs mx-auto">
                                    <ButtonLink to="/reservation" variant="coral">Book a Room</ButtonLink>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {bookings.slice(0, 3).map(b => (
                                    <div key={b.id} className="rounded-2xl p-4 flex items-center justify-between gap-3"
                                         style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,139,107,0.15)" }}>
                                        <div>
                                            <p className="font-semibold text-sm" style={{ color: "#3D3229" }}>
                                                Room {b.roomNumber} — {b.roomType}
                                            </p>
                                            <p className="text-xs mt-0.5" style={{ color: "#7A6658" }}>
                                                {b.checkIn} → {b.checkOut}
                                            </p>
                                            <p className="text-xs font-mono mt-0.5" style={{ color: "#B0A090" }}>{b.confirmationCode}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <StatusBadge status={b.status} />
                                            <span className="text-sm font-bold" style={{ color: "#FF8B6B" }}>${b.totalPrice}</span>
                                        </div>
                                    </div>
                                ))}
                                {bookings.length > 3 && (
                                    <ButtonLink to="/dashboard" variant="outline">View All {bookings.length} Bookings →</ButtonLink>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </WidePage>
    )
}