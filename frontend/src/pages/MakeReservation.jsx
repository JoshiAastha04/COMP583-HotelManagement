import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Page, Row, ButtonLink, Button, Field } from "../components/ui"

export default function MakeReservation() {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [adults, setAdults] = useState("1")
  const [children, setChildren] = useState("0")

  const today = new Date().toISOString().split("T")[0]
  const minCheckout = checkIn || today

  function handleCheckInChange(value) {
    setCheckIn(value)
    if (checkOut && checkOut < value) setCheckOut("")
  }

  function handleSubmit(e) {
    e.preventDefault()
    const guests = parseInt(adults) + parseInt(children)
    navigate(`/rooms?${new URLSearchParams({ checkIn, checkOut, guests })}`)
  }

  const selectClass = "w-full rounded-2xl px-4 py-3 text-sm outline-none transition"
  const selectStyle = { borderColor: "#FFB5A0", background: "rgba(255,255,255,0.8)", color: "#3D3229", border: "1px solid #FFB5A0" }

  return (
      <Page title="🌴 Plan Your Stay" subtitle="Choose your dates and we'll find the perfect room">
        <form onSubmit={handleSubmit}>
          <Row>
            <Field label="Check-In Date">
              <input type="date" min={today} value={checkIn}
                     onChange={e => handleCheckInChange(e.target.value)} required
                     className={selectClass} style={selectStyle} />
            </Field>

            <Field label="Check-Out Date">
              <input type="date" min={minCheckout} value={checkOut}
                     onChange={e => setCheckOut(e.target.value)} required
                     className={selectClass} style={selectStyle} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Adults">
                <select value={adults} onChange={e => setAdults(e.target.value)}
                        className={selectClass} style={selectStyle}>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </Field>
              <Field label="Children">
                <select value={children} onChange={e => setChildren(e.target.value)}
                        className={selectClass} style={selectStyle}>
                  {Array.from({ length: 7 }, (_, i) => i).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Child" : "Children"}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Button type="submit" variant="coral">Search Available Rooms 🔍</Button>
            <ButtonLink to="/" variant="outline">← Back to Home</ButtonLink>
          </Row>
        </form>
      </Page>
  )
}