import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"

const Navbar = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div>
      <Link to="/">AnimeHub</Link>
      <Link to="/manga-hub">MangaHub</Link>
      
      Email: {currentUser.email}
      <button onClick={handleLogout}>Log Out</button>
      <Outlet />
    </div>
  )
}

export default Navbar