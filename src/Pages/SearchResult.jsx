import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase_setup/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Post from "../Components/Post";

const SearchResult = () => {
  const title = useParams();
  const [animeResult, setAnimeResult] = useState([]);
  const [mangaResult, setMangaResult] = useState([]);

  const animePostsRef = collection(firestore, "AnimePosts");
  const animePostQuery = query(
    animePostsRef,
    where("title", "==", title.title)
  );
  const mangaPostRef = collection(firestore, "MangaPosts");
  const mangaPostQuery = query(mangaPostRef, where("title", "==", title.title));

  useEffect(() => {
    onSnapshot(animePostQuery, (snapshot) =>
      setAnimeResult(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }, [animeResult]);

  useEffect(() => {
    onSnapshot(mangaPostQuery, (snapshot) =>
      setMangaResult(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }, [mangaResult]);

  return (
    <div className="grid grid-cols-3">
      <div className="col-start-2">
        <h1 className="text-center text-6xl font-semibold text-white my-4">
          Search Result
        </h1>
        {animeResult?.map((post) => (
          <Post key={post.id} post={post} hubType="Anime" />
        ))}
        {mangaResult?.map((post) => (
          <Post key={post.id} post={post} hubType="Manga" />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
