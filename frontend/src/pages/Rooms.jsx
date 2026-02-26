import { Page, Row, ButtonLink } from "../components/ui"

export default function Rooms() {
  return (

    <Page title="Select a Room" subtitle="Demo UI, connect to API later">

      <Row>
        <div className="rounded-2xl border border-slate-400 bg-white p-4">
          <div className="font-semibold text-slate-900">Standard Room</div>
          <div className="mt-1 text-sm text-slate-700">$129 / night</div>
        </div>

        <div className="rounded-2xl border border-slate-400 bg-white p-4">
          <div className="font-semibold text-slate-900">Deluxe Room</div>
          <div className="mt-1 text-sm text-slate-700">$179 / night</div>
        </div>

        <div className="rounded-2xl border border-slate-400 bg-white p-4">
          <div className="font-semibold text-slate-900">Suite</div>
          <div className="mt-1 text-sm text-slate-700">$249 / night</div>
        </div>

        <ButtonLink to="/dashboard" variant="success">
          Continue
        </ButtonLink>

        <ButtonLink to="/reservation" variant="outline">
          Back
        </ButtonLink>
      </Row>
    </Page>
  )
}