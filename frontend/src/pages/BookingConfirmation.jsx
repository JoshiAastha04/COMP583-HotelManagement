import { Page, Row, ButtonLink } from "../components/ui"

export default function BookingConfirmation({ booking }) {
    return (
        <Page title="🎉 You're Booked!" subtitle="Your reservation is confirmed">
            <Row>
                {/* Confirmation code */}
                <div className="rounded-2xl p-5 text-center"
                     style={{ background: "linear-gradient(135deg, #E8F8EF, #D4F5E2)", border: "1px solid #90D4B5" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#3D7A4A" }}>
                        Confirmation Code
                    </p>
                    <p className="text-3xl font-bold tracking-widest" style={{ fontFamily: "monospace", color: "#1E5C35" }}>
                        {booking.confirmationCode}
                    </p>
                    <p className="text-xs mt-2" style={{ color: "#5A9A6E" }}>
                        📱 Save this code for self check-in
                    </p>
                </div>

                {/* Booking details */}
                <div className="rounded-2xl p-4 grid gap-2 text-sm"
                     style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,139,107,0.15)" }}>
                    {[
                        { label: "Room", value: `${booking.roomType || ""} #${booking.roomNumber}` },
                        { label: "Check-In", value: booking.checkIn },
                        { label: "Check-Out", value: booking.checkOut },
                        { label: "Guests", value: booking.guests },
                    ].map(r => (
                        <div key={r.label} className="flex justify-between">
                            <span style={{ color: "#7A6658" }}>{r.label}</span>
                            <span className="font-medium" style={{ color: "#3D3229" }}>{r.value}</span>
                        </div>
                    ))}
                    <div className="h-px" style={{ background: "rgba(255,139,107,0.15)" }} />
                    <div className="flex justify-between font-bold">
                        <span style={{ color: "#7A6658" }}>Total Paid</span>
                        <span style={{ color: "#FF8B6B" }}>${booking.totalPrice}</span>
                    </div>
                </div>

                <ButtonLink to="/dashboard" variant="coral">View My Bookings</ButtonLink>
                <ButtonLink to="/find-booking" variant="sky">Self Check-In 🔑</ButtonLink>
                <ButtonLink to="/" variant="outline">Back to Home</ButtonLink>
            </Row>
        </Page>
    )
}