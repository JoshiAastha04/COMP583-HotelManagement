import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { selfCheckIn, selfCheckOut } from "../api/bookingApi"
import { Page, Row, Button, ButtonLink, ErrorMsg, StatusBadge } from "../components/ui"

export default function FindBooking() {
  const [code, setCode] = useState("")
  const [mode, setMode] = useState("checkin")
  const [result, setResult] = useState(null)

  const checkInMutation = useMutation({ mutationFn: selfCheckIn, onSuccess: d => setResult({ ...d, mode: "checkin" }) })
  const checkOutMutation = useMutation({ mutationFn: selfCheckOut, onSuccess: d => setResult({ ...d, mode: "checkout" }) })
  const mutation = mode === "checkin" ? checkInMutation : checkOutMutation

  function handleSubmit(e) {
    e.preventDefault()
    setResult(null)
    mutation.mutate(code.toUpperCase().trim())
  }

  if (result) {
    return (
        <Page title={result.mode === "checkin" ? "🎉 Checked In!" : "👋 Checked Out!"}>
          <Row>
            <div className="rounded-2xl p-5 text-center"
                 style={{ background: "linear-gradient(135deg, #E8F8EF, #D4F5E2)", border: "1px solid #90D4B5" }}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#1E7A4A" }}>
                {result.mode === "checkin"
                    ? `Welcome! You're checked into Room ${result.roomNumber} 🌸`
                    : "Thank you for staying with us! Safe travels 🌴"}
              </p>
              <p className="font-mono text-lg font-bold" style={{ color: "#1E5C35" }}>{result.confirmationCode}</p>
              {result.status && <div className="mt-2 flex justify-center"><StatusBadge status={result.status} /></div>}
            </div>
            <Button variant="outline" onClick={() => { setResult(null); setCode("") }}>← Try Another Code</Button>
            <ButtonLink to="/dashboard" variant="coral">My Bookings</ButtonLink>
          </Row>
        </Page>
    )
  }

  return (
      <Page title="🔑 Find My Booking" subtitle="Enter your confirmation code to check in or out">
        <form onSubmit={handleSubmit}>
          <Row>
            {/* Toggle */}
            <div className="flex rounded-2xl p-1 gap-1"
                 style={{ background: "rgba(255,139,107,0.08)", border: "1px solid rgba(255,139,107,0.15)" }}>
              {["checkin", "checkout"].map(m => (
                  <button key={m} type="button" onClick={() => setMode(m)}
                          className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition"
                          style={mode === m
                              ? { background: "linear-gradient(135deg, #FF8B6B, #E8664A)", color: "white" }
                              : { color: "#7A6658" }}>
                    {m === "checkin" ? "🏨 Check In" : "👋 Check Out"}
                  </button>
              ))}
            </div>

            {/* Code input */}
            <input type="text" value={code}
                   onChange={e => setCode(e.target.value.toUpperCase())}
                   placeholder="e.g. KCSUMMER1"
                   required maxLength={12}
                   className="w-full rounded-2xl px-4 py-4 text-center text-2xl font-bold tracking-widest outline-none"
                   style={{ fontFamily: "monospace", border: "2px solid #FFB5A0", background: "rgba(255,255,255,0.8)", color: "#FF8B6B" }} />

            <ErrorMsg message={mutation.isError ? "Code not found or booking isn't in the right state." : ""} />

            <Button type="submit" variant={mode === "checkin" ? "coral" : "sky"} disabled={mutation.isPending}>
              {mutation.isPending ? "Processing..." : mode === "checkin" ? "Check In 🏨" : "Check Out 👋"}
            </Button>

            <ButtonLink to="/" variant="outline">← Back to Home</ButtonLink>
          </Row>
        </form>
      </Page>
  )
}