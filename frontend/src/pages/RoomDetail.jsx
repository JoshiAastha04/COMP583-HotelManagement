import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { fetchRoomById } from "../api/roomApi"
import { useAuth } from "../context/AuthContext"
import { Page, Row, Field, Button, ButtonLink, ErrorMsg } from "../components/ui"

const DEMO_ROOMS = {
    1: { id: 1, roomNumber: "101", type: "Standard", pricePerNight: 89, capacity: 2, description: "Cozy room with garden view.", amenities: ["WiFi", "TV", "AC"], available: true },
    2: { id: 2, roomNumber: "201", type: "Deluxe", pricePerNight: 149, capacity: 3, description: "Spacious room with private balcony.", amenities: ["WiFi", "TV", "AC", "Balcony"], available: true },
    3: { id: 3, roomNumber: "301", type: "Suite", pricePerNight: 249, capacity: 4, description: "Luxurious suite with living area.", amenities: ["WiFi", "TV", "AC", "Bar", "Spa"], available: true },
}

export default function RoomDetail() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const checkIn = searchParams.get("checkIn") || ""
    const checkOut = searchParams.get("checkOut") || ""
    const guests = searchParams.get("guests") || "1"
    const [specialRequests, setSpecialRequests] = useState("")
    const [error, setError] = useState("")

    const { data: room, isLoading, isError } = useQuery({
        queryKey: ["room", id],
        queryFn: () => fetchRoomById(id),
        retry: false,
    })

    const displayRoom = isError ? (DEMO_ROOMS[id] || DEMO_ROOMS[1]) : room

    function calcNights() {
        if (!checkIn || !checkOut) return 0
        const diff = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        return diff > 0 ? diff : 0
    }

    const nights = calcNights()
    const subtotal = nights * (displayRoom?.pricePerNight || 0)
    const taxes = Math.round(subtotal * 0.12)
    const total = subtotal + taxes

    function handleProceed(e) {
        e.preventDefault()
        if (!currentUser) { navigate("/signin"); return }
        if (!checkIn || !checkOut) { setError("Please select check-in and check-out dates."); return }
        // Route to payment page with all booking details as URL params
        const params = new URLSearchParams({
            roomId: displayRoom.id,
            roomNumber: displayRoom.roomNumber,
            roomType: displayRoom.type,
            checkIn, checkOut, guests,
            total: String(total),
            specialRequests,
        })
        navigate(`/payment?${params}`)
    }

    if (isLoading) return (
        <Page title="Loading...">
            <p className="text-center text-sm" style={{ color: "#7A6658" }}>Fetching room details...</p>
        </Page>
    )

    const amenityEmoji = { WiFi: "📶", TV: "📺", AC: "❄️", Pool: "🏊", Spa: "🧖", Bar: "🍸", Gym: "🏋️", Balcony: "🌇", Kitchen: "🍳", "Sea View": "🌊" }

    return (
        <Page title={`${displayRoom?.type} Room`} subtitle={`Room #${displayRoom?.roomNumber}`}>
            <form onSubmit={handleProceed}>
                <Row>
                    {/* Room info card */}
                    <div className="rounded-2xl p-4"
                         style={{ background: "linear-gradient(135deg, #FFE8E0, #E8F4FF)", border: "1px solid rgba(255,139,107,0.15)" }}>
                        <div className="text-center text-4xl mb-2">
                            {displayRoom?.type === "Standard" && "🛏️"}
                            {displayRoom?.type === "Deluxe" && "🌅"}
                            {displayRoom?.type === "Suite" && "🛋️"}
                            {displayRoom?.type === "Presidential" && "👑"}
                        </div>
                        <p className="text-sm text-center mb-3" style={{ color: "#7A6658" }}>{displayRoom?.description}</p>
                        <div className="flex justify-between text-sm">
                            <span style={{ color: "#7A6658" }}>Price</span>
                            <span className="font-bold" style={{ color: "#FF8B6B" }}>${displayRoom?.pricePerNight}/night</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span style={{ color: "#7A6658" }}>Max Guests</span>
                            <span className="font-medium">{displayRoom?.capacity} guests</span>
                        </div>
                        {/* Amenities */}
                        {displayRoom?.amenities?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {displayRoom.amenities.map(a => (
                                    <span key={a} className="text-xs px-2 py-1 rounded-full"
                                          style={{ background: "rgba(255,255,255,0.7)", color: "#7A6658", border: "1px solid rgba(255,139,107,0.2)" }}>
                    {amenityEmoji[a] || "✓"} {a}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dates + price summary */}
                    {checkIn && checkOut && nights > 0 && (
                        <div className="rounded-2xl p-4 grid gap-1.5 text-sm"
                             style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,139,107,0.15)" }}>
                            <div className="flex justify-between"><span style={{ color: "#7A6658" }}>Check-In</span><span className="font-medium">{checkIn}</span></div>
                            <div className="flex justify-between"><span style={{ color: "#7A6658" }}>Check-Out</span><span className="font-medium">{checkOut}</span></div>
                            <div className="flex justify-between"><span style={{ color: "#7A6658" }}>Guests</span><span className="font-medium">{guests}</span></div>
                            <div className="h-px my-1" style={{ background: "rgba(255,139,107,0.15)" }} />
                            <div className="flex justify-between"><span style={{ color: "#7A6658" }}>${displayRoom?.pricePerNight} × {nights} night{nights > 1 ? "s" : ""}</span><span>${subtotal}</span></div>
                            <div className="flex justify-between"><span style={{ color: "#7A6658" }}>Taxes (12%)</span><span>${taxes}</span></div>
                            <div className="flex justify-between font-bold"><span>Total</span><span style={{ color: "#FF8B6B" }}>${total}</span></div>
                        </div>
                    )}

                    {/* Special requests */}
                    <Field label="Special Requests (optional)">
            <textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)}
                      placeholder="Early check-in, allergies, accessibility needs..."
                      rows={2} className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none"
                      style={{ borderColor: "#FFB5A0", background: "rgba(255,255,255,0.8)", border: "1px solid #FFB5A0", color: "#3D3229" }} />
                    </Field>

                    <ErrorMsg message={error} />

                    <Button type="submit" variant="coral"
                            disabled={!displayRoom?.available || (!checkIn || !checkOut)}>
                        {!currentUser ? "Sign In to Book" : !checkIn || !checkOut ? "Select Dates First" : "Proceed to Payment 💳"}
                    </Button>

                    <ButtonLink to={`/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`} variant="outline">
                        ← Back to Rooms
                    </ButtonLink>
                </Row>
            </form>
        </Page>
    )
}