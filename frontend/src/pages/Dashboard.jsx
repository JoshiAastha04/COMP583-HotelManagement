import { Page, Row, ButtonLink } from "../components/ui"

export default function Dashboard() {
  return (
    <Page title="Hotel HOLLYWOOD">
      <Row>
        <ButtonLink to="/dashboard" variant="primary">
          My Profile
        </ButtonLink>

        <ButtonLink to="/reservation" variant="secondary">
          Make a New Reservation
        </ButtonLink>

        <ButtonLink to="/find-booking" variant="outline">
          Upcoming Stay
        </ButtonLink>

        <ButtonLink to="/" variant="outline">
          Back to Home
        </ButtonLink>
      </Row>
    </Page>
  )
}