import axios from "axios"
import { getAuth } from "firebase/auth"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
})

apiClient.interceptors.request.use(
    async (config) => {
        const auth = getAuth()
        const user = auth.currentUser
        if (user) {
            const token = await user.getIdToken()
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized – redirect to login")
        }
        if (error.response?.status === 500) {
            console.error("Server error")
        }
        return Promise.reject(error)
    }
)

export default apiClient