import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Page, Row, Input, Button, SmallLinksRow, ErrorMsg } from "../components/ui"
import { useAuth } from "../context/AuthContext"

export default function CreateAccount() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError("")
    if (password !== confirm) return setError("Passwords do not match.")
    if (password.length < 6) return setError("Password must be at least 6 characters.")
    setLoading(true)
    try {
      await register(email, password, name)
      navigate("/dashboard")
    } catch (err) {
      setError(err.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Failed to create account. Please try again.")
    }
    setLoading(false)
  }

  return (
      <Page title="🌺 Join Us" subtitle="Create your Hotel HOLLYWOOD account">
        <form onSubmit={onSubmit}>
          <Row>
            <ErrorMsg message={error} />
            <Input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <Input placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input placeholder="Password (min. 6 chars)" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Input placeholder="Confirm password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            <Button type="submit" variant="mint" disabled={loading}>
              {loading ? "Creating account..." : "Get Started 🌟"}
            </Button>
            <SmallLinksRow
                left={<Link to="/signin" className="hover:underline" style={{ color: "#FF8B6B", textDecoration: "none" }}>← Already have an account?</Link>}
                right={<Link to="/" className="hover:underline" style={{ color: "#7A6658", textDecoration: "none" }}>Back to Home</Link>}
            />
          </Row>
        </form>
      </Page>
  )
}