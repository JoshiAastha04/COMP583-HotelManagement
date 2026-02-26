import { useState } from "react"
import { Page, Row, Input, ButtonLink } from "../components/ui"

export default function FindBooking() {
  const [code, setCode] = useState("")
  const [lastName, setLastName] = useState("")

  return (
    <Page title="FIND MY BOOKING" subtitle="Enter your confirmation details">
      <Row>
        <Input
          placeholder="CONFIRMATION CODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Input
          placeholder="LAST NAME"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <button className="w-full rounded-full bg-green-700 py-3 text-sm font-semibold text-white hover:bg-green-800">
          RETRIEVE BOOKING
        </button>

        <ButtonLink to="/" variant="outline">
          Back
        </ButtonLink>
      </Row>
    </Page>
  )
}