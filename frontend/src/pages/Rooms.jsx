import { useSearchParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchRooms, fetchAvailableRooms } from "../api/roomApi"
import { WidePage, ButtonLink } from "../components/ui"

const DEMO_ROOMS = [
  { id: 1, roomNumber: "101", type: "Standard", pricePerNight: 89, capacity: 2, description: "Cozy room with garden view.", amenities: ["WiFi", "TV", "AC"], available: true },
  { id: 2, roomNumber: "201", type: "Deluxe", pricePerNight: 149, capacity: 3, description: "Spacious room with balcony.", amenities: ["WiFi", "TV", "AC", "Balcony"], available: true },
  { id: 3, roomNumber: "301", type: "Suite", pricePerNight: 249, capacity: 4, description: "Luxurious suite with living area.", amenities: ["WiFi", "TV", "AC", "Bar", "Spa"], available: true },
  { id: 4, roomNumber: "401", type: "Presidential", pricePerNight: 499, capacity: 6, description: "The ultimate VIP experience.", amenities: ["WiFi", "TV", "AC", "Pool", "Spa", "Kitchen"], available: false },
  { id: 5, roomNumber: "102", type: "Standard", pricePerNight: 89, capacity: 2, description: "Peaceful garden-facing room.", amenities: ["WiFi", "TV", "AC"], available: true },
  { id: 6, roomNumber: "202", type: "Deluxe", pricePerNight: 159, capacity: 3, description: "Sea-facing deluxe with ocean views.", amenities: ["WiFi", "TV", "AC", "Sea View", "Balcony"], available: true },
]

const TYPE_COLORS = { Standard: "#FFE8E0", Deluxe: "#E8F4FF", Suite: "#E8F5EE", Presidential: "#F0E8FF" }
const TYPE_EMOJI = { Standard: "🛏️", Deluxe: "🌅", Suite: "🛋️", Presidential: "👑" }

export default function Rooms() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests")
  const hasSearch = checkIn && checkOut && guests

  const { data: rooms, isLoading, isError } = useQuery({
    queryKey: ["rooms", checkIn, checkOut, guests],
    queryFn: () => hasSearch ? fetchAvailableRooms({ checkIn, checkOut, guests }) : fetchRooms(),
    retry: false,
    placeholderData: DEMO_ROOMS,
  })

  const displayRooms = isError ? DEMO_ROOMS : rooms || DEMO_ROOMS

  return (
      <WidePage
          title="🏨 Available Rooms"
          subtitle={hasSearch
              ? `${checkIn} → ${checkOut} · ${guests} guest${guests > 1 ? "s" : ""}`
              : "Browse all rooms"}
      >
        {isLoading && (
            <p className="text-center py-8 text-sm" style={{ color: "#7A6658" }}>Finding the best rooms for you...</p>
        )}

        <div className="grid gap-4 mb-6">
          {displayRooms.map(room => (
              <RoomCard key={room.id} room={room}
                        onSelect={() => navigate(`/rooms/${room.id}?checkIn=${checkIn || ""}&checkOut=${checkOut || ""}&guests=${guests || 1}`)} />
          ))}
        </div>

        <ButtonLink to="/reservation" variant="outline">← Change Dates</ButtonLink>
      </WidePage>
  )
}

function RoomCard({ room, onSelect }) {
  return (
      <div className="rounded-2xl overflow-hidden flex"
           style={{ border: "1px solid rgba(255,139,107,0.15)", background: "rgba(255,255,255,0.7)" }}>

        {/* Color sidebar */}
        <div className="w-24 flex-shrink-0 flex items-center justify-center text-4xl"
             style={{ background: TYPE_COLORS[room.type] || "#FFE8E0" }}>
          {TYPE_EMOJI[room.type] || "🏨"}
        </div>

        <div className="flex-1 p-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold" style={{ color: "#3D3229" }}>{room.type} Room</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F5F0EB", color: "#7A6658" }}>
              #{room.roomNumber}
            </span>
            </div>
            <p className="text-sm mb-2" style={{ color: "#7A6658" }}>{room.description}</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs" style={{ color: "#B0A090" }}>👤 {room.capacity} guests</span>
              {room.amenities?.slice(0, 3).map(a => (
                  <span key={a} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(255,139,107,0.08)", color: "#7A6658", border: "1px solid rgba(255,139,107,0.15)" }}>
                {a}
              </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="text-right">
            <span className="text-xl font-bold" style={{ color: "#FF8B6B", fontFamily: "Georgia, serif" }}>
              ${room.pricePerNight}
            </span>
              <span className="text-xs" style={{ color: "#B0A090" }}>/night</span>
            </div>
            {room.available === false ? (
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: "#FFE8E8", color: "#C0392B" }}>
              Unavailable
            </span>
            ) : (
                <button onClick={onSelect}
                        className="px-5 py-2 rounded-full text-sm font-semibold text-white transition hover:scale-105"
                        style={{ background: "linear-gradient(135deg, #FF8B6B, #E8664A)", boxShadow: "0 4px 12px rgba(255,139,107,0.35)" }}>
                  Select →
                </button>
            )}
          </div>
        </div>
      </div>
  )
}