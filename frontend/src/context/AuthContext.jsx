import { createContext, useContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    async function register(email, password, name) {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(result.user, { displayName: name })
        // Try to save to Firestore, but don't crash if offline
        try {
            await setDoc(doc(db, "users", result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: new Date().toISOString(),
            })
        } catch (err) {
            console.warn("Could not save user profile to Firestore:", err.message)
        }
        return result
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            if (user) {
                // Try to fetch profile but don't crash if Firestore is blocked
                try {
                    const snap = await getDoc(doc(db, "users", user.uid))
                    if (snap.exists()) {
                        setUserProfile(snap.data())
                    } else {
                        // Build a basic profile from the auth user itself
                        setUserProfile({
                            uid: user.uid,
                            name: user.displayName || "",
                            email: user.email,
                        })
                    }
                } catch (err) {
                    console.warn("Firestore unavailable, using auth profile:", err.message)
                    // Fall back to auth user data — app still works
                    setUserProfile({
                        uid: user.uid,
                        name: user.displayName || "",
                        email: user.email,
                    })
                }
            } else {
                setUserProfile(null)
            }
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = { currentUser, userProfile, register, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}