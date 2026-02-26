import { BrowserRouter, Routes, Route } from "react-router-dom"

import LandingPage from "../pages/LandingPage"
import SignIn from "../pages/signIn"
import CreateAccount from "../pages/createAccount"
import MakeReservation from "../pages/MakeReservation"
import FindBooking from "../pages/FindBooking"
import Dashboard from "../pages/Dashboard"
import Rooms from "../pages/Rooms"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/reservation" element={<MakeReservation />} />
        <Route path="/find-booking" element={<FindBooking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter