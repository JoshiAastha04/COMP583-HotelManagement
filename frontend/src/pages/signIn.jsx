import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Page, Row, Input, Button, SmallLinksRow, ErrorMsg } from "../components/ui"
import { useAuth } from "../context/AuthContext"

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
      navigate("/dashboard")
    } catch {
      setError("Invalid email or password. Please try again.")
    }
    setLoading(false)
  }

  return (
      <Page title="🌸 Welcome Back" subtitle="Sign in to your account">
        <form onSubmit={onSubmit}>
          <Row>
            <ErrorMsg message={error} />
            <Input placeholder="Email address" type="email" value={email}
                   onChange={e => setEmail(e.target.value)} required />
            <Input placeholder="Password" type="password" value={password}
                   onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" variant="coral" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <SmallLinksRow
                left={<span className="cursor-pointer hover:underline">Forgot password?</span>}
                right={<Link to="/register" className="hover:underline font-semibold" style={{ color: "#FF8B6B", textDecoration: "none" }}>Create account →</Link>}
            />
          </Row>
        </form>
      </Page>
  )
}