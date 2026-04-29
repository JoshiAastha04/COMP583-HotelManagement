import apiClient from "./apiClient"

export const createBooking = async (bookingData) => {
  const { data } = await apiClient.post("/bookings", bookingData)
  return data
}

export const getMyBookings = async () => {
  const { data } = await apiClient.get("/bookings/my")
  return data
}

export const getBookingById = async (id) => {
  const { data } = await apiClient.get(`/bookings/${id}`)
  return data
}

export const cancelBooking = async (id) => {
  const { data } = await apiClient.put(`/bookings/${id}/cancel`)
  return data
}

export const selfCheckIn = async (confirmationCode) => {
  const { data } = await apiClient.put(`/bookings/checkin/${confirmationCode}`)
  return data
}

export const selfCheckOut = async (confirmationCode) => {
  const { data } = await apiClient.put(`/bookings/checkout/${confirmationCode}`)
  return data
}