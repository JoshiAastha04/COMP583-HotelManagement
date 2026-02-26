import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Page, Row, Input, SmallLinksRow } from "../components/ui"

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit(e) {
    e.preventDefault()
    navigate("/dashboard")
  }

  return (
    <Page title="SIGNIN">
      <form onSubmit={onSubmit}>
        <Row>
          <Input
            placeholder="User id/email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            LOGIN
          </button>

          <SmallLinksRow
            left={<span className="cursor-pointer hover:underline">Forgot password</span>}
            right={
              <Link className="hover:underline" to="/register">
                Create an account
              </Link>
            }
          />
        </Row>
      </form>
    </Page>
  )
}