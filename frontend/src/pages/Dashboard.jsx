import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getMyBookings, cancelBooking } from "../api/bookingApi"
import { useAuth } from "../context/AuthContext"
import { WidePage, ButtonLink, Button, StatusBadge } from "../components/ui"

const DEMO_BOOKINGS = [
    { id: 1, confirmationCode: "KCSUMMER1", roomNumber: "201", roomType: "Deluxe", checkIn: "2026-04-10", checkOut: "2026-04-13", guests: 2, totalPrice: 447, status: "CONFIRMED" },
    { id: 2, confirmationCode: "KCSUMMER2", roomNumber: "101", roomType: "Standard", checkIn: "2026-03-01", checkOut: "2026-03-03", guests: 1, totalPrice: 178, status: "CHECKED_OUT" },
]

export default function Dashboard() {
    const { currentUser, userProfile } = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: bookings, isLoading, isError } = useQuery({
        queryKey: ["myBookings"],
        queryFn: getMyBookings,
        retry: false,
        placeholderData: DEMO_BOOKINGS,
    })

    const cancelMutation = useMutation({
        mutationFn: cancelBooking,
        onSuccess: () => queryClient.invalidateQueries(["myBookings"]),
    })

    const displayBookings = isError ? DEMO_BOOKINGS : bookings || []
    const upcoming = displayBookings.filter(b => ["CONFIRMED", "PENDING", "CHECKED_IN"].includes(b.status))
    const past = displayBookings.filter(b => ["CHECKED_OUT", "CANCELLED"].includes(b.status))

    return (
        <WidePage title={`🌸 My Bookings`} subtitle={`Welcome back, ${userProfile?.name || currentUser?.displayName || "Guest"}!`}>

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <ButtonLink to="/reservation" variant="coral">+ New Booking</ButtonLink>
                <ButtonLink to="/find-booking" variant="sky">Check In/Out</ButtonLink>
                <ButtonLink to="/profile" variant="sand">My Profile</ButtonLink>
                <ButtonLink to="/" variant="outline">Home</ButtonLink>
            </div>

            {isLoading && <p className="text-center text-sm py-8" style={{ color: "#7A6658" }}>Loading your bookings...</p>}

            {/* Upcoming */}
            {upcoming.length > 0 && (
                <section className="mb-8">
                    <SectionTitle>✈️ Upcoming Stays</SectionTitle>
                    <div className="grid gap-3">
                        {upcoming.map(b => (
                            <BookingCard key={b.id} booking={b}
                                         onCancel={() => window.confirm("Cancel this booking?") && cancelMutation.mutate(b.id)} />
                        ))}
                    </div>
                </section>
            )}

            {/* Past */}
            {past.length > 0 && (
                <section>
                    <SectionTitle>📖 Past Stays</SectionTitle>
                    <div className="grid gap-3 opacity-75">
                        {past.map(b => <BookingCard key={b.id} booking={b} />)}
                    </div>
                </section>
            )}

            {!isLoading && displayBookings.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-4xl mb-3">🌴</p>
                    <p className="mb-6" style={{ color: "#7A6658" }}>No bookings yet — let's plan your summer escape!</p>
                    <div className="max-w-xs mx-auto">
                        <ButtonLink to="/reservation" variant="coral">Book a Room</ButtonLink>
                    </div>
                </div>
            )}
        </WidePage>
    )
}

function SectionTitle({ children }) {
    return (
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-2"
            style={{ color: "#7A6658", borderBottom: "1px solid rgba(255,139,107,0.2)" }}>
            {children}
        </h2>
    )
}

function BookingCard({ booking, onCancel }) {
    const nights = Math.max(1, (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))

    return (
        <div className="rounded-2xl p-4"
             style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,139,107,0.15)" }}>
            <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                    <p className="font-semibold" style={{ color: "#3D3229" }}>
                        {booking.roomType} Room — #{booking.roomNumber}
                    </p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "#B0A090" }}>{booking.confirmationCode}</p>
                </div>
                <StatusBadge status={booking.status} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                {[
                    { label: "Check-In", value: booking.checkIn },
                    { label: "Check-Out", value: booking.checkOut },
                    { label: "Duration", value: `${nights} night${nights > 1 ? "s" : ""}` },
                    { label: "Total", value: `$${booking.totalPrice}`, coral: true },
                ].map(r => (
                    <div key={r.label}>
                        <p className="text-xs mb-0.5" style={{ color: "#B0A090" }}>{r.label}</p>
                        <p className="font-semibold" style={{ color: r.coral ? "#FF8B6B" : "#3D3229" }}>{r.value}</p>
                    </div>
                ))}
            </div>

            {onCancel && booking.status === "CONFIRMED" && (
                <button onClick={onCancel} className="text-xs hover:underline font-semibold"
                        style={{ color: "#E84A4A" }}>
                    Cancel booking
                </button>
            )}
        </div>
    )
}