import { useRef, useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../firebase_setup/firebase";
import {
  onSnapshot,
  doc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const userNameRef = useRef();
  const { currentUser, setEmail, setPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [animeDiscussionPost, setAnimeDiscussionPost] = useState([]);
  const [mangaDiscussionPost, setMangaDiscussionPost] = useState([]);
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();

  const userDocRef = doc(firestore, "userInfo", currentUser.uid);
  const animePostsRef = collection(firestore, "AnimePosts");
  const animePostQuery = query(
    animePostsRef,
    where("postOwnerId", "==", currentUser.uid)
  );
  const mangaPostsRef = collection(firestore, "MangaPosts");
  const mangaPostQuery = query(
    mangaPostsRef,
    where("postOwnerId", "==", currentUser.uid)
  );
  const commentRef = collection(firestore, "Comment");
  const commentQuery = query(
    commentRef,
    where("replierId", "==", currentUser.uid)
  );

  useEffect(
    () => onSnapshot(userDocRef, (snapshot) => setUserName(snapshot.data())),
    []
  );

  useEffect(
    () =>
      onSnapshot(animePostQuery, (snapshot) =>
        setAnimeDiscussionPost(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(mangaPostQuery, (snapshot) =>
      setMangaDiscussionPost(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(commentQuery, (snapshot) =>
        setComment(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      ),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(setEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(setPassword(passwordRef.current.value));
    }
    if (userNameRef.current.value !== userName.userName) {
      updateDoc(userDocRef, {
        userName: userNameRef.current.value,
      });
      animeDiscussionPost?.forEach((post) => {
        const postRef = doc(firestore, "AnimePosts", post.id);
        updateDoc(postRef, {
          postOwnerName: userNameRef.current.value,
        });
      });
      mangaDiscussionPost?.forEach((post) => {
        const postRef = doc(firestore, "MangaPosts", post.id);
        updateDoc(postRef, {
          postOwnerName: userNameRef.current.value,
        });
      });
      comment?.forEach((c) => {
        const commentDocRef = doc(firestore, "Comment", c.id);
        updateDoc(commentDocRef, {
          replierName: userNameRef.current.value,
        });
      });
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="formsPage">
      <div className="formsContainer">
        <h1>Update Profile</h1>
        {error && alert(error)}
        <form onSubmit={handleSubmit} className="formsContainerContent">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            defaultValue={currentUser.email}
            required
          />
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            id="userName"
            name="userName"
            ref={userNameRef}
            defaultValue={userName.userName}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Leave blank for no change"
          />
          <label htmlFor="passwordConfirm">Password Confirmation</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            ref={passwordConfirmRef}
            placeholder="Leave blank for no change"
          />
          <button disabled={loading} type="submit">
            Update
          </button>
        </form>
      </div>
      <div className="authLinkContent">
        <Link to="/" className="authLink">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
