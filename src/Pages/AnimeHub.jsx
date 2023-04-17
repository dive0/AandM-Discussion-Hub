import { useState, useEffect } from "react";
import { firestore } from "./../firebase_setup/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

const AnimeHub = () => {
  const [animeTrendingData, setAnimeTrendingData] = useState([]);
  const [animeDiscussionPost, setAnimeDiscussionPost] = useState([]);

  let queries = `
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        type
        coverImage {
          extraLarge
        }
      }
    }
  }
  `;

  let variables = {
    page: 1,
    perPage: 10,
  };

  useEffect(() => {
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: queries,
        variables: variables,
      }),
    })
      .then((res) => res.json())
      .then((data) => setAnimeTrendingData(data.data.Page.media));
  }, []);

  const animePostsRef = collection(firestore, "AnimePosts");
  const animePostQuery = query(animePostsRef, orderBy("createdAt", "desc"));
  useEffect(
    () =>
      onSnapshot(animePostsRef, (snapshot) =>
        setAnimeDiscussionPost(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  return (
    <div className="hubPage">
      <h1>Anime Hub</h1>
      <Link to="/create-post"><input type="text" /></Link>
      {/* {animeTrendingData?.forEach((anime) => console.log(anime))} */}
    </div>
  );
};

export default AnimeHub;
