import { useState } from "react"
import { Page, Row, ButtonLink } from "../components/ui"

export default function MakeReservation() {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [adults, setAdults] = useState("1")
  const [children, setChildren] = useState("0")

  const today = new Date().toISOString().split("T")[0]
  const minCheckout = checkIn ? checkIn : today

  function handleCheckInChange(value) {
    setCheckIn(value)

    // if check-out is now invalid (before new check-in), clear it
    if (checkOut && value && checkOut < value) {
      setCheckOut("")
    }
  }

  return (
    <Page title="Make a reservation" subtitle="Pick dates and guest counts">
      <Row>
        <Field label="Check in date">
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="w-full rounded-full border border-slate-400 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </Field>

        <Field label="Check out date">
          <input
            type="date"
            min={minCheckout}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full rounded-full border border-slate-400 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </Field>

        {/* keep your dropdowns + buttons below as-is */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Adults">
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-full rounded-full border border-slate-400 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Children">
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full rounded-full border border-slate-400 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
            >
              {Array.from({ length: 7 }, (_, i) => i).map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <ButtonLink to="/rooms" variant="success">
          Select Rooms
        </ButtonLink>

        <ButtonLink to="/" variant="outline">
          Back
        </ButtonLink>
      </Row>
    </Page>
  )
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {children}
    </label>
  )
}