import apiClient from "./apiClient"

export const fetchRooms = async () => {
  const { data } = await apiClient.get("/rooms")
  return data
}

export const fetchRoomById = async (id) => {
  const { data } = await apiClient.get(`/rooms/${id}`)
  return data
}

export const fetchAvailableRooms = async ({ checkIn, checkOut, guests }) => {
  const { data } = await apiClient.get("/rooms/available", {
    params: { checkIn, checkOut, guests },
  })
  return data
}