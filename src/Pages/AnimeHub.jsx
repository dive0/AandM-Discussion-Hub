import { useState, useEffect } from "react";
import { firestore } from "../firebase_setup/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import Trending from "../Components/Trending";

const AnimeHub = () => {
  const [animeTrendingData, setAnimeTrendingData] = useState([]);
  const [animeDiscussionPost, setAnimeDiscussionPost] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const navigate = useNavigate();

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
  const animePostQuery = query(animePostsRef, orderBy(order, "desc"));

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
    [order]
  );

  return (
    <div className="hubPage">
      <h1>Anime Hub</h1>
      <div className="grid grid-cols-12">
        <div className="col-start-4 col-end-8">
          <div className="createPost">
            <Link to="/create-post" state={{ previousPage: "AnimeHub" }}>
              <input type="text" placeholder="Create Post" />
            </Link>
          </div>
          <div className="postContainer">
            <span>Order by: </span>
            <select
              name="orderBy"
              id="orderBy"
              onChange={(e) => setOrder(e.target.value)}>
              <option value="createdAt">Newest</option>
              <option value="upVote">Most Popular</option>
            </select>
          </div>
          {animeDiscussionPost?.map((post) => (
            <Post key={post.id} post={post} hubType="Anime" />
          ))}
        </div>
        <div className="trending">
          <h2>Currently Trending</h2>
          {animeTrendingData?.map((anime) => (
            <Trending key={anime.id} data={anime} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeHub;
