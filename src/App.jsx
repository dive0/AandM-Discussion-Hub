import { AuthProvider } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import AnimeHub from "./Pages/AnimeHub";
import MangaHub from "./Pages/MangaHub";
import UpdateProfile from "./Pages/UpdateProfile";
import CreatePost from "./Pages/CreatePost";
import PostDetail from "./Pages/PostDetail";
import EditPost from "./Pages/EditPost";
import SearchResult from "./Pages/SearchResult";

function App() {


  return (
    <div className="bg-slate-900 max-w-screen min-h-screen">
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Navbar />}>
              <Route exact path="/" element={<AnimeHub />} />
              <Route path="/manga-hub" element={<MangaHub />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="posts/:id/edit" element={<EditPost />} />
              <Route path="/search/:title" element={<SearchResult />} />
            </Route>
            <Route path="update-profile" element={<UpdateProfile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
