import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <nav>
      {error && alert(error)}
      <ul className="bg-teal-600 grid grid-cols-3 text-2xl p-3 font-semibold sticky top-0">
        <div className="flex justify-end space-x-5 px-5">
          <li>
            <Link to="/">AnimeHub</Link>
          </li>
          <Link to="/manga-hub">MangaHub</Link>
        </div>

        {/* Email: {currentUser.email} */}
        <div>
          <input type="text" id="search" placeholder="Search Posts" className="w-full rounded-full px-3 bg-slate-700 text-white hover:bg-slate-900 focus:bg-slate-900" />
        </div>

        <div className="flex justify-start space-x-5 px-5">
          <li>
            <Link to="/update-profile">Update Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </div>
      </ul>
      <Outlet />
    </nav>
  );
};

export default Navbar;
