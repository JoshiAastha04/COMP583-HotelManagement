export const fetchRooms = async () => {
  const res = await fetch("http://localhost:8080/api/rooms")
  return res.json()
}