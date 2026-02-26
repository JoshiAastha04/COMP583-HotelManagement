import apiClient from "./apiClient"

export const createBooking = async (bookingData) => {
  const { data } = await apiClient.post("/bookings", bookingData)
  return data
}

export const getMyBookings = async () => {
  const { data } = await apiClient.get("/bookings/my")
  return data
}