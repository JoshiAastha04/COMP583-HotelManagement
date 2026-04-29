import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Page, Row, Field, Input, Button, ButtonLink, ErrorMsg, Divider } from "../components/ui"
import { createBooking } from "../api/bookingApi"
import { useAuth } from "../context/AuthContext"
import BookingConfirmation from "./BookingConfirmation"

export default function Payment() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const roomId = searchParams.get("roomId")
    const roomNumber = searchParams.get("roomNumber")
    const roomType = searchParams.get("roomType")
    const checkIn = searchParams.get("checkIn")
    const checkOut = searchParams.get("checkOut")
    const guests = searchParams.get("guests")
    const total = searchParams.get("total")
    const specialRequests = searchParams.get("specialRequests") || ""

    const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(null)

    function formatCardNumber(val) {
        return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
    }

    function formatExpiry(val) {
        const clean = val.replace(/\D/g, "").slice(0, 4)
        return clean.length >= 3 ? clean.slice(0, 2) + "/" + clean.slice(2) : clean
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        // Basic validation
        const rawNum = card.number.replace(/\s/g, "")
        if (rawNum.length < 16) return setError("Please enter a valid 16-digit card number.")
        if (card.cvv.length < 3) return setError("Please enter a valid CVV.")
        if (!card.expiry.includes("/")) return setError("Please enter expiry as MM/YY.")
        if (!card.name.trim()) return setError("Please enter the cardholder name.")

        setLoading(true)
        try {
            const booking = await createBooking({
                roomId: Number(roomId),
                checkIn,
                checkOut,
                guests: Number(guests),
                specialRequests,
            })
            setConfirmed(booking)
        } catch {
            // Demo fallback
            setConfirmed({
                confirmationCode: "KC" + Math.random().toString(36).substr(2, 6).toUpperCase(),
                roomNumber,
                roomType,
                checkIn,
                checkOut,
                guests,
                totalPrice: total,
            })
        }
        setLoading(false)
    }

    if (confirmed) return <BookingConfirmation booking={confirmed} />

    return (
        <Page title="💳 Payment" subtitle="Your stay is almost booked!">
            {/* Booking summary */}
            <div className="rounded-2xl p-4 mb-5"
                 style={{ background: "linear-gradient(135deg, #FFE8E0, #E8F4FF)", border: "1px solid rgba(255,139,107,0.2)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#7A6658" }}>Booking Summary</p>
                <div className="grid gap-1.5 text-sm">
                    <SummaryRow label="Room" value={`${roomType} #${roomNumber}`} />
                    <SummaryRow label="Check-In" value={checkIn} />
                    <SummaryRow label="Check-Out" value={checkOut} />
                    <SummaryRow label="Guests" value={guests} />
                    <div className="h-px my-1" style={{ background: "rgba(255,139,107,0.2)" }} />
                    <SummaryRow label="Total" value={`$${total}`} bold coral />
                </div>
            </div>

            <Divider label="Secure Payment" />

            <form onSubmit={handleSubmit} className="mt-4">
                <Row>
                    <ErrorMsg message={error} />

                    <Field label="Cardholder Name">
                        <Input placeholder="John Smith" value={card.name}
                               onChange={e => setCard({ ...card, name: e.target.value })} required />
                    </Field>

                    <Field label="Card Number">
                        <Input
                            placeholder="1234 5678 9012 3456"
                            value={card.number}
                            onChange={e => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                            required
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Expiry Date">
                            <Input placeholder="MM/YY" value={card.expiry}
                                   onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} required />
                        </Field>
                        <Field label="CVV">
                            <Input placeholder="123" value={card.cvv} type="password"
                                   onChange={e => setCard({ ...card, cvv: e.target.value.slice(0, 4) })} required />
                        </Field>
                    </div>

                    <div className="rounded-2xl p-3 text-center text-xs" style={{ background: "#F0F8E8", color: "#3D7A4A" }}>
                        🔒 Demo mode — no real charges will be made
                    </div>

                    <Button type="submit" variant="coral" disabled={loading}>
                        {loading ? "Processing..." : `Pay $${total} & Confirm Booking`}
                    </Button>

                    <ButtonLink to={`/rooms/${roomId}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`} variant="outline">
                        ← Go Back
                    </ButtonLink>
                </Row>
            </form>
        </Page>
    )
}

function SummaryRow({ label, value, bold, coral }) {
    return (
        <div className="flex justify-between">
            <span style={{ color: "#7A6658" }}>{label}</span>
            <span className={bold ? "font-bold" : "font-medium"} style={{ color: coral ? "#FF8B6B" : "#3D3229" }}>{value}</span>
        </div>
    )
}