import { Page, ButtonLink, Row } from "../components/ui"

export default function LandingPage() {
  return (
    <Page title="Hotel HOLLYWOOD">
      <Row>
        <ButtonLink to="/find-booking" variant="primary">
          FIND MY BOOKING
        </ButtonLink>

        <ButtonLink to="/reservation" variant="secondary">
          Make a Reservation
        </ButtonLink>

        <ButtonLink to="/signin" variant="outline">
          SIGN IN
        </ButtonLink>
      </Row>
    </Page>
  )
}