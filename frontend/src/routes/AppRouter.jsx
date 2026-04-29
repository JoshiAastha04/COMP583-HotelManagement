import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import { useAuth } from "../context/AuthContext"
import { Navbar } from "../components/ui"
import ProtectedRoute from "../components/ProtectedRoute"

import LandingPage from "../pages/LandingPage"
import SignIn from "../pages/signIn"
import CreateAccount from "../pages/createAccount"
import MakeReservation from "../pages/MakeReservation"
import FindBooking from "../pages/FindBooking"
import Dashboard from "../pages/Dashboard"
import Rooms from "../pages/Rooms"
import RoomDetail from "../pages/RoomDetail"
import Payment from "../pages/Payment"
import Profile from "../pages/Profile"

function AppLayout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate("/")
  }

  return (
      <>
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/reservation" element={<MakeReservation />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </>
  )
}

const AppRouter = () => {
  return (
      <AuthProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AuthProvider>
  )
}

export default AppRouter