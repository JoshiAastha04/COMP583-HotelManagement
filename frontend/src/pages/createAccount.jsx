import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Page, Row, Input, SmallLinksRow } from "../components/ui"

export default function CreateAccount() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(e) {
    e.preventDefault()
    navigate("/signin")
  }

  return (
    <Page title="Create an Account">
      <form onSubmit={onSubmit}>
        <Row>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="set a password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-full bg-green-700 py-3 text-sm font-semibold text-white hover:bg-green-800">
            GET STARTED
          </button>

          <SmallLinksRow
            left={
              <Link className="hover:underline" to="/signin">
                already have an account?
              </Link>
            }
            right={<Link className="hover:underline" to="/">Back</Link>}
          />
        </Row>
      </form>
    </Page>
  )
}