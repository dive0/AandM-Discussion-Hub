import { firestore } from "./firebase_setup/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Contexts/AuthContext";
import { Routes, Route, Outlet } from "react-router-dom";

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
      {/* <Navbar /> */}
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
