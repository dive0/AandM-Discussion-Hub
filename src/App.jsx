import { firestore } from "./firebase_setup/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthProvider } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import AnimeHub from "./Pages/AnimeHub";
import MangaHub from "./Pages/MangaHub";

function App() {
  const animePostsRef = collection(firestore, "AnimePosts");
  const animePostQuery = query(animePostsRef, orderBy("createdAt", "desc"));
  onSnapshot(animePostsRef, (snapshot) => {
    let posts = [];
    snapshot.docs.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
    console.log(posts);
  });

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Navbar />}>
              <Route exact path="/" element={<AnimeHub />} />
              <Route exact path="/manga-hub" element={<MangaHub />} />
            </Route>
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
